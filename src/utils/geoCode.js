const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.GEOCODE;

const geocode = (address, callback) => {
 
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" +  token +  "&limit=1";
  
  request({ url: url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to geolocation service", undefined);
    } else if (body.features.length === 0) {
      callback("Please verify your location query", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
};



module.exports = geocode;