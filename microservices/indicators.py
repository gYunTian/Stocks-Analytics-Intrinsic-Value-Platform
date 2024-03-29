import requests
import json
from flask import Flask
from flask_cors import CORS

#import requests
app = Flask(__name__)
CORS(app)

@app.route("/indicator/<ticker>")
def get_indicator(ticker):
    url = "https://alpha-vantage.p.rapidapi.com/query"
    querystring = {"datatype":"json","interval":"daily","series_type":"close","function":"RSI","symbol":ticker,"time_period":"14"}
    
    headers = {
        'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
        'x-rapidapi-key': "8a24813abdmsha86997223a2736ep1f06ffjsn810d01909dc7",
        'Content-type': "application/json"
    }

    return_arr = {
        "RSI": "",
        "MACD_S": "",
        "MACD": ""
    }   
    
    response = requests.request("GET", url, headers=headers, params=querystring, timeout=10).text

    if (not 'Technical Analysis: RSI' in response or 'Message' in response):
        return json.dumps({'exceeded': True}), 400

    result = json.loads(response)['Technical Analysis: RSI']


    listed = list(result.values())
    result = listed[0]['RSI']
    return_arr['RSI'] = round(float(result),2)
    result = json.dumps(result, default=str)
    
    querystring = {"datatype":"json","interval":"daily","series_type":"close","function":"MACD","symbol":ticker,"time_period":"12"}
    response = requests.request("GET", url, headers=headers, params=querystring).text    

    if (not 'Technical Analysis: MACD' in response or 'Message' in response):
        return json.dumps({'exceeded': True}), 400

    result = json.loads(response)['Technical Analysis: MACD']
    listed = list(result.values())
    return_arr['MACD_S'] = round(float(listed[0]['MACD_Signal']),2)
    return_arr['MACD'] = round(float(listed[0]['MACD']),2)
    
    return json.dumps(return_arr), 200
    
    
if __name__ == "__main__":
    app.run(host='localhost', port=5008, debug=True)