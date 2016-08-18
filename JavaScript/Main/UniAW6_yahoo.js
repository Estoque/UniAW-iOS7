// UniAW6.4PP (Yahoo) By Ian Nicoll and Dacal

// ALL WEATHER CONDITIONS (YAHOO)
var Conditions = [
			"thunderstorm", // 0 tornado
			"thunderstorm", // 1 tropical storm
			"thunderstorm", // 2 hurricane
			"thunderstorm", // 3 severe thunderstorms
			"thunderstorm", // 4 thunderstorms
			"sleet",	 // 5 mixed rain and snow
			"sleet",	 // 6 mixed rain and sleet
			"sleet",	 // 7 mixed snow and sleet
			"sleet",	 // 8 freezing drizzle
			"showers_cloud", // 9 drizzle
			"sleet",	 // 10 freezing rain
			"showers_cloud", // 11 showers
			"rain", // 12 showers
			"snow_showers", // 13 snow flurries
			"snow_showers", // 14 light snow showers
			"snow", // 15 blowing snow
			"snow", // 16 snow
			"hail", // 17 hail
			"sleet",	 // 18 sleet
			"fog", // 19 dust
			"fog", // 20 foggy
			"haze", // 21 haze
			"fog", // 22 smoky
			"windy",	 // 23 blustery
			"windy",	 // 24 windy
			"frost",	 // 25 cold
			"cloud",	 // 26 cloudy
			"mostlycloudy", // 27 mostly cloudy (night)
			"mostlycloudy", // 28 mostly cloudy (day)
			"partlycloudy", // 29 partly cloudy (night)
			"partlycloudy", // 30 partly cloudy (day)
			"clear",	 // 31 clear (night)
			"clear",	 // 32 sunny
			"fair", // 33 fair (night)
			"fair", // 34 fair (day)
			"sleet",	 // 35 mixed rain and hail
			"clear",	 // 36 hot
			"thunderstorm", // 37 isolated thunderstorms
			"thunderstorm",	 // 38 scattered thunderstorms
			"thunderstorm", // 39 scattered thunderstorms
			"showers_cloud", // 40 scattered showers
			"snow", // 41 heavy snow
			"snow", // 42 scattered snow showers
			"heavy_snow", // 43 heavy snow
			"partlycloudy", // 44 partly cloudy
			"thunderstorm", // 45 thundershowers
			"snow_showers", // 46 snow showers
			"thunderstorm", // 47 isolated thundershowers
			"blank"]; // 3200 not available

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
	var mil = currentTime.getMilliseconds();
	var currentDate = currentTime.getDate() < 10 ? '' + currentTime.getDate() : currentTime.getDate();    time_to_change_wall = currentHours + currentMinutes / 60;    timeOfDay = (currentHours < 12) ? "am" : "pm";
    if (ampm == false) {        timeOfDay = "";        currentHours = (currentHours < 10 ? "0" : "") + currentHours;        currentTimeString = currentHours + ":" + currentMinutes;    } else {        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;        currentHours = (currentHours < 10 ? "0" : "") + currentHours;        currentHours = (currentHours == 0) ? 12 : currentHours;        currentTimeString = currentHours + ":" + currentMinutes;    }
// ANALOG CLOCK    if (AnalogClock == true) {		if (Second_Hand_Sweep == true) { 
			var sdegree = currentSeconds * 6 + (mil / (1000/6));
			var srotate = "rotate(" + sdegree + "deg)";
		} else {
			var sdegree = currentSeconds * 6;
			var srotate = "rotate(" + sdegree + "deg)";
		}		var mdegree = currentMinutes * 6;
		var mrotate = "rotate(" + mdegree + "deg)";        $("#minhand").css("-webkit-transform", mrotate);		var hdegree = currentHours * 30 + (currentMinutes / 2);
		var hrotate = "rotate(" + hdegree + "deg)";        $("#hourhand").css("-webkit-transform", hrotate);        switch (Second_Hand_Options) {        case "big":            $("#bigsechand").css("-webkit-transform", srotate);            break;        case "small":            $("#smallsechand").css("-webkit-transform", srotate);            break;        case "both":            $("#smallsechand, #bigsechand").css("-webkit-transform", srotate);            break;        }
    } // END ANALOG CLOCK

    if (DigitalClock == true) {
        document.getElementById("clock").innerHTML = currentTimeString;
        document.getElementById("ampm").innerHTML = timeOfDay;
    if (SecDisplay == true) {
        document.getElementById("second").innerHTML = currentSeconds; }
    }
    document.getElementById("day").innerHTML = days[currentTime.getDay()] + "";
    document.getElementById("month").innerHTML = months[currentTime.getMonth()];
    document.getElementById("year").innerHTML = currentTime.getFullYear();
    document.getElementById("date").innerHTML = currentDate;

    if (Single_Line_Date == true) {
        document.getElementById("SingleLineDate").innerHTML = days[currentTime.getDay()] + ", " + months[currentTime.getMonth()] + " " + currentDate + ". " + currentTime.getFullYear();
    }

    // DAY OR NIGHT CHANGE
    if ((xmldata == true) || (DemoOn == true)) {
        if ((time_to_change_wall < dayhour) || (time_to_change_wall >= nighthour)) { var whereTmp = "night"; } else { var whereTmp = "day"; }
        if (whereTmp != where) {
			dealWithWeather(obj);
			} else {
			if ((sunmoon_position_refresh == true) && (time_to_change_wall_tmp != time_to_change_wall)) {
				sunmoonMove();
				time_to_change_wall_tmp = time_to_change_wall;
			}
		} // Refresh the weather for day/night condition.
    }

    // IANS 12 MINUTE SCROLLING TIMEDWALLS
    if ((Wallpaper_options == 'timedwalls') && (timedwalls == true)) {

		var h = currentTime.getMinutes();
        var dummy = '-48';
        if (h <= 47) { dummy = '-36'; }
        if (h <= 35) { dummy = '-24'; }
        if (h <= 23) { dummy =  '-12'; }
        if (h <= 11) { dummy =  '-0'; }
        h = currentTime.getHours() + dummy;

        if (h != wpidx) {
            wpidx = h;

            WPmove_inTW.src = "Images/TimedWall/" + wpidx + ".jpg";
            
			var WPmove_tmpTW = WPmove_inTW;
            WPmove_inTW = WPmove_outTW;
            WPmove_outTW = WPmove_tmpTW;

            var WPfade_tmpTW = WPfade_inTW;
            WPfade_inTW = WPfade_outTW;
            WPfade_outTW = WPfade_tmpTW;

            WPfade_inTW.className = 'fade-out-wall';
            WPfade_outTW.className = 'fade-in-wall';
            WPmove_outTW.style.webkitAnimationName = 'move';
            setTimeout(function () { WPmove_inTW.style.webkitAnimationName = ''; }, 2000);
        }
    } // END OF TIMEDWALLS

    if ((DemoMode == false) && (currentTime.getTime() - updateTimer >= updateWeatherEvery)) {
        if (updateTimer == 0) {
            if (gps == true) { UpdateLocation(); } else { weatherRefresherTemp(zip); }
        } else {
            weatherRefresherTemp(zip);
        }
        updateTimer = currentTime.getTime();
    }
} // End of updateClock function

