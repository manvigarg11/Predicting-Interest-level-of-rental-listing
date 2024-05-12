function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var city = document.getElementById("uiCity");
    var location = document.getElementById("uiLocations");
    var furniture_type = document.getElementById("uiFurniture");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_rent";

    $.post(url, {
        bhk: bhk,
        total_sqft: parseFloat(sqft.value),
        bath: bathrooms,
        city: city.value,
        furniture: furniture_type.value,
        location: location.value
    }, function (data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_rent.toString() + "</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data, status) {
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });


    var url = "http://127.0.0.1:5000/get_city_names";
    $.get(url, function (data, status) {
        if (data) {
            var city = data.city;
            var uiCity = document.getElementById("uiCity");
            $('#uiCity').empty();
            for (var i in city) {
                var opt = new Option(city[i]);
                $('#uiCity').append(opt);
            }
        }
    });

    var url = "http://127.0.0.1:5000/get_furniture_type";
    $.get(url, function (data, status) {
        if (data) {
            var furniture_type = data.furniture_type;
            var uiFurniture = document.getElementById("uiFurniture");
            $('#uiFurniture').empty();
            for (var i in furniture_type) {
                var opt = new Option(furniture_type[i]);
                $('#uiFurniture').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
