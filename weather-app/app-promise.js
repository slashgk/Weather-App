const yargs = require('yargs');
const axios = require('axios')

const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help','h')
.argv;

encodedAddress = encodeURIComponent(argv.address);
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDytIL_owd-j41gg_ynP47rpN0fGcAzV7s&address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lgt = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/a9a318754b2d0b9259f149e629ca33b4/${lat},${lgt}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's current ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }else{
        console.log(e.message);
    }
});