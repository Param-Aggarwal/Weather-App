const request = require('request')

const forecast = (longitude,latitude,callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=acb7a487631698b02552315da75c6025&query='+ latitude + ','+ longitude +'&units=m'

        request({url,json:true},(error,{body})=>{
                if(error){
                callback('Unable to connect to service!',undefined)
                }
                else if(body.error){
                callback('Unable to find location',undefined)
                }
                else{
                callback(undefined,` The current temperature is ${body.current.temperature} degree Celcius,
                the wind speed is ${body.current.wind_speed} and the
                humidity is ${body.current.humidity}`)
                }
        })


}

module.exports = forecast
