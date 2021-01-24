const request = require('postman-request');

const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2f6d05b9e44f4b4ff66202aefdb035df&query='+lat + ','+long;

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(response.body.error){
            callback('Unable to find location, try another search.', undefined)
        }else{
            callback(undefined, {
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                location: response.body.location.name,
                weatherIcon: response.body.current.weather_icons,
                weatherDescription: response.body.current.weather_descriptions,
                windSpeed: response.body.current.wind_speed,
                message: `The temperature is ${response.body.current.temperature}, and it feels like ${response.body.current.feelslike}.`
            })
        }
    });
}

module.exports = forecast;