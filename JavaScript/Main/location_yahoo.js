//-----------------------------------------------------------------------------------------------------------
// Initial author : Vivek Thakur /  rewrite by Dacal
// Date : 17/05/2013
//-----------------------------------------------------------------------------------------------------------

var prevlatitude;
var prevlongitude;
var city;
var textLat;
var textLong;

// LOCAL REQUEST : UPDATE THE COORDINATES FROM MYLOCATION.TXT FILE
function UpdateLocation() {
	refreshLocationTimer = setTimeout(UpdateLocation, 20*1000);
	jQuery.get('file:///private/var/mobile/Documents/myLocation.txt', function(appdata) {
//	jQuery.get('myLocation.txt', function(appdata) {
		var myvar = appdata;
		var substr = appdata.split('\n');
		var templatitude=(substr[0]).split('=');
		var templongitude=(substr[1]).split('=');
		var latitude = $.trim(templatitude[1]);
		var longitude = $.trim(templongitude[1]);

		if ((prevlatitude != latitude) || (prevlongitude != longitude)) {
			if (latitude < 0) { textLat = Math.round(latitude*100)/100 + "\u00B0" + "S"; }
			else if (latitude > 0){ textLat = Math.round(latitude*100)/100 + "\u00B0" + "N"; }
			else { textLat = Math.round(latitude*100)/100 + "\u00B0"; }
			if (longitude < 0) { textLong = Math.round(longitude*100)/100 + "\u00B0" + "W"; }
			else if (longitude > 0) { textLong = Math.round(longitude*100)/100 + "\u00B0" + "E"; }
			else { textLong = Math.round(longitude*100)/100 + "\u00B0"; }
			prevlatitude = latitude;
			prevlongitude = longitude;
			searchWoeid(latitude, longitude); // SUCCESS
		}
}).fail(function() {
	clearTimeout(refreshLocationTimer); // No myLocation.txt file, stop GPS mode.
	gps = false;
	TextColor = "TextColorGrey";
	weatherRefresherTemp(zip);
});
}

// FIRST INTERNET REQUEST : SEARCH WOEID FROM THE COORDINATES
function searchWoeid(latitude, longitude) {
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from geo.placefinder where text="'+latitude+','+longitude+'" and gflags="R"&format=json';
	$.getJSON(url, function(data) {
		found = data.query.count; // Check if coordinates return a valid location.
		if ( found == 1) {
			var woeid = data.query.results.Result.woeid;
			city = data.query.results.Result.city;
			var neighborhood = data.query.results.Result.neighborhood;
			var county = data.query.results.Result.county;
			if (UseNeighborhood == true) {
				if (neighborhood != null) { city = neighborhood; } else { city = county; }
			}
			searchZipcode(woeid); // SUCCESS
		} else {
			if (xmldata == false) { // No data. Keep weather or back to locale, maintain the 20s refresh for GPS localization.
			gps = false;
			TextColor = "TextColorGrey";
			weatherRefresherTemp(zip);
			} else {
			document.getElementById("coordinates").className = "TextColorRed";
			document.getElementById("coordinates").innerHTML = "[Offline]";
			}
		}
}).fail(function() {
	prevlatitude = "";
	prevlongitude = "";
	if (xmldata == true) {
		document.getElementById("coordinates").className = "TextColorRed"; 
		document.getElementById("coordinates").innerHTML = "[Offline]";
	} else {
		dealWithWeather ({error:true});
	}
});
}	


// SECOND INTERNET REQUEST : SEARCH ZIP CODE WITH THE WOEID (NECESSARY FOR FORECAST)
function searchZipcode(woeid) {
var url = "http://weather.yahooapis.com/forecastrss?w="+woeid+"&u=f";
$.get(url, function(data) {
	$(data).find('item').each( function() {
	title = $(this).find('title').text(); // Check if a city is found.	
	});
	if (title != "City not found") {
		gps = true;
		zip = $(data).find('guid').text().split('_')[0];
		if ( ((UseCityGPS == false) && (UseNeighborhood == false)) || (city == null) ) { city = $(data).find('location').attr('city'); }
		TextColor = "TextColorGrey";
		weatherRefresherTemp(zip); // Refresh weather as specified in Config.js.
	} else {
		if ( xmldata == false ) {  // Back to locale, but keep the 20s refresh for GPS localization.
			gps = false;
			TextColor = "TextColorGrey";
			weatherRefresherTemp(zip);
		} else {
			gps = true;
			TextColor = "TextColorRed";
			weatherRefresherTemp(zip); 	// Keep the latest valid zip to update the weather.
		}
	}
}).fail(function() {
	prevlatitude = "";
	prevlongitude = "";
	if (xmldata == true ) {
		document.getElementById("coordinates").className = "TextColorRed"; 
		document.getElementById("coordinates").innerHTML = "[Offline]";
	} else {
		dealWithWeather ({error:true});
	}
});
}
