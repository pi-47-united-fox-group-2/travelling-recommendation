const axios = require("axios")

function getWeather(location) {
    let woeid
    axios.get(`https://www.metaweather.com/api/location/search/?query=${location}`)
    .then(({data}) => {
        console.log(data)
        woeid = data[0].woeid
        return axios.get(`https://www.metaweather.com/api/location/${woeid}/`)
    })
    .then(({data}) => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    

}

function getWeather2(location) {

    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location},NC&key=0cc867a406284e64976bb74983ccde41`)
        .then( ({data}) => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })

}

getWeather('Bangkok')


// API weatherStack
// f26defb80731d930a4b5c7fd2d0fb0c6


//Weatherbit
// 0cc867a406284e64976bb74983ccde41


// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=0cc867a406284e64976bb74983ccde41

