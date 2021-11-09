const express = require('express');
const router = express.Router();
const functions = require('../requestFunctions');

let searchHistory = [];

router.get('/earthquakes', async (req, res) => {
    let response, addressResponse, searchHistoryConsult, earthquakesResponse;
    let date;
    let address = req.query.address;

    try {
        addressResponse = await functions.getAddressLatLong(address);

        date = new Date();

        searchHistoryConsult = addressResponse;
        searchHistoryConsult.date = date.toLocaleString();

        searchHistory.unshift(searchHistoryConsult);

        earthquakesResponse = await functions.getEarthquakes(addressResponse.latitude, addressResponse.longitude);

        response = {
            label: addressResponse.label,
            latitude: addressResponse.latitude,
            longitude: addressResponse.longitude,
            recentEarthquakes: earthquakesResponse.earthquakes,
            north: earthquakesResponse.north,
            south: earthquakesResponse.south,
            east: earthquakesResponse.east,
            west: earthquakesResponse.west,
        }

        res.send(response);   
    } catch (error) {
        res.send({error: 'Unknown error.'}); 
    }
});

router.get('/searchHistory', (req, res) => {
    try {
        res.send(searchHistory);
    } catch (error) {
        res.send({error: 'Unknown error.'}); 
    }
});

router.get('/largestEarthquakes', async (req, res) => {
    let response;
    let oneYearBackdate = new Date();
    let top10LargestEarthquakes = [];
    let largestEarthquakesIndex = 0;

    try {
        oneYearBackdate.setFullYear(oneYearBackdate.getFullYear()-1);

        response = await functions.getLargestEarthquakes();

        response.earthquakes.sort((a, b) => {
            return b.magnitude - a.magnitude;
        });

        while(top10LargestEarthquakes.length < 10) {
            const earthquakeDate = new Date(response.earthquakes[largestEarthquakesIndex].datetime);
            if(earthquakeDate > oneYearBackdate){
                top10LargestEarthquakes.push(response.earthquakes[largestEarthquakesIndex]);
            }

            largestEarthquakesIndex++;
        }

        res.send(top10LargestEarthquakes);
    } catch (error) {
        res.send({error: 'Unknown error.'}); 
    }
});

module.exports = router;