function init() {

    // FOR SLIDESHOW
    WPfade_in = document.getElementById("WPone");
    WPfade_out = document.getElementById("WPtwo");

    // FOR TIMEDWALLS
    WPfade_inTW = document.getElementById("WPoneTWContainer");
    WPfade_outTW = document.getElementById("WPtwoTWContainer");
    WPmove_inTW = document.getElementById("WPoneTW");
    WPmove_outTW = document.getElementById("WPtwoTW");

    switch (Second_Hand_Options) {
    case "big":
    // document.getElementById("smallsechand").style.display = 'none'; /* Remove the "//" at the start of this line to hide the small second hand when "big" secondhand is selected in the Config.js file */
        break;
    case "small":
        document.getElementById("bigsechand").style.display = 'none';
        break;
    case "none":
        document.getElementById("bigsechand").style.display = 'none';
        document.getElementById("smallsechand").style.display = 'none';
        break;
    }

    if (Hide_Forecast_Background == true) {
        document.getElementById("forecastbg").style.display = 'none';
    }
    if (Hide_Forecast == true) {
        document.getElementById("forecastInfo").style.display = 'none';
    }
    if (Hide_WeatherInfo_Background == true) {
        document.getElementById("WeatherInfoBG").style.display = 'none';
    }
    if (Hide_All_Weather_Info == true) {
        document.getElementById("WeatherInfo").style.display = 'none';
    }
    if (showDock == true) {
        document.getElementById("dock").src = "Images/dock/dock.png";
    }
    if (AnalogClock == false) {
        document.getElementById("analogclock").style.display = 'none';
    }
    if (AnalogClock_Calendar == false) {
        document.getElementById("calendar").style.display = 'none';
    }
    if (DigitalClock == false) {
		document.getElementById("Digitalclock").style.display = 'none';
	}

	switch (Wallpaper_options) {
		case "timedwalls":
				timedwalls = true;
		break;
		case "slideshow":
				widgetStart();
				slideshow = true;
		break;
		case "daynightwalls":
				document.getElementById("DayNightWalls").style.display = "block";			
		break;
		case "weatherwalls":
				document.getElementById("fullScreenWeatherWalls").style.display = "block";	
		break;	
		case "default":
				document.getElementById("background").style.display = "block";	
		break;
		case "none":
				document.getElementById("blankbg").style.display = "block";	
		break;
	}

    updateClock();
    if (Second_Hand_Sweep == true) { setInterval(updateClock, 100); } else { setInterval(updateClock, 1000); }

	/* START DEMO MODE OR NOT */
	if (DemoMode == true) {
		demo();
	}
} // END of init function

// SLIDE SHOW EVENT
function widgetStart() {
    var number = randomInteger(1, PicNumber + 1);
    WPfade_in.src = "Images/SlideShow/" + number + "." + PicExt;
    var WPfade_tmp = WPfade_in;
    WPfade_in = WPfade_out;
    WPfade_out = WPfade_tmp;
    WPfade_in.className = 'fade-out-wall';
    WPfade_out.className = 'fade-in-wall';
    widgetTimer = setTimeout(widgetStart, SlideSpeed * 1000);
}

function widgetStop() {
    clearTimeout(widgetTimer);
    WPfade_in.className = 'fade-out-wall';
    WPfade_out.className = 'fade-out-wall';
}

function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
} // END of Slide Show event

