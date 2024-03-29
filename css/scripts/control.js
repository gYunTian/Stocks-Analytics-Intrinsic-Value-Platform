
async function run(mode, action=0, amt=0) {
    const res = await fetch('http://localhost:5002/initialize', {mode: 'cors'})
    
    if (res.status !== 200) {
        console.log('error')
    }
    else {
        
        const data = await res.json()
        let name = data['Name']
        let ticker = data['Ticker'].toUpperCase()
        let current = data['Current']
        let input = name.toUpperCase()+' ('+ticker+'): $'+current
        $('#company').attr({class:'col-md-12 center-block col-centered'}).text(input)   
        //$('#company').text("").attr({class:'col-md-7 center-block col-centered'}).append( "<p style='color: #fff;   '>"+input+"</p>" );
        
        if (mode == "action") {
            return {'name': name, 'ticker': ticker, 'current': current, 'action': action, 'amt': amt}
        } else {
            //loading
            $('#stock_price').text('').prepend("<p class='saving'>Computing Price <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'></i> " );
            $('#vix').text('').prepend( "<p class='saving'>Retrieving Volatility Index <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'>" );
            $('#general').text('').prepend( "<p class='saving'>Retrieving News & Computing Sentiment <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'></i>" );
            $('#stock_sentiment').text('').prepend( "<p class='saving'>Retrieving Stock News & Computing Sentiment <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'></i>" );
            $('#indicator').text('').prepend( "<p class='saving'>Plotting Chart <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'></i>" );
            $('#indicator2').text('').prepend( "<p class='saving'>Retrieving Indicators <span>.</span><span>.</span><span>.</span></p><i class='fa fa-refresh fa-cog fa-spin'></i>" );
            main()//.then(clear())
        }
    }           
}   

//main wrapper
async function main() {
    get1()
    get2()
    get4()
    get5()
    get3()
    get6()
}

async function get1() {
    const res = await fetch('http://localhost:5002/get1', {mode: 'cors'})
    if (res.status !== 200) {
        console.log('error')
    }
    else {
        const data = await res.json()
        // console.log(data)
        $('#stock_price').text('Computed DCF Price:').prepend( "" );
        $('#stock_price').append( "<b><p style='color: '> $"+data['price']+"</p></b>" );
    }    
}

async function get2() {
    const res = await fetch('http://localhost:5002/get2', {mode: 'cors'})
    if (res.status !== 200) {
        console.log('error')
    }
    else {
        const data = await res.json()
        $('#stock_sentiment').text('Stock News Sentiment:').prepend( "" );
        if (data['sSentiment'].includes("-")) {
            $('#stock_sentiment').append( "<p style='color: #F23535;'>"+data['sSentiment']+"</p>" );
        }
        else {
            $('#stock_sentiment').append( "<p style='color: #71D980;'>"+data['sSentiment']+"</p>" );
        }
    }    
}

async function get3() {
    const res = await fetch('http://localhost:5002/get3', {mode: 'cors'})
    if (res.status !== 200) {
        $('#indicator2').text('Indicators:').prepend( "" );
        $('#indicator2').append( "</br></br><p>Exceeded API Limit of 5 Requests Per Minute</p>" );
    }
    else {
        const data = await res.json()
        $('#indicator2').text('Indicators:').prepend( "" );
        $('#indicator2').append( "<br><br><br><br><p style='font-weight: bold;'>RSI:</p><p>"+data['RSI']+"</p><br>" );
        $('#indicator2').append( "<p style='font-weight: bold;'>MACD:</p><p>"+data['MACD']+"</p><br>" );
        $('#indicator2').append( "<p style='font-weight: bold;'>MACDS:</p><p>"+data['MACD_S']+"</p><br>" );
    }    
}

async function get4() {
    const res = await fetch('http://localhost:5002/get4', {mode: 'cors'})
    if (res.status !== 200) {
        console.log('error')
    }   
    else {
        const data = await res.json()
        $('#general').text('General Market Sentiment:').prepend( "" );

        if (data['gSentiment'].includes("-")) {
            $('#general').append( "<p style='color: #F23535;'>"+data['gSentiment']+"</p>" );
        }
        else {
            $('#general').append( "<p style='color: #71D980;'>"+data['gSentiment']+"</p>" );
        }
    }    
}

