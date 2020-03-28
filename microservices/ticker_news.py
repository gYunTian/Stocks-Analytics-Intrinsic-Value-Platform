import requests
import json
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS

#import requests
app = Flask(__name__)
CORS(app)

#stock news scraper
@app.route("/scrape/<ticker>")
def scrape_stock_news(ticker):
    #set up dict for two apis
    urls = {
        "1":'https://www.cityfalcon.com/webapi/v1/search/metadata/stories?api_key=Fma36p9juaU2qGTLUiEDpw&categories=mp,op,r&order_by=top&time_filter=day1&languages=en,de,es,fr,pt&min_score=1&all_languages=false&query=\
    %22'+ticker+'%22&limit=30',
        "2":'https://www.cityfalcon.com/webapi/v1/stories?api_key=Fma36p9juaU2qGTLUiEDpw&categories=mp,op,r&order_by=latest&all_languages=true&min_score=1&start_datetime=15%2F03%2F2020,+16:32&end_datetime=22%2F03%2F2020,+16:32&query=\
    %22'+ticker+'%22'
    }
    
    #loop through both urls and append to string
    for x in range(1,3):
        page = requests.get(urls[str(x)])
        soup = BeautifulSoup(page.text, 'html.parser').text
        parsed = json.loads(soup)
        stories = parsed['stories']
        
        return_str = ""
        for item in stories:
            return_str += item['title']+","
        return_str = return_str[:-1]
    
    #dump string as json string
    reply = json.dumps(return_str, default=str)

    return reply, 200
    
if __name__ == "__main__":
    app.run(host='localhost', port=5006, debug=True)
    