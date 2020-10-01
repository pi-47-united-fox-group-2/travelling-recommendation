const axios = require('axios').default;

class RecommendedController{
    static searchRecommended(req,res){
        let dataRecommended = {}
        var dataCity = req.query.city
        const config = {
            method: 'GET',
            url: `https://developers.zomato.com/api/v2.1/locations?query=${dataCity}`,
            headers: { 
            'user-key': '3280addd78eb22dd56b85096c11dc406', 
            'accept': 'application/json', 
            }
        }
        axios(config)
        .then(result => {

            let dataEntity = result.data.location_suggestions[0].entity_id
            const configGetResto = {
                method: 'GET',
                url: `https://developers.zomato.com/api/v2.1/search?entity_id=${dataEntity}&entity_type=city&count=5&sort=rating&order=asc`,
                headers: { 
                'user-key': '3280addd78eb22dd56b85096c11dc406', 
                'accept': 'application/json', 
                }
            }
            return axios(configGetResto)
        })
        .then(resultResto => {
            dataRecommended.food = resultResto.data.restaurants
            return axios.get(`http://api.weatherstack.com/current?access_key=f26defb80731d930a4b5c7fd2d0fb0c6&query=${dataCity}`)
        })
        .then(({data}) => {
            console.log('masuk')
                let dataWeather = {
                    city: data.location.name,
                    country: data.location.country,
                    localtime: data.location.localtime,
                    weather: data.current.weather_descriptions,
                    icon: data.current.weather_icons,
                    temperature: data.current.temperature
                }
                dataRecommended.weather = dataWeather
                console.log(dataRecommended)
                // return res.status(200).json(dataRecommended)
                return axios.get('https://api.kawalcorona.com/indonesia')
            })
        .then(result=>{
            // let dataProvinsi = {
            // }
            // console.log('------CEK---------')
            // result.data.forEach((val)=>{
            //     if(val.attributes.Provinsi.includes(dataCity)){
            //         dataProvinsi = val
            //     }
            // })
            dataRecommended.covid = result.data
            console.log(dataRecommended)
            return res.status(200).json(dataRecommended)
            // console.log(dataProvinsi)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = RecommendedController

