//-----------------------------------------------------------------------------------------------------------
// Initial author : Vivek Thakur /  rewrite by Dacal
// Date : 17/05/2013
//-----------------------------------------------------------------------------------------------------------

var prevlatitude;
var prevlongitude;
var textLat;
var textLong;
var city;
var countrycode;
var postalcode;

var yahoo_info = new Array();
var accu_city = new Array();
var accu_postal = new Array();
var accu_state = new Array();
var accu_countrycode = new Array();

String.prototype.sansAccent = function () {
    var accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
    var str = this;
    for (var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
        }
        return str;
}

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
		var found = data.query.count; // Check if coordinates return a valid location.
		if ( found == 1) {
			city = data.query.results.Result.city;
			var neighborhood = data.query.results.Result.neighborhood;
			postalcode = data.query.results.Result.postal;
			countrycode = data.query.results.Result.countrycode;
			yahoo_info = []; // REINITIALIZE THE ARRAY

			// COUNTRY FORMAT
			yahoo_info[0] = data.query.results.Result.country;
			if (yahoo_info[0] != null) {
				yahoo_info[0] = yahoo_info[0].sansAccent().toUpperCase();
				if (yahoo_info[0] .indexOf('-') != -1) {
					var tmp_country = yahoo_info[0].split('-');
					tmp_country.sort(function(a,b) { return a.length < b.length; });
					yahoo_info[1] = tmp_country[0];
				} else {
					yahoo_info[1] = "NO-HERE";			
				}
			}

			// COUNTY FORMAT
			yahoo_info[2] = data.query.results.Result.county;
			if (yahoo_info[2] != null) {
				yahoo_info[2] = yahoo_info[2].sansAccent().toUpperCase();
				if (yahoo_info[2].indexOf('-') != -1) {
					var tmp_county = yahoo_info[2].split('-');
					tmp_county.sort(function(a,b) { return a.length < b.length; });
					yahoo_info[3] = tmp_county[0];
				} else {
					yahoo_info[3] = "NO-HERE";			
				}
			}
			
			// STATE NAME FORMAT
			yahoo_info[4] = data.query.results.Result.state;
			if (yahoo_info[4] != null) {
				yahoo_info[4] = yahoo_info[4].sansAccent().toUpperCase();
				if (yahoo_info[4].indexOf('-') != -1) {
					var tmp_statename = yahoo_info[4].split('-');
					tmp_statename.sort(function(a,b) { return a.length < b.length; });
					yahoo_info[5] = tmp_statename[0];
				} else {
					yahoo_info[5] = "NO-HERE";			
				}
			}

			// WORKAROUND FOR UK USERS
			if (countrycode == "GB") { countrycode = "UK"; }
			
			if (UseNeighborhood == true) {
				if (neighborhood != null) { city = neighborhood; }
			}
		
			if ((countrycode == "US") && (postalcode != null)) {
				gps = true;
				zip = postalcode;
				TextColor = "TextColorGrey";
				weatherRefresherTemp(zip); // Refresh weather as specified in Config.js.			
			} else {
				searchZipcode();
			}
		} else {
			if (xmldata == false) { // No data. Keep weather or back to locale, maintain the 20s refresh for GPS localization.
			gps = false;
			TextColor = "TextColorGrey";
			weatherRefresherTemp(zip);
			} else {
			document.getElementById("coordinates").className = "TextColorRed";
			document.getElementById("coordinates").innerHTML = "OFFLINE";
			}
		}
}).fail(function() {
	prevlatitude = "";
	prevlongitude = "";
	if (xmldata == true) {
		document.getElementById("coordinates").className = "TextColorRed"; 
		document.getElementById("coordinates").innerHTML = "OFFLINE";
	} else {
		dealWithWeather ({error:true});
	}
});
}	

// SECOND INTERNET REQUEST : SEARCH ZIP CODE WITH THE WOEID (NECESSARY FOR FORECAST)
function searchZipcode() {
var url = "http://apple.accuweather.com/adcbin/apple/Apple_find_city.asp?location="+escape(city)+","+countrycode;
$.get(url, function(data) {
	var us =  $(data).find('CityList').attr('us')*1;
	var intl = $(data).find('CityList').attr('intl')*1;
	var extra_cities = $(data).find('CityList').attr('extra_cities')*1;
	var exist = intl + us + extra_cities;
	if (exist != 0) {
		var newpostal = ""; // INITIALIZE ZIP CODE
		if (exist == 1) {
			// JUST ONE LOCATION FOUND, CERTAINLY THE GOOD ONE :)
			newpostal = $(data).find("location").attr("postal");
		} else {
			// RETRIEVE ALL CITIES
			var i=0;
			$(data).find('location').each( function() {
				accu_city[i] = $(this).attr("city");
				accu_state[i] = $(this).attr("state").sansAccent().toUpperCase();
				accu_postal[i] = $(this).attr("postal");
				accu_countrycode[i] = accu_postal[i].split('|')[1];
			i++;
			});
			
			/* ---- SEARCH FOR THE MOST ACCURATE PLACE - ORDER IS IMPORTANT ! ----*/
			for (t=0; t < yahoo_info.length; t++) {
				for (i=0; i < accu_city.length; i++) {
					if ((accu_city[i] == city) && (accu_countrycode[i] == countrycode) && (accu_state[i].indexOf(yahoo_info[t]) != -1)) {
						newpostal = accu_postal[i];
						break; // STOP THE INNER LOOP, NOT THE MAIN ONE !
					}			
				}
			}
		}
		// CHECK IF WE HAVE A VALID POSTAL CODE
		if (newpostal != "") {
			zip = newpostal;
			gps = true;
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
		document.getElementById("coordinates").innerHTML = "OFFLINE";
	} else {
		dealWithWeather ({error:true});
	}
});
}
