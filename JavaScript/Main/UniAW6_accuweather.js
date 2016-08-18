// UniAW6.4PP (AccuWeather) By Ian Nicoll and Dacal

// ALL WEATHER CONDITIONS (ACCUWEATHER)

var Conditions = [
            "blank", // 0 NOT USED
            "clear", // 1 sunny
            "fair", // 2 mostly sunny
            "partlycloudy", // 3 partly sunny
            "partlycloudy", // 4 Intermittent Clouds
            "haze", // 5 hazy sunshine
            "mostlycloudy", // 6 mostly cloudy
            "cloud", // 7 Cloudy
            "cloud", // 8 Cloudy
            "blank", // 9 NOT USED
            "blank", // 10 NOT USED
            "fog", // 11 fog
            "showers_cloud", // 12 showers
            "showers_cloud", // 13 mostly cloudy w/ showers
            "showers_cloud", // 14 partly sunny w/ showers
            "thunderstorm", // 15 T-storms
            "thunderstorm", // 16 Mostly Cloudy w/ T-Storms
            "thunderstorm", // 17 Partly Sunny w/ T-Storms
            "rain", // 18 rain
            "snow", // 19 Flurries
            "snow", // 20 Mostly Cloudy w/ Flurries
            "snow", // 21 Partly Sunny w/ Flurries
            "heavy_snow", // 22 Snow
            "heavy_snow", // 23 Mostly Cloudy w/ Snow
            "hail", // 24 Ice
            "sleet", // 25 cold
            "sleet", // 26 Freezing Rain
            "blank", // 27 NOT USED
            "blank", // 28 NOT USED
            "sleet", // 29 Rain and Snow
            "clear", // 30 Hot
            "frost", // 31 Cold
            "windy", // 32 Windy
            "clear", // 33 clear
            "fair", // 34 Mostly Clear
            "partlycloudy", // 35 Partly Cloudy
            "partlycloudy", // 36 Intermittent Clouds
            "haze", // 37 Hazy Moonlight
            "mostlycloudy", // 38 Mostly Cloudy
            "showers_cloud", // 39 Partly Cloudy w/ Showers
            "showers_cloud", // 40 Mostly Cloudy w/ Showers
            "thunderstorm", // 41 Partly Cloudy w/ T-Storms
            "thunderstorm", // 42 Mostly Cloudy w/ T-Storms
            "snow", // 43 Mostly Cloudy w/ Flurries
            "heavy_snow"]; // 44 Mostly Cloudy w/ Snow

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
	var mil = currentTime.getMilliseconds();
	var currentDate = currentTime.getDate() < 10 ? '' + currentTime.getDate() : currentTime.getDate();
    time_to_change_wall = currentHours + currentMinutes / 60;
    timeOfDay = (currentHours < 12) ? "am" : "pm";

    if (ampm == false) {
        timeOfDay = "";
        currentHours = (currentHours < 10 ? "0" : "") + currentHours;
        currentTimeString = currentHours + ":" + currentMinutes;
    } else {
        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
        currentHours = (currentHours < 10 ? "0" : "") + currentHours;
        currentHours = (currentHours == 0) ? 12 : currentHours;
        currentTimeString = currentHours + ":" + currentMinutes;
    }

