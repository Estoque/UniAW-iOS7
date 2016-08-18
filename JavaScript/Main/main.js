// UniAW6.3 By Ian Nicoll with credit to Dacal

var obj = new Array();
var obj = {error: true};
var updateWeatherEvery = updateInterval * 60 * 1000;
var xmldata = false;
var postal;
var time_to_change_wall;
var filename = "";
var Start_wind_effects = false;
var Show_wind_effects = false;
var Start_frost = false;
var Show_frost = false;
var wind_effects;
var where = "";
var whereOld = "";
var DemoOn = false;
var refreshLocationTimer;
var widgetTimer;
var updateTimer = 0;
var wpidx = "-1";
var zip;
var coordinates;
var TextColor = "TextColorGrey";
var meteorTimer;
var slideshow = false;
var timedwalls = false;
var twilighteffect;
var time_to_change_wall_tmp;
$.ajaxSetup({timeout: 8000, cache: false}); // Set a time out for all ajax requests, desactivate the cache.

// AUTOMATIC CSS FOR i4 AND i5
if (screen.height > 500) {var iPhoneType = "iph5"; } else {var iPhoneType = "iph4"; }
if (iPhoneType == "iph4") { replacejscssfile("Main", "UniAW6_iph5", "UniAW6_iph4", "css"); }
if (Sun_Moon_from_right_to_left == true) { var reversemove = 1; } else { var reversemove = 0; }

// LOAD THE CORRECT JS FILES
if (useAccuweather == true) {
	loadjscssfile("Main", "UniAW6_accuweather", "js");
	loadjscssfile("Main", "location_accuweather", "js");
} else {
	loadjscssfile("Main", "UniAW6_yahoo", "js");
	loadjscssfile("Main", "location_yahoo", "js");
}

function loadjscssfile(url, filename, filetype) {
    var fileref;
    if (filetype == "js") {
        fileref = document.createElement("script");
        fileref.type = "text/javascript";
        fileref.charset = "utf-8";
        fileref.src = "JavaScript/" + url + "/" + filename + ".js";
    }
    if (filetype == "css") {
        fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.href = "Css/" + url + "/" + filename + ".css";
        fileref.type = "text/css";
        fileref.media = "screen";
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function createjscssfile(url, filename, filetype) {
    var fileref;
    if (filetype == "js") {
        fileref = document.createElement("script");
        fileref.type = "text/javascript";
        fileref.charset = "utf-8";
        fileref.src = "JavaScript/" + url + "/" + filename + ".js";
    }
    if (filetype == "css") {
        fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.href = "Css/" + url + "/" + filename + ".css";
        fileref.type = "text/css";
        fileref.media = "screen";
    }
    return fileref;
}

function replacejscssfile(url, oldfilename, newfilename, filetype){
	var targetelement = (filetype=="js")? "script" : (filetype=="css")? "link" : "none";
	var targetattr = (filetype=="js")? "src" : (filetype=="css")? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i>=0; i--) { 
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1) {
				var newelement = createjscssfile(url, newfilename, filetype);
				allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
				}
		}
}

function removejscssfile(url, oldfilename, filetype) {
    var targetelement, targetattr, allsuspects;
    targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
    targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
    allsuspects = document.getElementsByTagName(targetelement);
    for (var i = allsuspects.length; i>=0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    }
}
