const fetch = require('node-fetch');

async function getAddressLatLong(address) {    
	var url = new URL(`http://api.positionstack.com/v1/forward`);
	var response;
  
    var params = {
		access_key: "f27180fe0939456303ddde761b7c11ad",
		query: address
	};

	url.search = new URLSearchParams(params).toString();

	response = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Connection": "keep-alive",
		}
	}).then(result => result.json())

	response = {
		label: response.data[0].label,
		latitude: response.data[0].latitude,
		longitude: response.data[0].longitude
	};

	return(response);
}

async function getEarthquakes(latitude, longitude) {    
	var url = new URL(`http://api.geonames.org/earthquakesJSON`);
	var response;

    let box = getBox(latitude, longitude);

    var params = {
		north: box.north,
		south: box.south,
		east: box.east,
		west: box.west,
		username: "anm_test"
	};

	url.search = new URLSearchParams(params).toString();

	response = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Connection": "keep-alive",
		}
	}).then(result => result.json())

	response.north = params.north;
	response.south = params.south;
	response.east = params.east;
	response.west = params.west;

	/*if (response.responseList[0].codeResponse == '0000') {
		response = {
			name: response.givenName,
			codeResponse: response.responseList[0].codeResponse
		}

		return response;
	}
	else {
		response = {
			codeResponse: response.responseList[0].codeResponse,
			replyMessage: response.responseList[0].replyMessage
		}

		return response;
	}*/

	return(response);
}

async function getLargestEarthquakes() {    
	var url = new URL(`http://api.geonames.org/earthquakesJSON`);
	var response;
	var todayDate = new Date();

    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var todayDate = year + '-' + month + '-' + day;

    var params = {
		north: 90,
		south: -90,
		east: 180,
		west: -180,
		date: todayDate,
		minMagnitude: 6,
		maxRows: 150,
		username: "anm_test"
	};

	url.search = new URLSearchParams(params).toString();

	response = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Connection": "keep-alive",
		}
	}).then(result => result.json())

	/*if (response.responseList[0].codeResponse == '0000') {
		response = {
			name: response.givenName,
			codeResponse: response.responseList[0].codeResponse
		}

		return response;
	}
	else {
		response = {
			codeResponse: response.responseList[0].codeResponse,
			replyMessage: response.responseList[0].replyMessage
		}

		return response;
	}*/

	return(response);
}

function getBox(lat, lng){
	lat = Number(lat);
    lng = Number(lng);

    var height = (111.2/5);
    var width = 10;

    var lat_change = width/height;
    var lon_change = Math.abs( Math.cos( lat * (Math.PI / 180) ));

    var bounds = { 
      south:  lat - lat_change,
      west :  lng - lon_change,
      north:  lat + lat_change,
      east:   lng + lon_change
    };

    return bounds;
}

exports.getAddressLatLong = getAddressLatLong;
exports.getEarthquakes = getEarthquakes;
exports.getLargestEarthquakes = getLargestEarthquakes;