// ANALOG CLOCK
    if (AnalogClock == true) {
		if (Second_Hand_Sweep == true) { 
			var sdegree = currentSeconds * 6 + (mil / (1000/6));
			var srotate = "rotate(" + sdegree + "deg)";
		} else {
			var sdegree = currentSeconds * 6;
			var srotate = "rotate(" + sdegree + "deg)";
		}
		var mdegree = currentMinutes * 6;
		var mrotate = "rotate(" + mdegree + "deg)";
        $("#minhand").css("-webkit-transform", mrotate);

		var hdegree = currentHours * 30 + (currentMinutes / 2);
		var hrotate = "rotate(" + hdegree + "deg)";
        $("#hourhand").css("-webkit-transform", hrotate);

        switch (Second_Hand_Options) {
        case "big":
            $("#bigsechand").css("-webkit-transform", srotate);
            break;
        case "small":
            $("#smallsechand").css("-webkit-transform", srotate);
            break;
        case "both":
            $("#smallsechand, #bigsechand").css("-webkit-transform", srotate);
            break;
        }
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
        document.getElementById("SingleLineDate").innerHTML = currentTime.getFullYear() + "년 " + months[currentTime.getMonth()] + " " + currentDate + "일 " + days[currentTime.getDay()] + "요일 ";
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
    if (tempUnit == "c") { tempUnit = 1; } else { tempUnit = 0; }
    locale = Accuweather_Code;

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
    document.getElementById("feelslike").innerHTML = '<span>' + feelsliketext + '</span><span style = "font-size: 16px;">' + "35" + "&#176;" + '</span>';
    document.getElementById("low").innerHTML = '<span>' + lowtext + '</span><span style="font-size: 14px;">' + "24" + "&#176;" + '</span>';
    document.getElementById("high").innerHTML = '<span>' + hightext + '</span><span style="font-size: 14px;">' + "32" + "&#176;" + '</span>';
    document.getElementById("humidity").innerHTML = '<span>' + humiditytext + '</span><span style = "font-size: 13px;">' + "80%" + '</span>';
    document.getElementById("coordinates").innerHTML = "DEMO MODE";
    document.getElementById("UVIndex").innerHTML = '<span>' + UVIndextext + '</span><span style = "font-size: 16px; color: #f7e400;">' + "5" + '</span>';
    document.getElementById("coordinates").className = "TextColorGrey";
    document.getElementById("sunrisetext").innerHTML = sunrisetext;
    document.getElementById("sunsettext").innerHTML = sunsettext;
    document.getElementById("moonrisetext").innerHTML = moonrisetext;
    document.getElementById("moonsettext").innerHTML = moonsettext;
    document.getElementById("fullmoon").innerHTML = "AccuWeather Demo";

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

	var moonriseh = moonrise_demo.split(':')[0];
	var moonrisem = moonrise_demo.split(':')[1];
	var moonseth = moonset_demo.split(':')[0];
	var moonsetm = moonset_demo.split(':')[1];

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

         moonriseh = (moonriseh < 10 ? "0" : "") + moonriseh;
         moonseth = (moonseth < 10 ? "0" : "") + moonseth;
         var moonrise = moonriseh + ":" + moonrisem;
         var moonset = moonseth + ":" + moonsetm;
    } else {
         var timeOfSunset = (sunseth < 12) ? "am" : "pm";
         var timeOfSunrise = (sunriseh < 12) ? "am" : "pm";
         sunriseh = (sunriseh > 12) ? sunriseh - 12 : sunriseh;
         sunriseh = (sunriseh == 0) ? 12 : sunriseh;
         sunseth = (sunseth > 12) ? sunseth - 12 : sunseth;
         sunseth = (sunseth == 0) ? 12 : sunseth;
         var sunrise = sunriseh + ":" + sunrisem + " " + timeOfSunrise;
         var sunset = sunseth + ":" + sunsetm + " " + timeOfSunset;

         var timeOfMoonset = (moonseth < 12) ? "am" : "pm";
         var timeOfMoonrise = (moonriseh < 12) ? "am" : "pm";
         moonriseh = (moonriseh > 12) ? moonriseh - 12 : moonriseh;
         moonriseh = (moonriseh == 0) ? 12 : moonriseh;
         moonseth = (moonseth > 12) ? moonseth - 12 : moonseth;
         moonseth = (moonseth == 0) ? 12 : moonseth;
         var moonrise = moonriseh + ":" + moonrisem + " " + timeOfMoonrise;
         var moonset = moonseth + ":" + moonsetm + " " + timeOfMoonset;
    }

    if (SunsetSunrise == true) {
         document.getElementById("sunrise").innerHTML = sunrise;
         document.getElementById("sunset").innerHTML = sunset;
         document.getElementById("sunrise").style.display = "block";
         document.getElementById("sunset").style.display = "block";

         document.getElementById("moonrise").innerHTML = moonrise;
         document.getElementById("moonset").innerHTML = moonset;
         document.getElementById("moonrise").style.display = "block";
         document.getElementById("moonset").style.display = "block";
    }
	
	if ((time_to_change_wall < dayhour) || (time_to_change_wall >= nighthour)) { where = "night"; } else { where = "day"; }
	sunmoonMove();
	
	if ((WindTest >= Strong_Wind) && (filename != "windy") && (wind_effects != "none")) { Start_wind_effects = true; } else { Start_wind_effects = false; }
	
	if (WeatherTest != "frost") {
		if (tempUnit == 1) {		
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

        document.getElementById("coordinates").className = "TextColorGrey";
        document.getElementById("coordinates").innerHTML = obj.coordinates;
        document.getElementById("city").className =  TextColor;
        document.getElementById("city").innerHTML = obj.city;

        if (useRealFeel == true) {
            var tempValue = obj.realFeel;
            document.getElementById("low").innerHTML = '<span>' + lowtext + '</span><span style = "font-size: 14px;">' + obj.forecastreallow[0] + '&#176;</span>';
            document.getElementById("high").innerHTML = '<span>' + hightext + '</span><span style = "font-size: 14px;">' + obj.forecastrealhigh[0] + '&#176;</span>';
        } else {
            var tempValue = obj.temp;
            document.getElementById("low").innerHTML = '<span>' + lowtext + '</span><span style = "font-size: 14px;">' + obj.forecastlow[0] + '&#176;</span>';
            document.getElementById("high").innerHTML = '<span>' + hightext + '</span><span style = "font-size: 14px;">' + obj.forecasthigh[0] + '&#176;</span>';
        }

        document.getElementById("temp").innerHTML = tempValue + "&#176;";
        document.getElementById("feelslike").innerHTML = '<span>' + feelsliketext + '</span><span style = "font-size: 16px;">' + obj.realFeel + '&#176;</span>';

        if (tempValue == obj.realFeel) {
            document.getElementById("feelslike").style.display = "none";
        } else {
            document.getElementById("feelslike").style.display = "block";
        }

        document.getElementById("pressure").innerHTML = pressuretext + obj.pressure + " " + obj.pressureunit;
        document.getElementById("lastupdate").innerHTML = lastupdatetext + '</span><span style = "font-size: 11px;">' + currentTimeString + ' ' + timeOfDay + '</span>';
        document.getElementById("visibility").innerHTML = visibilitytext + obj.visibility + " " + obj.visibilityunit;
        document.getElementById("humidity").innerHTML = '<span>' + humiditytext + '</span><span style="font-size: 13px;">' + obj.humidity + '</span>';
        document.getElementById("sunrisetext").innerHTML = sunrisetext;
        document.getElementById("sunsettext").innerHTML = sunsettext;

        document.getElementById("moonrisetext").innerHTML = moonrisetext;
        document.getElementById("moonsettext").innerHTML = moonsettext;

        if (obj.UVIndex  >= 11) { var color = "#998cff;"; }
        if (obj.UVIndex <= 10) { var color = "#ff0000;"; }
        if (obj.UVIndex <= 7) { var color = "#ff9000;"; }
        if (obj.UVIndex <= 5) { var color = "#f7e400;"; }
        if (obj.UVIndex <= 2) { var color = "#4eb400;"; }
        document.getElementById("UVIndex").innerHTML = '<span>' + UVIndextext + '</span><span style="font-size: 16px; color: ' + color + '">' + obj.UVIndex + '</span>';

        if (obj.rising == "Steady") { document.getElementById('rising').innerHTML = "&larr;&rarr;"; }
        if (obj.rising == "Rising") { document.getElementById('rising').innerHTML = "&uarr;"; }
        if (obj.rising == "Decreasing") { document.getElementById('rising').innerHTML = "&darr;"; }

		// Translation
        document.getElementById("desc").innerHTML = TranslateAccu(obj.icon, obj.description);

        if (obj.windspeed == 0) {
            document.getElementById("wind").innerHTML = windtext + "No wind";
        } else {
            document.getElementById("wind").innerHTML = windtext + obj.winddir + " - " + Math.round(obj.windspeed) + " " + obj.windunit;
        }

        // SUNSET/SUNRISE FORMAT
        var sunriseh = obj.sunrise.split(":")[0].replace('"', "");
        var sunrisem = obj.sunrise.split(":")[1].replace('"', "");
        var sunseth = obj.sunset.split(":")[0].replace('"', "");
        var sunsetm = obj.sunset.split(":")[1].replace('"', "");
        sunriseh = parseInt(sunriseh) + GMT -1;
        sunseth = parseInt(sunseth) + GMT -1;

        var moonriseh = obj.moonrise.split(":")[0].replace('"', "");
        var moonrisem = obj.moonrise.split(":")[1].replace('"', "");
        var moonseth = obj.moonset.split(":")[0].replace('"', "");
        var moonsetm = obj.moonset.split(":")[1].replace('"', "");
        moonriseh = parseInt(moonriseh) + GMT -1;
        moonseth = parseInt(moonseth) + GMT -1;

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

            moonriseh = (moonriseh < 10 ? "0" : "") + moonriseh;
            moonseth = (moonseth < 10 ? "0" : "") + moonseth;
            var moonrise = moonriseh + ":" + moonrisem;
            var moonset = moonseth + ":" + moonsetm;
        } else {
            var timeOfSunset = (sunseth < 12) ? "am" : "pm";
            var timeOfSunrise = (sunriseh < 12) ? "am" : "pm";
            sunriseh = (sunriseh > 12) ? sunriseh - 12 : sunriseh;
            sunriseh = (sunriseh == 0) ? 12 : sunriseh;
            sunseth = (sunseth > 12) ? sunseth - 12 : sunseth;
            sunseth = (sunseth == 0) ? 12 : sunseth;
            var sunrise = sunriseh + ":" + sunrisem + " " + timeOfSunrise;
            var sunset = sunseth + ":" + sunsetm + " " + timeOfSunset;

            var timeOfMoonset = (moonseth < 12) ? "am" : "pm";
            var timeOfMoonrise = (moonriseh < 12) ? "am" : "pm";
            moonriseh = (moonriseh > 12) ? moonriseh - 12 : moonriseh;
            moonriseh = (moonriseh == 0) ? 12 : moonriseh;
            moonseth = (moonseth > 12) ? moonseth - 12 : moonseth;
            moonseth = (moonseth == 0) ? 12 : moonseth;
            var moonrise = moonriseh + ":" + moonrisem + " " + timeOfMoonrise;
            var moonset = moonseth + ":" + moonsetm + " " + timeOfMoonset;
        }

        if (SunsetSunrise == true) {
            document.getElementById("sunrise").innerHTML = sunrise;
            document.getElementById("sunset").innerHTML = sunset;
            document.getElementById("sunrise").style.display = "block";
            document.getElementById("sunset").style.display = "block";

            document.getElementById("moonrise").innerHTML = moonrise;
            document.getElementById("moonset").innerHTML = moonset;
            document.getElementById("moonrise").style.display = "block";
            document.getElementById("moonset").style.display = "block";
        }

        // SUN/MOON
		document.getElementById("moon").style.backgroundImage = "url(Images/Weather/moon/Phase/" + obj.moonphase[0] + ".png)";
		document.getElementById("arcmoon").style.backgroundImage = "url(Images/Weather/moon/Phase/" + obj.moonphase[0] + ".png)";	
        if ((time_to_change_wall < dayhour) || (time_to_change_wall >= nighthour)) { where = "night"; } else { where = "day"; }
		sunmoonMove();
		
        for (var i=0; i < obj.moondate.length; i++) {
            if ((obj.moondesc[i] == "Full") || (obj.moondesc[i] == "New")) {
            var moonstate = obj.moondesc[i];
            var moondate = months[obj.moondate[i].split('/')[0]-1].substring(0, 3) + ". " + obj.moondate[i].split('/')[1];
            break;
            }
        }

        if (display_moon_info == true) {
            document.getElementById("fullmoon").innerHTML = moonstate + " moon on " + moondate; }

        // END OF SUN/MOON

        // LOADING WEATHER CONDITIONS

        if ((Math.round(obj.windspeed) >= Strong_Wind) && (Conditions[obj.icon] != "windy")  && (wind_effects != "none")) { Start_wind_effects = true; } else { Start_wind_effects = false; }

		if (Conditions[obj.icon] != "frost") {
            if (tempUnit == 1) {
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
        demo();
    }
} // End of dealWithWeather function

function delelement(elem) {
    var element = document.getElementById(elem);
    while (element.firstChild) { element.removeChild(element.firstChild); }
}

function weatherRefresherTemp(zip) {
    if (zip == null) {
        zip = locale;
        gps = false;
        fetchWeatherData(dealWithWeather, zip);
    } else {
        fetchWeatherData(dealWithWeather, zip);
    }
}

function fetchWeatherData(callback, zip) {
    var url = "http://apple.accuweather.com/adcbin/apple/Apple_Weather_Data.asp?zipcode=" + zip + "&metric=" + tempUnit;
    $.get(url, function (data) {
        xmldata = true;
        obj = {error: false};
        $(data).find('CurrentConditions').each(function () {
            if (gps == false) {
                obj.city = $.trim($(this).find('City').text());
                if (zip.indexOf('|') != -1) { // ONLY FOR ZIP OUT OF USA
                    tempzip = zip.split('|');
                    obj.coordinates = tempzip[3].substr(0, 15);
                } else {
                    obj.coordinates = zip;
                }
            } else {
                obj.city = city;
                obj.coordinates = textLat + " " + textLong;
            }
            if (obj.city=="Busan") obj.city="부산";
			if (obj.city=="Kangnung") obj.city="강릉";
			if (obj.city=="Kwangju") obj.city="광주";
			if (obj.city=="Kunsan") obj.city="군산";
			if (obj.city=="Kimch'on") obj.city="김천";
			if (obj.city=="Taegwallyong") obj.city="대관령";
			if (obj.city=="Taegu") obj.city="대구";
			if (obj.city=="Taejon") obj.city="대전";
			if (obj.city=="Tonghae") obj.city="동해";
			if (obj.city=="Masan") obj.city="마산";
			if (obj.city=="Mokp'o") obj.city="목포";
			if (obj.city=="Miryang") obj.city="밀양";
			if (obj.city=="Polgyo") obj.city="벌교";
			if (obj.city=="Pusan") obj.city="부산";
			if (obj.city=="Sogwipo") obj.city="서귀포";
			if (obj.city=="Sosan") obj.city="서산";
			if (obj.city=="Seoul") obj.city="서울";
			if (obj.city=="Songnam") obj.city="성남";
			if (obj.city=="Sokcho") obj.city="속초";
			if (obj.city=="Suwon") obj.city="수원";
			if (obj.city=="Andong") obj.city="안동";
			if (obj.city=="Anyang") obj.city="안양";
			if (obj.city=="Yangyang") obj.city="양양";
			if (obj.city=="Yosu") obj.city="여수";
			if (obj.city=="Yongwol") obj.city="영월";
			if (obj.city=="Osan") obj.city="오산";
			if (obj.city=="Wando") obj.city="완도";
			if (obj.city=="Ullungdo") obj.city="울릉도";
			if (obj.city=="Ulsan") obj.city="울산";
			if (obj.city=="Ulchin") obj.city="울진";
			if (obj.city=="Wonju") obj.city="원주";
			if (obj.city=="Uisong") obj.city="의송";
			if (obj.city=="Iri") obj.city="이리";
			if (obj.city=="Inch'on") obj.city="인천";
			if (obj.city=="Chonju") obj.city="전주";
			if (obj.city=="Cheju") obj.city="제주";
			if (obj.city=="Cheju") obj.city="북제주";
			if (obj.city=="Chinju") obj.city="진주";
			if (obj.city=="Chinhae") obj.city="진해";
			if (obj.city=="Ch'angwon") obj.city="창원";
			if (obj.city=="Ch'onan") obj.city="천안";
			if (obj.city=="Cholwon") obj.city="철원";
			if (obj.city=="Chungju") obj.city="청주";
			if (obj.city=="Chupungnyong") obj.city="추풍령";
			if (obj.city=="Chunchon") obj.city="춘천";
			if (obj.city=="Chungmu") obj.city="충무,통영";
			if (obj.city=="Ch'ungju") obj.city="충주";
			if (obj.city=="Pohang") obj.city="포항";
			if (obj.city=="Haenam") obj.city="해남";            
            obj.windspeed = $.trim($(this).find('WindSpeed').text()) * 1;
            obj.humidity = $.trim($(this).find('Humidity').text());
            obj.icon = $.trim($(this).find('WeatherIcon').text()) * 1;
            obj.winddir =  $.trim($(this).find('WindDirection').text());
            obj.rising = $.trim($(this).find('Pressure').attr('state'));
            obj.visibility = $.trim($(this).find('Visibility').text()) * 1;
            obj.UVIndex = $.trim($(this).find('UVIndex').text());
            if (tempUnit == 1) {
                obj.pressure = Math.round($.trim($(this).find('Pressure').text()) * 33.8638864);
            } else {
                obj.pressure = $(this).find('Pressure').text();
            }
            obj.realFeel = $.trim($(this).find('RealFeel').text());
            obj.temp = $.trim($(this).find('Temperature').text());
            obj.description = $.trim($(this).find('WeatherText').text());
        });
		
		
        obj.moondesc = [];
        obj.moondate = [];
        obj.moonphase = [];
        var t = 0; 
        $(data).find('Phase').each(function () {
        obj.moondesc[t] = $.trim($(this).attr('text'));
        obj.moondate[t] = $.trim($(this).attr('date')); 
        obj.moonphase[t] = $.trim($(this).text());
        t++;
        });
		
        obj.sunrise =  $.trim($(data).find('Sun').attr('rise'));
        obj.sunset = $.trim($(data).find('Sun').attr('set'));
        obj.moonrise =  $.trim($(data).find('Moon').attr('rise'));
        obj.moonset = $.trim($(data).find('Moon').attr('set'));
        obj.forecastday = [];
        obj.forecasthigh = [];
        obj.forecastlow = [];
        obj.forecastreallow = [];
        obj.forecastrealhigh = [];
        obj.forecastcode = [];
        var i = 0;
        $(data).find('day').each(function () {
            obj.forecastday[i] = $.trim($(this).find("DayCode").text()).substring(0, 3);
            obj.forecastlow[i] = $.trim($(this).find("Low_Temperature").text());
            obj.forecasthigh[i] = $.trim($(this).find("High_Temperature").text());
            obj.forecastreallow[i] = $.trim($(this).find("Low_Temperature").text());
            obj.forecastrealhigh[i] = $.trim($(this).find("Real_Feel_High").text());
            obj.forecastcode[i] = convertAccuIcon($.trim($(this).find("WeatherIcon").text()) * 1);
            i++;
        });
        if (obj.description == "Unknown") {
            obj.description = obj.forecasttext[0];
            obj.icon = obj.forecastcode[0];
        }
        obj.pressureunit = (tempUnit == 0) ? "in" : "mb";
        obj.visibilityunit = (tempUnit == 0) ? "mi" : "km";
        obj.windunit =  (tempUnit == 0) ? "mph" : "km/h";

        callback(obj);

    }).fail(function () {
        if (xmldata == true) {
            document.getElementById("coordinates").className = "TextColorRed";
            document.getElementById("coordinates").innerHTML = "OFFLINE";
        } else {
            callback({error: true});
        }
    });
} // End of fetchWeatherData function

function convertAccuIcon(icon) {
    switch (icon) {
    case 1:
        { return 32; }
    case 2:
        { return 34; }
    case 3:
        { return 34; }
    case 4:
        { return 30; }
    case 5:
        { return 21; }
    case 6:
        { return 28; }
    case 7:
        { return 26; }
    case 8:
        { return 26; }
    case 9:
        { return 48; }
    case 10:
        { return 48; }
    case 11:
        { return 20; }
    case 12:
        { return 11; }
    case 13:
        { return 39; }
    case 14:
        { return 39; }
    case 15:
        { return 38; }
    case 16:
        { return 37; }
    case 17:
        { return 37; }
    case 18:
        { return 40; }
    case 19:
        { return 13; }
    case 20:
        { return 14; }
    case 21:
        { return 14; }
    case 22:
        { return 16; }
    case 23:
        { return 16; }
    case 24:
        { return 8; }
    case 25:
        { return 18; }
    case 26:
        { return 10; }
    case 27:
        { return 48; }
    case 28:
        { return 48; }
    case 29:
        { return 5; }
    case 30:
        { return 36; }
    case 31:
        { return 25; }
    case 32:
        { return 24; }
    case 33:
        { return 31; }
    case 34:
        { return 33; }
    case 35:
        { return 29; }
    case 36:
        { return 29; }
    case 37:
        { return 21; }
    case 38:
        { return 27; }
    case 39:
        { return 45; }
    case 40:
        { return 45; }
    case 41:
        { return 47; }
    case 42:
        { return 47; }
    case 43:
        { return 46; }
    case 44:
        { return 46; }
    }
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