async function get5() {
    const res = await fetch('http://localhost:5002/get5', {mode: 'cors'})
    if (res.status !== 200) {
        console.log('error')
    }
    else {
        const data = await res.json()
        $('#vix').text('Volatility Index:').prepend( "" );
        
        if (data['vix'] > 31) {
            $('#vix').append( "<p style='color: #F23535;'>"+data['vix']+"</p>" );
        }
        else {
            $('#vix').append( "<p style='color: #71D980;'>"+data['vix']+"</p>" );
        }
    }       
}

async function get6() {
    const res = await fetch('http://localhost:5002/get6', {mode: 'cors'})
    if (res.status !== 200) {
        console.log('error')
    }
    else {
        const data = await res.json()
        $('#indicator').text('').prepend( "Chart (300 days):" );  
        $('#indicator').append(data['data']);
    }       
}


async function get7(ticker, name, amt, current, action) {
    var unique = $('#txt').html()
    const res = await fetch('http://localhost:5002/get7', {mode: 'cors', method: 'POST', body: JSON.stringify({'unique': unique+'-'+ticker+'-'+action+'-'+amt,'ticker': ticker, 'name': name, 'amt': amt, 'current': current, 'action': action})})
    
    console.log('Posting to amqp service & database!')
    if (res.status !== 200) {
        console.log('get7 error')
        return 'error'
    }   
    else {
        console.log('here 1')
        const data = await res.json()
        let data1 = JSON.stringify(data)
        console.log(JSON.parse(data1)['data'], JSON.parse(data1)['data2'], JSON.parse(data1)['data3'])
        return 'sent'
    }
}



//document loaded
$(document).ready(() => {
    //initialize page
    run('update') 
    $('[data-toggle="tooltip"]').tooltip()
    console.log('initialized')

    //custom functions
    $(".action").click(function() {
        var amt = $('#amt_box').val()
        
        //input check
        if (amt == "" || amt % 1 != 0) {
            $('#amt_box').val('').attr("placeholder", "Invalid Input!").addClass('color')
            setTimeout( () => {   
                $('#amt_box').val('').attr("placeholder", "Quantity").removeClass("color")
            }, 2000);   
            return
        }       
        var action = $(this).attr('id');
        
        //get parameters
        run('action', action, amt)
        .then( (data) => {
            ticker = data['ticker']
            name = data['name']
            current = data['current']
            action = data['action']
            amt = data['amt']

            $('#amt_box').attr('disabled',true);
            if (action == 'buy') {
                $(this).attr('disabled',true).text('').prepend( "<i class='fa fa-refresh fa-spin'></i> Processing.." );
                $('#sell').attr('disabled',true);
            }
            else {
                $(this).attr('disabled',true).text('').prepend( "<i class='fa fa-refresh fa-spin'></i> Processing.." ); 
                $('#buy').attr('disabled',true);   
            }

            
            // request
            console.log('we here')
            console.log('Data:'+ ticker, name, current, action, amt)

            get7(ticker, name, amt, current, action)
            .then( (data) => {
                $('#amt_box').attr('disabled',false).val('')
                if (action == 'buy') {
                    $(this).attr('disabled',false).text('Buy').prepend( "" );
                    $('#sell').attr('disabled',false);
                }
                else {
                    $(this).attr('disabled',false).text('Sell').prepend( "" ); 
                    $('#buy').attr('disabled',false);   
                }
                
                if ($('#transaction').css('display') == 'none') {
                    $('#transaction').css('opacity', '100')
                }

                if (data == 'sent') {
                    //UI 
                    console.log('transaction done')
                    //$('#transaction').text('Transaction of '+action+' '+amt+' '+ticker+' stocks sent!').fadeOut(5000, 'slow')
                    $('#transaction').text('Transaction of '+action+' '+amt+' '+ticker+' stocks sent!').show()
                    setTimeout( () => {   
                        $('#transaction').hide()
                    }, 3000);        

                } else {
                    console.log('error')
                    //$('#transaction').text('Transaction failed! The service might be down!').delay(5000).fadeOut('slow');   
                    $('#transaction').text('Transaction failed! The service might be down!').show()
                    setTimeout( () => {   
                        $('#transaction').hide()
                    }, 3000);   
                }
            })
            
        })
    })

})

