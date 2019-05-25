const request = require('request')

const forecast =(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/5eabf1751c5471857acc58030b754e2c/'+latitude+','+longitude+''
    request({url,json:true},(error,{body}) =>{
    if(error){
        callback('Unable to connect with weather Service!',undefined)
    }
    else if(body.error)
    {
       callback('Unable to find location!',undefined)
    }
    else
    {
         callback(undefined,{
            summary:body.daily.data[0].summary+"It is currently "+body.currently.temperature+" degrees out. "+"There is a "+body.currently.precipProbability+"% chance of rain",
         })
    }
    })



}

module.exports= forecast