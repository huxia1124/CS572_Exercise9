function getCurrentLocationWrapper(callback) {
    var longElem = document.getElementById('longElem');
    var latElem = document.getElementById('latElem');

    getCurrentLocation(latElem, longElem, callback);
}

function getCurrentLocation(latElem, longElem, callback) {

    navigator.geolocation.getCurrentPosition(function(position){
        longElem.value=position.coords.longitude;
        latElem.value=position.coords.latitude;

        if(callback) {
            callback(true);
        }

    }, function(err) {
        alert('failed to get current location.');
        callback(false);
    });
}

function searchPageGeoCallback(isSuccess) {
    document.getElementById('submitButton').disabled=false;
    if(isSuccess) { 
        
    }
    else {
        document.getElementById('longElem').readonly=false;
        document.getElementById('latElem').readonly=false;
    }
}