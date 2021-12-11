const request = require('request')

const geoCode = (address,callback) =>{
        const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieW9nZXNoc2hhaGkiLCJhIjoiY2t1cWVtOHQ4MDlhNjMwbDBzczRzcmp4aiJ9.q9bn5whkr5XTDiJ6CUpcwA'

        request({url,json:true},(error,{body})=>{
                if(error){
                        callback('unable to connect to service!',undefined)
                }
                else if(body.features.length === 0){
                        callback('Unable to find location,try nother search',undefined)
                }
                else{
                callback(undefined,
                        {
                        latitude:body.features[0].center[1],
                        longitude:body.features[0].center[0],
                        location:body.features[0].place_name
                        })
                }
        })

}

module.exports = geoCode