const axios = require("axios")

function getWeather(location) {
    axios.get(`http://api.weatherstack.com/current?access_key=f26defb80731d930a4b5c7fd2d0fb0c6&query=${location}`)
        .then( ({data}) => {
            let dataWeather = {
                city: data.location.name,
                country: data.location.country,
                localtime: data.location.localtime,
                weather: data.current.weather_descriptions,
                icon: data.current.weather_icons,
                temperature: data.current.temperature
            }
            console.log(dataWeather)
        })
        .catch(err => {
            console.log(err)
        })
}

// getWeather('Bangkok')



module.exports = getWeather

// API weatherStack
// f26defb80731d930a4b5c7fd2d0fb0c6


//Weatherbit
// 0cc867a406284e64976bb74983ccde41


// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=0cc867a406284e64976bb74983ccde41

