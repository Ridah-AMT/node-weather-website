const request = require('request')

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicmlkYWgtaCIsImEiOiJjbGhwcnI5NzkwOXNlM3FxdHNlZnZtOTJ1In0.PITXy7YNtQX5TyqZmF0Q3A&limit=1"
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback("oops coudn't connect", undefined)
        } else if (response.body.features.length === 0) { //this condition should depend on the json file
            callback("something went wrong, check your address", undefined)
        } else {
            callback(undefined, {
                latitude:  response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode