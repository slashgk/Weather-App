const request = require('request');

var getWeather = (lat, lgt, callback) => {
    request({
        url: `https://api.darksky.net/forecast/a9a318754b2d0b9259f149e629ca33b4/${lat},${lgt}`,
        json: true
        }, (error, response, body) => {
            if(!error && response.statusCode ===200){
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }else {
                callback('Unable to fetch weather.');
            }
    });
};

module.exports = {
    getWeather
};