function demo() {
    DemoOn = true;

    document.getElementById("city").innerHTML = "OFFLINE";
    document.getElementById("city").style.left = "-2px";
    document.getElementById("desc").innerHTML = WeatherTest;
    document.getElementById("lastupdate").innerHTML = '<span>' + lastupdatetext + '</span><span style="font-size: 11px;">' + "12:12pm" + '</span>';
    document.getElementById("wind").innerHTML = windtext + "SSW - " + WindTest + " km/h";
    document.getElementById("visibility").innerHTML = visibilitytext + "9.99 km";
    document.getElementById("pressure").innerHTML = pressuretext + "1015.92 mb";
    document.getElementById("rising").innerHTML = "&larr;&rarr;";
    document.getElementById("temp").innerHTML = tempTest + "&#176;";
    document.getElementById("temp").style.top = "113px";
    document.getElementById("temp").style.fontSize = "33px";
    document.getElementById("feelslike").innerHTML = '<span>' + feelsliketext + '</span><span style = "font-size: 16px;">' + "35" + "&#176;" + '</span>';
    document.getElementById("low").innerHTML = '<span>' + lowtext + '</span><span style = "font-size: 14px;">' + "24" + "&#176;" + '</span>';
    document.getElementById("high").innerHTML = '<span>' + hightext + '</span><span style = "font-size: 14px;">' + "32" + "&#176;" + '</span>';
    document.getElementById("humidity").innerHTML = '<span>' + humiditytext + '</span><span style = "font-size: 13px;">' + "80%" + '</span>';
    document.getElementById("coordinates").innerHTML = "DEMO MODE";
    document.getElementById("sunrisetext2").innerHTML = sunrisetext;
    document.getElementById("sunsettext2").innerHTML = sunsettext;
    document.getElementById("fullmoon").innerHTML = "Yahoo Demo";

    if (Reverse_Hi_Lo == true) {
        document.getElementById("Day1Icon").src = "Icon Sets/HTC/1.png";
        document.getElementById("Day1").innerHTML = "Mon";
        document.getElementById("Day1HiLo").innerHTML = "65" + "&#176;" + "/" + "-56" + "&#176;";
        document.getElementById("Day2Icon").src = "Icon Sets/HTC/28.png";
        document.getElementById("Day2").innerHTML = "Tue";
        document.getElementById("Day2HiLo").innerHTML = "64" + "&#176;" + "/" + "-55" + "&#176;";
        document.getElementById("Day3Icon").src = "Icon Sets/HTC/30.png";
        document.getElementById("Day3").innerHTML = "Wed";
        document.getElementById("Day3HiLo").innerHTML = "63" + "&#176;" + "/" + "-54" + "&#176;";
        document.getElementById("Day4Icon").src = "Icon Sets/HTC/45.png";
        document.getElementById("Day4").innerHTML = "Thu";
        document.getElementById("Day4HiLo").innerHTML = "62" + "&#176;" + "/" + "-53" + "&#176;";
        document.getElementById("Day5Icon").src = "Icon Sets/HTC/45.png";
        document.getElementById("Day5").innerHTML = "Fri";
        document.getElementById("Day5HiLo").innerHTML = "61" + "&#176;" + "/" + "-52" + "&#176;";
    } else {
        document.getElementById("Day1Icon").src = "Icon Sets/HTC/1.png";
        document.getElementById("Day1").innerHTML = "Mon";
        document.getElementById("Day1HiLo").innerHTML = "-56" + "&#176;" + "/" + "65" + "&#176;";
        document.getElementById("Day2Icon").src = "Icon Sets/HTC/28.png";
        document.getElementById("Day2").innerHTML = "Tue";
        document.getElementById("Day2HiLo").innerHTML = "-55" + "&#176;" + "/" + "64" + "&#176;";
        document.getElementById("Day3Icon").src = "Icon Sets/HTC/30.png";
        document.getElementById("Day3").innerHTML = "Wed";
        document.getElementById("Day3HiLo").innerHTML = "-54" + "&#176;" + "/" + "63" + "&#176;";
        document.getElementById("Day4Icon").src = "Icon Sets/HTC/45.png";
        document.getElementById("Day4").innerHTML = "Thu";
        document.getElementById("Day4HiLo").innerHTML = "-53" + "&#176;" + "/" + "62" + "&#176;";
        document.getElementById("Day5Icon").src = "Icon Sets/HTC/45.png";
        document.getElementById("Day5").innerHTML = "Fri";
        document.getElementById("Day5HiLo").innerHTML = "-52" + "&#176;" + "/" + "61" + "&#176;";
    }

	// SUNSET/SUNRISE FORMAT
	var sunriseh = sunrise_demo.split(':')[0];
	var sunrisem = sunrise_demo.split(':')[1];
	var sunseth = sunset_demo.split(':')[0];
	var sunsetm = sunset_demo.split(':')[1];

    // DAY AND NIGHT DURATION
    dayhour = parseInt(sunriseh) + parseInt(sunrisem) / 60;
    nighthour = parseInt(sunseth) + parseInt(sunsetm) / 60;
    DurationOfDay = nighthour - dayhour;
    DurationOfNight = 24 - DurationOfDay;

    if (ampm == false) {
         sunriseh = (sunriseh < 10 ? "0" : "") + sunriseh;
         sunseth = (sunseth < 10 ? "0" : "") + sunseth;
         var sunrise = sunriseh + ":" + sunrisem;
         var sunset = sunseth + ":" + sunsetm;
    } else {
         var timeOfSunset = (sunseth < 12) ? "am" : "pm";
         var timeOfSunrise = (sunriseh < 12) ? "am" : "pm";
         sunriseh = (sunriseh > 12) ? sunriseh - 12 : sunriseh;
         sunriseh = (sunriseh == 0) ? 12 : sunriseh;
         sunseth = (sunseth > 12) ? sunseth - 12 : sunseth;
         sunseth = (sunseth == 0) ? 12 : sunseth;
         var sunrise = sunriseh + ":" + sunrisem + " " + timeOfSunrise;
         var sunset = sunseth + ":" + sunsetm + " " + timeOfSunset;
    }

    if (SunsetSunrise == true) {
         document.getElementById("sunrise2").innerHTML = sunrise;
         document.getElementById("sunset2").innerHTML = sunset;
         document.getElementById("sunrise2").style.display = "block";
         document.getElementById("sunset2").style.display = "block";
    }
	
	if ((time_to_change_wall < dayhour) || (time_to_change_wall >= nighthour)) { where = "night"; } else { where = "day"; }
	sunmoonMove();
	
	if ((WindTest >= Strong_Wind) && (filename != "windy") && (wind_effects != "none")) { Start_wind_effects = true; } else { Start_wind_effects = false; }
	
	if (WeatherTest != "frost") {
		if (tempUnit == "c") {		
			if ((tempTest <= 0) && (frost_effect == true)) { Start_frost = true; } else { Start_frost = false; }
		} else {
			if ((tempTest <= 32) && (frost_effect == true)) { Start_frost = true; } else { Start_frost = false; }
		}
	} else {
			Start_frost = false;
	}

   if (filename == "") {
            filename = WeatherTest;
            whereOld = where;
            if (slideshow == false) {
                loadjscssfile("Weather/" + iPhoneType, filename, "css");
                loadjscssfile("Weather/" + iPhoneType, filename, "js");
                if (Start_wind_effects == true) {
                    loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                    loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                    Show_wind_effects = true;
                }
	            if (Start_frost == true) {
					loadjscssfile("Weather/" + iPhoneType, "frost_effect", "css");
					loadjscssfile("Weather/" + iPhoneType, "frost_effect", "js");
					Show_frost = true;
				}
            }
    } else {
            if (where != whereOld) {
                if (slideshow == false) {
                    clearInterval(meteorTimer);
                    delelement("astronautContainer");
                    delelement("fogContainer");
                    delelement("starContainer");
                    delelement("meteorContainer");
                    delelement("frameContainer");
                    delelement("cloudContainer");
                    delelement("dropContainer");
                    delelement("circleContainer");
                    delelement("wiperContainer");
                    delelement("starsBGContainer");
                    delelement("windContainer");
                    delelement("windmillContainer");
                    delelement("big_balloonContainer");
                    delelement("small_balloonContainer");
                    delelement("birdsContainer");
                    delelement("frostContainer");
                    if (Show_wind_effects == true) {
                        removejscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                        removejscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                        Show_wind_effects = false;
                    }
					if (Show_frost == true) {
						removejscssfile("Weather/" + iPhoneType, "frost_effect", "css");
						removejscssfile("Weather/" + iPhoneType, "frost_effect", "js");
						Show_frost = false;
					}
                    replacejscssfile("Weather/" + iPhoneType, filename, filename, "css");
                    replacejscssfile("Weather/" + iPhoneType, filename, filename, "js");
                    if (Start_wind_effects == true) {
                        loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                        loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                        Show_wind_effects = true;
                    }
					if (Start_frost == true) {
						loadjscssfile("Weather/" + iPhoneType, "frost_effect", "css");
						loadjscssfile("Weather/" + iPhoneType, "frost_effect", "js");
						Show_frost = true;
					}
                }
                whereOld = where;
            }
    }

    if (No_Internet_logo == true) {
        switch (logo_color) {
			case "blue":
				document.getElementById("logo").src = "Images/background/" + iPhoneType + "/logo_blue.png";
				break;
			case "gold":
				document.getElementById("logo").src = "Images/background/" + iPhoneType + "/logo_gold.png";
				break;
			case "glass":
				document.getElementById("logo").src = "Images/background/" + iPhoneType + "/logo_glass.png";
				break;
			case "silver":
				document.getElementById("logo").src = "Images/background/" + iPhoneType + "/logo_silver.png";
				break;
		}
		document.getElementById("logo").style.display = 'block';
    }
    document.getElementById("fullScreenWeatherWalls").src = "Images/fullScreenWeatherWalls/" + where + "_" + filename + ".jpg";
    document.getElementById("DayNightWalls").src = "Images/day_night_" + iPhoneType + "/" + where  + ".png";
}
// End of demo function

