// UniAW6.4SB By Ian Nicoll and Dacal

/*  LANGUAGES LIST:
(it) for Italian
(fi) for Finland
(nl) for Dutch
(fr) for french
(ge) for german
(sp) for spanish
(cn) for Chinese
(ru) for Russian
(en) or for english
*/

/* UniAW iOS7 Customized and Localized by Estoque - est0que.tistory.com */

var gps = false;

var useAccuweather = true; // false for Yahoo.


var Yahoo_Code = "1199409";


var sunmoon_position_refresh = true; // true to update the moon/sun position & twilight effect every minute.
var twilight = false; // Twilight effects around sunrise/sunset times.

var Hide_All_Weather_Info = false; // for "animations only" set to "true"
var Hide_WeatherInfo_Background = false; // for "animations only" set to "true"
var Hide_Forecast_Background = false; // for "animations only" set to "true"

var showDock = false; // for "animations only" set to "false"

var Wallpaper_options = "none"; // slideshow, timedwalls, daynightwalls, weatherwalls, default or none.

var AnalogClock = false; // for "animations only" set to "false"
var AnalogClock_Calendar = false; // for "animations only" set to "false"
var DigitalClock = true;
var SecDisplay = false; // digital clock only.
var Single_Line_Date = true;


var Second_Hand_Options = "big";	 // big, small, both or none.
var Second_Hand_Sweep = false;

var No_Internet_logo = false; // true to show logo when offline.
var logo_color = "blue"; // blue, gold, silver or glass.

var tempUnit = "c"; // "f" for fahrenheit.


var GMT = 0; // adjust for summertime.

var Strong_Wind = 30; // Wind speed required to activate wind effects.

var SunsetSunrise = true;

var ShowAstronaut = false;

var ShowWiper = false;

var ShowRainbow = true;

var display_moon_info = false; // true or false to display next full/New moon date.

var Show_Birds = false;
var V_Formation_Birds = false;

var UseCityGPS = false; // Use the GPS localization (if available).
var UseNeighborhood = false; // Use neighborhood (or state) for City name.

var Reverse_Hi_Lo = false; // Display Hi temperatures first in the 4 day forecast.
var iconSet = "HTC"; // HTC, DB, spils, stardock, or semitrans.

var ShowBigBalloons = false;
var Number_Of_Big_Balloons = 2; // no limit.
var ShowSmallBalloons = false;
var Number_Of_Small_Balloons = 3; // no limit.
var Cloudy_Balloons = false;

var DropRain = true;	
var RainDropsAndCircles = false;

var FullScreenFogHaze = true;
var FullScreenClouds = true;

var wind_effects = "leaves"; // leaves, dandelion, windmill or none.
var White_Dandelion_Seeds_During_Night = false;
var White_Dandelion_Flowers_During_Night = false;

var frost_effect = false; // frost effect when your temp hits 0C or 32F.
var tempTest = 33; // See frost effect in demo: Set this to: 0 or below if you're on C, 32 or below if you're on F.

var DacalSun = true;
var sun_moon_arc = true;
var Sun_Moon_from_right_to_left = false;

var PicNumber = 15; //for SlideShow.
var PicExt = "jpg"; // jpg or png.
var SlideSpeed = 10; // in seconds.

var DemoMode = false;
var WeatherTest = "clear"; // choose from list below.
var WindTest = 20; // set higher than "strong_wind" value to activate.
var sunrise_demo = "6:02"; // IN 24 HOURS FORMAT !
var sunset_demo = "18:59"; // IN 24 HOURS FORMAT !
var moonrise_demo = "21:00"; // IN 24 HOURS FORMAT !
var moonset_demo = "4:00"; // IN 24 HOURS FORMAT !

/* WEATHER CONDITIONS LIST FOR DEMO MODE:
clear
cloud
fair
fog
frost
hail
haze
heavy_snow
mostlycloudy
partlycloudy
rain
showers_cloud
sleet
snow
snow_showers
thunderstorm
windy
*/

//END