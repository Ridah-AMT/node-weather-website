const request = require('request')

const getWeather = (lat, long, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=3c97f386d7b8b4e163458e044d950468&query="+lat+","+long+"&units=f"
    
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback("oops coudn't connect", undefined)
        } else if (response.body.error) { //this condition should depend on the json file
            callback("something went wrong, check latitude and longitude url", undefined)
        } else {
            callback(undefined, response.body.current)
        }
    })
            
}

module.exports = getWeather