function dealWithWeather(obj) {
    if (obj.error == false) {

		document.getElementById("logo").style.display = 'none';
		document.getElementById("city").style.left = "0px";
		DemoOn = false;

		var direction = parseFloat(obj.winddir);
        document.getElementById("coordinates").className = "TextColorGrey";
        document.getElementById("coordinates").innerHTML = obj.coordinates;
        document.getElementById("city").className =  TextColor;
        document.getElementById("city").innerHTML = obj.city;

        if (useRealFeel == true) { var tempValue = obj.realFeel; } else { var tempValue = obj.temp; }

        document.getElementById("low").innerHTML = '<span>' + lowtext + '</span><span style = "font-size: 14px;">' + obj.forecastlow[0] + '&#176;</span>';
        document.getElementById("high").innerHTML = '<span>' + hightext + '</span><span style="font-size: 14px;">' + obj.forecasthigh[0] + '&#176;</span>';
        document.getElementById("temp").style.top = "113px";
        document.getElementById("temp").style.fontSize = "33px";
        document.getElementById("temp").innerHTML = tempValue + "&#176;";

        document.getElementById("feelslike").innerHTML = '<span>' + feelsliketext + '</span><span style = "font-size: 16px;">' + obj.realFeel + '&#176;</span>';

        if (tempValue == obj.realFeel) {
            document.getElementById("feelslike").style.display = "none";
        } else {
            document.getElementById("feelslike").style.display = "block";
        }

        document.getElementById("pressure").innerHTML = pressuretext + obj.pressure + " " + obj.pressureunit;
        document.getElementById("lastupdate").innerHTML = lastupdatetext + '</span><span style="font-size: 11px;">' + currentTimeString + ' ' + timeOfDay + '</span>';
        document.getElementById("visibility").innerHTML = visibilitytext + obj.visibility + " " + obj.visibilityunit;
        document.getElementById("humidity").innerHTML = '<span>' + humiditytext + '</span><span style="font-size: 13px;">' + obj.humidity + "&#37;" + '</span>';
        document.getElementById("sunrisetext2").innerHTML = sunrisetext;
        document.getElementById("sunsettext2").innerHTML = sunsettext;
        document.getElementById("desc").innerHTML = obj.description;
			
		if (obj.rising == 0) document.getElementById('rising').innerHTML= "&larr;&rarr;";
        if (obj.rising == 1) document.getElementById('rising').innerHTML= "&uarr;";
        if (obj.rising == 2) document.getElementById('rising').innerHTML= "&darr;";

		switch (lang) {
			case "cn":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NO";		
				if (direction < 326.25) var winddir = "NO";		
				if (direction < 303.75) var winddir = "O-NO";
				if (direction < 281.25) var winddir = "O";		
				if (direction < 258.75) var winddir = "O-SO";		
				if (direction < 236.25) var winddir = "SO";
				if (direction < 213.75) var winddir = "S-SO";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "无风";
			break;		
			case "ru":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NO";		
				if (direction < 326.25) var winddir = "NO";		
				if (direction < 303.75) var winddir = "O-NO";
				if (direction < 281.25) var winddir = "O";		
				if (direction < 258.75) var winddir = "O-SO";		
				if (direction < 236.25) var winddir = "SO";
				if (direction < 213.75) var winddir = "S-SO";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "Нет ветра";
			break;									
			case "it":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NO";		
				if (direction < 326.25) var winddir = "NO";		
				if (direction < 303.75) var winddir = "O-NO";
				if (direction < 281.25) var winddir = "O";		
				if (direction < 258.75) var winddir = "O-SO";		
				if (direction < 236.25) var winddir = "SO";
				if (direction < 213.75) var winddir = "S-SO";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "No hay viento";
			break;
			case "fi":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "Pohj";
				if (direction < 348.75) var winddir = "Pohjoinen";		
				if (direction < 326.25) var winddir = "Koillinen";		
				if (direction < 303.75) var winddir = "It&auml;";
				if (direction < 281.25) var winddir = "It&auml;";		
				if (direction < 258.75) var winddir = "It&auml;";		
				if (direction < 236.25) var winddir = "Kaakko";
				if (direction < 213.75) var winddir = "Etel&auml;";		
				if (direction < 191.25) var winddir = "Etel&auml;";		
				if (direction < 168.75) var winddir = "Etel&auml;";
				if (direction < 146.25) var winddir = "Lounas";		
				if (direction < 123.75) var winddir = "L&auml;nsi";		
				if (direction < 101.25) var winddir = "L&auml;nsi";		
				if (direction < 78.75) var winddir = "L&auml;nsi";		
				if (direction < 56.25) var winddir = "Luode";
				if (direction < 33.75) var winddir = "Pohjoinen";		
				if (direction < 11.25) var winddir = "Pohjoinen";
				if (direction == 0) var winddir = "ei tuulta; :";
			break;
			case "nl":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NW";	
				if (direction < 326.25) var winddir = "NW";	
				if (direction < 303.75) var winddir = "W-NW";
				if (direction < 281.25) var winddir = "W";	
				if (direction < 258.75) var winddir = "W-ZW";	
				if (direction < 236.25) var winddir = "ZW";
				if (direction < 213.75) var winddir = "Z-ZW";	
				if (direction < 191.25) var winddir = "Z";	
				if (direction < 168.75) var winddir = "Z-SO";
				if (direction < 146.25) var winddir = "ZO";	
				if (direction < 123.75) var winddir = "O-ZO";	
				if (direction < 101.25) var winddir = "O";	
				if (direction < 78.75) var winddir = "O-NO";	
				if (direction < 56.25) var winddir = "NO";
				if (direction < 33.75) var winddir = "N-NO";	
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "Geen wind";
			break;
			case "fr":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NO";		
				if (direction < 326.25) var winddir = "NO";		
				if (direction < 303.75) var winddir = "O-NO";
				if (direction < 281.25) var winddir = "O";		
				if (direction < 258.75) var winddir = "O-SO";		
				if (direction < 236.25) var winddir = "SO";
				if (direction < 213.75) var winddir = "S-SO";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "Pas de vent";
			break;
			case "ge":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NW";	
				if (direction < 326.25) var winddir = "NW";	
				if (direction < 303.75) var winddir = "W-NW";
				if (direction < 281.25) var winddir = "W";	
				if (direction < 258.75) var winddir = "W-SW";	
				if (direction < 236.25) var winddir = "SW";
				if (direction < 213.75) var winddir = "S-SW";	
				if (direction < 191.25) var winddir = "S";	
				if (direction < 168.75) var winddir = "S-SO";
				if (direction < 146.25) var winddir = "SO";	
				if (direction < 123.75) var winddir = "O-SO";	
				if (direction < 101.25) var winddir = "O";	
				if (direction < 78.75) var winddir = "O-NO";	
				if (direction < 56.25) var winddir = "NO";
				if (direction < 33.75) var winddir = "N-NO";	
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "Kein wind";
			break;
			case "sp":
				document.getElementById("desc").innerHTML = Translate(obj.description);	
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NO";		
				if (direction < 326.25) var winddir = "NO";		
				if (direction < 303.75) var winddir = "O-NO";
				if (direction < 281.25) var winddir = "O";		
				if (direction < 258.75) var winddir = "O-SO";		
				if (direction < 236.25) var winddir = "SO";
				if (direction < 213.75) var winddir = "S-SO";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "No hay viento";
			break;
			default:
				if (direction <= 360) var winddir = "N";
				if (direction < 348.75) var winddir = "N-NW";		
				if (direction < 326.25) var winddir = "NW";		
				if (direction < 303.75) var winddir = "W-NW";
				if (direction < 281.25) var winddir = "W";		
				if (direction < 258.75) var winddir = "W-SW";		
				if (direction < 236.25) var winddir = "SW";
				if (direction < 213.75) var winddir = "S-SW";		
				if (direction < 191.25) var winddir = "S";		
				if (direction < 168.75) var winddir = "S-SE";
				if (direction < 146.25) var winddir = "SE";		
				if (direction < 123.75) var winddir = "E-SE";		
				if (direction < 101.25) var winddir = "E";		
				if (direction < 78.75) var winddir = "E-NE";		
				if (direction < 56.25) var winddir = "NE";
				if (direction < 33.75) var winddir = "N-NE";		
				if (direction < 11.25) var winddir = "N";
				if (direction == 0) var winddir = "No wind";			
			break;
		}

        if (direction == 0) {
            document.getElementById("wind").innerHTML = windtext + winddir;
        } else {
            document.getElementById("wind").innerHTML = windtext + winddir + " - " + Math.round(obj.windspeed) + " " + obj.windunit;
        }

		// SUNSET/SUNRISE FORMAT
		var sunriseh = obj.sunrise.substring(0,obj.sunrise.indexOf(":",0));
		var sunrisem = obj.sunrise.substring(obj.sunrise.indexOf(":",0)+1,obj.sunrise.indexOf(" ",0));
		var sunseth = obj.sunset.substring(0,obj.sunset.indexOf(":",0));
		var sunsetm = obj.sunset.substring(obj.sunset.indexOf(":",0)+1,obj.sunset.indexOf(" ",0));
		sunriseh = parseInt(sunriseh) + GMT;
		sunseth = parseInt(sunseth) + GMT;
		sunseth = sunseth + 12;
		
        // DAY AND NIGHT DURATION
        dayhour = parseInt(sunriseh) + parseInt(sunrisem) / 60;
        nighthour = parseInt(sunseth) + parseInt(sunsetm) / 60;
        DurationOfDay = nighthour - dayhour;
        DurationOfNight = 24 - DurationOfDay;

        if (ampm == false) {
            sunriseh = (sunriseh < 10 ? "0" : "") + sunriseh;
            sunseth = (sunseth < 10 ? "0" : "") + sunseth;
            var sunrise = sunriseh + ":" + sunrisem;
            var sunset = sunseth + ":" + sunsetm;
        } else {
            var timeOfSunset = (sunseth < 12) ? "am" : "pm";
            var timeOfSunrise = (sunriseh < 12) ? "am" : "pm";
            sunriseh = (sunriseh > 12) ? sunriseh - 12 : sunriseh;
            sunriseh = (sunriseh == 0) ? 12 : sunriseh;
            sunseth = (sunseth > 12) ? sunseth - 12 : sunseth;
            sunseth = (sunseth == 0) ? 12 : sunseth;
            var sunrise = sunriseh + ":" + sunrisem + " " + timeOfSunrise;
            var sunset = sunseth + ":" + sunsetm + " " + timeOfSunset;
        }

        if (SunsetSunrise == true) {
            document.getElementById("sunrise2").innerHTML = sunrise;
            document.getElementById("sunset2").innerHTML = sunset;
            document.getElementById("sunrise2").style.display = "block";
            document.getElementById("sunset2").style.display = "block";
        }

        // SUN/MOON

        if ((time_to_change_wall < dayhour) || (time_to_change_wall >= nighthour)) { where = "night"; } else { where = "day"; }
		sunmoonMove();
        // END OF SUN/MOON

        // LOADING WEATHER CONDITIONS

        if ((Math.round(obj.windspeed) >= Strong_Wind) && (Conditions[obj.icon] != "windy")  && (wind_effects != "none")) { Start_wind_effects = true; } else { Start_wind_effects = false; }

		if (Conditions[obj.icon] != "frost") {
            if (tempUnit == "c") {
				if ((parseInt(obj.temp) <= 0) && (frost_effect == true)) { Start_frost = true; } else { Start_frost = false; }
			} else {
				if ((parseInt(obj.temp) <= 32) && (frost_effect == true)) { Start_frost = true; } else { Start_frost = false; }
			}
		} else {
			Start_frost = false;
		}

        if (filename == "") {
            filename = Conditions[obj.icon];
            whereOld = where;
            if (slideshow == false) {
                loadjscssfile("Weather/" + iPhoneType, filename, "css");
                loadjscssfile("Weather/" + iPhoneType, filename, "js");
                if (Start_wind_effects == true) {
                    loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                    loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                    Show_wind_effects = true;
                }
	            if (Start_frost == true) {
					loadjscssfile("Weather/" + iPhoneType, "frost_effect", "css");
					loadjscssfile("Weather/" + iPhoneType, "frost_effect", "js");
					Show_frost = true;
				}
            }
        } else {
            if ((Conditions[obj.icon] != filename) || (where != whereOld) || (Start_wind_effects != Show_wind_effects) || (Start_frost != Show_frost)) {
                if (slideshow == false) {
                    clearInterval(meteorTimer);
                    delelement("astronautContainer");
                    delelement("fogContainer");
                    delelement("starContainer");
                    delelement("meteorContainer");
                    delelement("frameContainer");
                    delelement("cloudContainer");
                    delelement("dropContainer");
                    delelement("circleContainer");
                    delelement("wiperContainer");
                    delelement("starsBGContainer");
                    delelement("windContainer");
                    delelement("windmillContainer");
                    delelement("big_balloonContainer");
                    delelement("small_balloonContainer");
                    delelement("birdsContainer");
                    delelement("frostContainer");
                    if (Show_wind_effects == true) {
                        removejscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                        removejscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                        Show_wind_effects = false;
                    }
					if (Show_frost == true) {
						removejscssfile("Weather/" + iPhoneType, "frost_effect", "css");
						removejscssfile("Weather/" + iPhoneType, "frost_effect", "js");
						Show_frost = false;
					}
                    replacejscssfile("Weather/" + iPhoneType, filename, Conditions[obj.icon], "css");
                    replacejscssfile("Weather/" + iPhoneType, filename, Conditions[obj.icon], "js");
                    if (Start_wind_effects == true) {
                        loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "css");
                        loadjscssfile("Weather/" + iPhoneType, wind_effects + "_effects", "js");
                        Show_wind_effects = true;
                    }
					if (Start_frost == true) {
						loadjscssfile("Weather/" + iPhoneType, "frost_effect", "css");
						loadjscssfile("Weather/" + iPhoneType, "frost_effect", "js");
						Show_frost = true;
					}
                }
                whereOld = where;
                filename = Conditions[obj.icon];
            }
        }

        document.getElementById("fullScreenWeatherWalls").src = "Images/fullScreenWeatherWalls/" + where + "_" + Conditions[obj.icon] + ".jpg";
        document.getElementById("DayNightWalls").src = "Images/day_night_" + iPhoneType + "/" + where + ".png";

        if (useRealFeelForForecast == true) {
            if (Reverse_Hi_Lo == true) {
                document.getElementById("Day1").innerHTML = ForecastDayNames(obj.forecastday[1]).substring(0, 3);
                document.getElementById("Day1Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[1] + ".png";
                document.getElementById("Day1HiLo").innerHTML = obj.forecastrealhigh[1] + "&#176;/ " + obj.forecastreallow[1] + "&#176;";
                document.getElementById("Day2").innerHTML = ForecastDayNames(obj.forecastday[2]).substring(0, 3);
                document.getElementById("Day2Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[2] + ".png";
                document.getElementById("Day2HiLo").innerHTML = obj.forecastrealhigh[2] + "&#176;/ " + obj.forecastreallow[2] + "&#176;";
                document.getElementById("Day3").innerHTML = ForecastDayNames(obj.forecastday[3]).substring(0, 3);
                document.getElementById("Day3Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[3] + ".png";
                document.getElementById("Day3HiLo").innerHTML = obj.forecastrealhigh[3] + "&#176;/ " + obj.forecastreallow[3] + "&#176;";
                document.getElementById("Day4").innerHTML = ForecastDayNames(obj.forecastday[4]).substring(0, 3);
                document.getElementById("Day4Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[4] + ".png";
                document.getElementById("Day4HiLo").innerHTML = obj.forecastrealhigh[4] + "&#176;/ " + obj.forecastreallow[4] + "&#176;";
                document.getElementById("Day5").innerHTML = ForecastDayNames(obj.forecastday[5]).substring(0, 3);
                document.getElementById("Day5Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[5] + ".png";
                document.getElementById("Day5HiLo").innerHTML = obj.forecastrealhigh[5] + "&#176;/ " + obj.forecastreallow[5] + "&#176;";
            } else {
                document.getElementById("Day1").innerHTML = ForecastDayNames(obj.forecastday[1]).substring(0, 3);
                document.getElementById("Day1Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[1] + ".png";
                document.getElementById("Day1HiLo").innerHTML = obj.forecastreallow[1] + "&#176;/ " + obj.forecastrealhigh[1] + "&#176;";
                document.getElementById("Day2").innerHTML = ForecastDayNames(obj.forecastday[2]).substring(0, 3);
                document.getElementById("Day2Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[2] + ".png";
                document.getElementById("Day2HiLo").innerHTML = obj.forecastreallow[2] + "&#176;/ " + obj.forecastrealhigh[2] + "&#176;";
                document.getElementById("Day3").innerHTML = ForecastDayNames(obj.forecastday[3]).substring(0, 3);
                document.getElementById("Day3Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[3] + ".png";
                document.getElementById("Day3HiLo").innerHTML = obj.forecastreallow[3] + "&#176;/ " + obj.forecastrealhigh[3] + "&#176;";
                document.getElementById("Day4").innerHTML = ForecastDayNames(obj.forecastday[4]).substring(0, 3);
                document.getElementById("Day4Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[4] + ".png";
                document.getElementById("Day4HiLo").innerHTML = obj.forecastreallow[4] + "&#176;/ " + obj.forecastrealhigh[4] + "&#176;";
                document.getElementById("Day5").innerHTML = ForecastDayNames(obj.forecastday[5]).substring(0, 3);
                document.getElementById("Day5Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[5] + ".png";
                document.getElementById("Day5HiLo").innerHTML = obj.forecastreallow[5] + "&#176;/ " + obj.forecastrealhigh[5] + "&#176;";
            }
        } else {
            if (Reverse_Hi_Lo == true) {
                document.getElementById("Day1").innerHTML = ForecastDayNames(obj.forecastday[1]).substring(0, 3);
                document.getElementById("Day1Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[1] + ".png";
                document.getElementById("Day1HiLo").innerHTML = obj.forecasthigh[1] + "&#176;/ " + obj.forecastlow[1] + "&#176;";
                document.getElementById("Day2").innerHTML = ForecastDayNames(obj.forecastday[2]).substring(0, 3);
                document.getElementById("Day2Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[2] + ".png";
                document.getElementById("Day2HiLo").innerHTML = obj.forecasthigh[2] + "&#176;/ " + obj.forecastlow[2] + "&#176;";
                document.getElementById("Day3").innerHTML = ForecastDayNames(obj.forecastday[3]).substring(0, 3);
                document.getElementById("Day3Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[3] + ".png";
                document.getElementById("Day3HiLo").innerHTML = obj.forecasthigh[3] + "&#176;/ " + obj.forecastlow[3] + "&#176;";
                document.getElementById("Day4").innerHTML = ForecastDayNames(obj.forecastday[4]).substring(0, 3);
                document.getElementById("Day4Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[4] + ".png";
                document.getElementById("Day4HiLo").innerHTML = obj.forecasthigh[4] + "&#176;/ " + obj.forecastlow[4] + "&#176;";
                document.getElementById("Day5").innerHTML = ForecastDayNames(obj.forecastday[5]).substring(0, 3);
                document.getElementById("Day5Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[5] + ".png";
                document.getElementById("Day5HiLo").innerHTML = obj.forecasthigh[5] + "&#176;/ " + obj.forecastlow[5] + "&#176;";
            } else {
                document.getElementById("Day1").innerHTML = ForecastDayNames(obj.forecastday[1]).substring(0, 3);
                document.getElementById("Day1Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[1] + ".png";
                document.getElementById("Day1HiLo").innerHTML = obj.forecastlow[1] + "&#176;/ " + obj.forecasthigh[1] + "&#176;";
                document.getElementById("Day2").innerHTML = ForecastDayNames(obj.forecastday[2]).substring(0, 3);
                document.getElementById("Day2Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[2] + ".png";
                document.getElementById("Day2HiLo").innerHTML = obj.forecastlow[2] + "&#176;/ " + obj.forecasthigh[2] + "&#176;";
                document.getElementById("Day3").innerHTML = ForecastDayNames(obj.forecastday[3]).substring(0, 3);
                document.getElementById("Day3Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[3] + ".png";
                document.getElementById("Day3HiLo").innerHTML = obj.forecastlow[3] + "&#176;/ " + obj.forecasthigh[3] + "&#176;";
                document.getElementById("Day4").innerHTML = ForecastDayNames(obj.forecastday[4]).substring(0, 3);
                document.getElementById("Day4Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[4] + ".png";
                document.getElementById("Day4HiLo").innerHTML = obj.forecastlow[4] + "&#176;/ " + obj.forecasthigh[4] + "&#176;";
                document.getElementById("Day5").innerHTML = ForecastDayNames(obj.forecastday[5]).substring(0, 3);
                document.getElementById("Day5Icon").src = "Icon Sets/" + iconSet + "/" + obj.forecastcode[5] + ".png";
                document.getElementById("Day5HiLo").innerHTML = obj.forecastlow[5] + "&#176;/ " + obj.forecasthigh[5] + "&#176;";
            }
        }
    } else {
        demo();    }} // End of dealWithWeather function

function delelement(elem) {
    var element = document.getElementById(elem);
    while (element.firstChild) { element.removeChild(element.firstChild); }
}

function weatherRefresherTemp(zip) {
	if (zip == null) {
	convertWoeid();
	} else {
	fetchWeatherData(dealWithWeather, zip);
	}
}

function convertWoeid () {
var url = "http://weather.yahooapis.com/forecastrss?w="+Yahoo_Code+"&u=f";
$.get(url, function(data) {
	zip = $(data).find('guid').text().split('_')[0];
	gps = false;
	fetchWeatherData(dealWithWeather, zip);
}).fail(function() {
	if (xmldata == true ) {
		document.getElementById("coordinates").className = "TextColorRed"; 
		document.getElementById("coordinates").innerHTML = "OFFLINE";
	} else {
		dealWithWeather ({error:true});
	}
});
}

function fetchWeatherData (callback, zip) {
var url="http://xml.weather.yahoo.com/forecastrss/" + zip + "&u=" + tempUnit + "&d=6.xml";
$.get(url, function(data) {
	xmldata = true;
	obj = {error:false};
	if (gps == false) {
		obj.city = $(data).find('location').attr('city');
		obj.coordinates = zip;
		} else {
		obj.city = city;
		obj.coordinates = textLat + " " + textLong;
	}
	obj.humidity = $(data).find('atmosphere').attr('humidity');
	obj.windunit =  $(data).find('units').attr('speed');
	obj.winddir =  $(data).find('wind').attr('direction');
	obj.windspeed = $(data).find('wind').attr('speed');
	obj.rising = $(data).find('atmosphere').attr('rising');
	obj.visibility = $(data).find('atmosphere').attr('visibility');
	obj.visibilityunit = $(data).find('units').attr('distance');
	obj.pressure = $(data).find('atmosphere').attr('pressure');
	obj.pressureunit = $(data).find('units').attr('pressure');
	obj.sunrise =  $(data).find('astronomy').attr('sunrise');
	obj.sunset = $(data).find('astronomy').attr('sunset');
	obj.realFeel = $(data).find('wind').attr('chill');
	obj.temp = $(data).find('condition').attr('temp');
	obj.icon = $(data).find('condition').attr('code');
	obj.description = $(data).find('condition').attr('text');
	obj.forecastday = [];
	obj.forecasthigh = [];
	obj.forecastlow = [];
	obj.forecastcode = [];
	obj.forecasttext = [];
	var i = 0;
	$(data).find('forecast').each( function() {
		obj.forecastday[i] = $(this).attr("day");
		obj.forecastlow[i] = $(this).attr("low");
		obj.forecasthigh[i] = $(this).attr("high");
		obj.forecastcode[i] = $(this).attr("code");
		obj.forecasttext[i] = $(this).attr("text");
		i++;
	});
        if (obj.description == "Unknown") {
            obj.description = obj.forecasttext[0];
            obj.icon = obj.forecastcode[0];
        }
	if (obj.icon == 3200) { obj.icon = 48; }
	
	// Heat index computed using air temperature (f) and humidity %
	if (tempUnit=="c" && obj.temp >= 27 && obj.humidity >= 40) {
		var marty;
		marty = (obj.temp) * 9/5 + 32;
		var hi = -42.379+2.04901523*(marty)+10.14333127*(obj.humidity)-0.22475541*(marty)*(obj.humidity)-6.83783*(Math.pow(10, -3))*(Math.pow(marty, 2))-5.481717*(Math.pow(10, -2))*(Math.pow((obj.humidity), 2))+1.22874*(Math.pow(10, -3))*(Math.pow((marty), 2))*(obj.humidity)+8.5282*(Math.pow(10, -4))*(marty)*(Math.pow((obj.humidity), 2))-1.99*(Math.pow(10, -6))*(Math.pow((marty), 2))*(Math.pow((obj.humidity),2));
		var heatindex = Math.round((hi - 32) * 5/9);
		obj.realFeel = heatindex;
	} else {
		if (tempUnit=="f" && obj.temp >= 80 && obj.humidity >= 40){	
			var hi = -42.379+2.04901523*(obj.temp)+10.14333127*(obj.humidity)-0.22475541*(obj.temp)*(obj.humidity)-6.83783*(Math.pow(10, -3))*(Math.pow(obj.temp, 2))-5.481717*(Math.pow(10, -2))*(Math.pow((obj.humidity), 2))+1.22874*(Math.pow(10, -3))*(Math.pow((obj.temp), 2))*(obj.humidity)+8.5282*(Math.pow(10, -4))*(obj.temp)*(Math.pow((obj.humidity), 2))-1.99*(Math.pow(10, -6))*(Math.pow((obj.temp), 2))*(Math.pow((obj.humidity),2));
			var heatindex = Math.round(hi);
			obj.realFeel = heatindex;
		}
	}	
	// End of Heat index
	
	callback (obj);
}).fail(function() {
	if (xmldata == true ) {
		document.getElementById("coordinates").className = "TextColorRed"; 
		document.getElementById("coordinates").innerHTML = "OFFLINE";
	} else {
		callback ({error:true});
	}
});
}

function sunmoonMove() {
	if (DemoOn == true) { var filenameTmp = WeatherTest; } else { var filenameTmp = Conditions[obj.icon]; }

	if (where == "night") {
		document.getElementById("twilightBG").style.display = "none";
        if (time_to_change_wall < dayhour) { time_to_change_wall = time_to_change_wall + 24; }
        var pRotate = Math.abs((reversemove - (time_to_change_wall - nighthour) / DurationOfNight) * 70) - 35; // ROTATE FROM -35deg to +35deg
        var pTranslate = Math.abs((reversemove - (time_to_change_wall - nighthour) / DurationOfNight) * 320);
    } else {
		if (twilight == true) {
			if (((time_to_change_wall >= dayhour) && (time_to_change_wall - dayhour <= 0.5)) || ((time_to_change_wall < nighthour) && (nighthour - time_to_change_wall <= 0.5))) {
				var twilighteffectTmp = true;
				} else {
				var twilighteffectTmp = false;
			}
			if ((twilighteffect != twilighteffectTmp) || (filenameTmp != filename)) {
				twilighteffect = twilighteffectTmp;
					if (twilighteffect == true) {
						if ((DacalSun == true) || (filenameTmp == "haze")) {
							document.getElementById("twilightBG").style.display = "block";
							document.getElementById("sun").style.backgroundImage = "url(Images/Weather/sun/dacals_red_sun.png)";
							document.getElementById("sunray").style.backgroundImage = "url(Images/Weather/sun/dacals_red_sunray.png)";
							document.getElementById("sunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
							document.getElementById("arcsun").style.backgroundImage = "url(Images/Weather/sun/dacals_red_sun.png)";
							document.getElementById("arcsunray").style.backgroundImage = "url(Images/Weather/sun/dacals_red_sunray.png)";
							document.getElementById("arcsunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
						} else {
							document.getElementById("twilightBG").style.display = "block";
							document.getElementById("sun").style.backgroundImage = "url(Images/Weather/sun/ians_red_sun.png)";
							document.getElementById("sunray").style.backgroundImage = "url(Images/Weather/sun/ians_red_sunray.png)";
							document.getElementById("sunrings").style.backgroundImage = "url(Images/Weather/sun/red_sunrings.png)";
							document.getElementById("arcsun").style.backgroundImage = "url(Images/Weather/sun/ians_red_sun.png)";
							document.getElementById("arcsunray").style.backgroundImage = "url(Images/Weather/sun/ians_red_sunray.png)";
							document.getElementById("arcsunrings").style.backgroundImage = "url(Images/Weather/sun/red_sunrings.png)";
						}
					} else {
						if ((DacalSun == true) || (filenameTmp == "haze")) {
							document.getElementById("twilightBG").style.display = "none";
							document.getElementById("sun").style.backgroundImage = "url(Images/Weather/sun/dacals_sun.png)";
							document.getElementById("sunray").style.backgroundImage = "url(Images/Weather/sun/dacals_sunray.png)";
							document.getElementById("sunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
							document.getElementById("arcsun").style.backgroundImage = "url(Images/Weather/sun/dacals_sun.png)";
							document.getElementById("arcsunray").style.backgroundImage = "url(Images/Weather/sun/dacals_sunray.png)";
							document.getElementById("arcsunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
						} else {
							document.getElementById("twilightBG").style.display = "none";
							document.getElementById("sun").style.backgroundImage = "url(Images/Weather/sun/ians_sun.png)";
							document.getElementById("sunray").style.backgroundImage = "url(Images/Weather/sun/ians_sunray.png)";
							document.getElementById("sunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
							document.getElementById("arcsun").style.backgroundImage = "url(Images/Weather/sun/ians_sun.png)";
							document.getElementById("arcsunray").style.backgroundImage = "url(Images/Weather/sun/ians_sunray.png)";
							document.getElementById("arcsunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
						}
					}
			}
		}
        var pRotate = Math.abs((reversemove - (time_to_change_wall - dayhour) / DurationOfDay) * 70) - 35; // ROTATE FROM -35deg to +35deg
        var pTranslate = Math.abs((reversemove - (time_to_change_wall - dayhour) / DurationOfDay) * 320);
    }

	if (sun_moon_arc == true) {
		document.getElementById("arcmoon").style.webkitTransform = "rotate(" + pRotate + "deg)";
		document.getElementById("arcmoonray").style.webkitTransform = "rotate(" + pRotate + "deg)";
		document.getElementById("arcsun").style.webkitTransform = "rotate(" + pRotate + "deg)";
		document.getElementById("arcsunray").style.webkitTransform = "rotate(" + pRotate + "deg)";
		document.getElementById("arcsunrings").style.left = pTranslate - 300 + "px";
        } else {
		document.getElementById("moon").style.webkitTransform = "translateX(" + pTranslate + "px)";
		document.getElementById("moonray").style.webkitTransform = "translateX(" + pTranslate + "px)";
		document.getElementById("sun").style.webkitTransform = "translateX(" + pTranslate + "px)";
		document.getElementById("sunray").style.webkitTransform = "translateX(" + pTranslate + "px)";
		document.getElementById("sunrings").style.left = pTranslate - 300 + "px";
	}
}

window.onload = init;
