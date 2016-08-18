sunrings// Partly Cloudy condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var NUMBER_OF_CLOUDS = 7; // clouds to show on screen
var NUMBER_OF_CLOUD_IMAGES = 17; // images + 1
var container = document.getElementById("cloudContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container.appendChild(createACloud()); }

if (where == "day") {
	if (Show_Birds == true) {
		var container6 = document.getElementById("birdsContainer");
		container6.appendChild(createBbird());
		}
		
	if (V_Formation_Birds == true) {
			var container7 = document.getElementById("birdsContainer");
			container7.appendChild(createAbird());
		}

	if (ShowBigBalloons == true) {
		var NUMBER_OF_BIG_BALLOON__IMAGES = 8; // images + 1
		var container3 = document.getElementById("big_balloonContainer");
		for (var i = 0; i < Number_Of_Big_Balloons; i++) { container3.appendChild(createABalloon()); }
	}

	if (ShowSmallBalloons == true) {
		var NUMBER_OF_SMALL_BALLOON__IMAGES = 6; // images + 1
		var container5 = document.getElementById("small_balloonContainer");
		for (var i = 0; i < Number_Of_Small_Balloons; i++) { container5.appendChild(createBBalloon()); }
	}
	if (sun_moon_arc == true) {
		document.getElementById("arcmoon").style.display='none';
		document.getElementById("arcmoonray").style.display='none';
		document.getElementById("arcsun").style.display='block';
		document.getElementById("arcsunray").style.display='block';
		document.getElementById("arcsunrings").style.display='block';
		} else {
		document.getElementById("moon").style.display='none';
		document.getElementById("moonray").style.display='none';
		document.getElementById("sun").style.display='block';
		document.getElementById("sunray").style.display='block';
		document.getElementById("sunrings").style.display='block';
	}
} // End of Daytime
else
{ //Start Nighttime
	if (sun_moon_arc == true) {
		document.getElementById("arcmoon").style.display='block';
		document.getElementById("arcmoonray").style.display='block';
		document.getElementById("arcsun").style.display='none';
		document.getElementById("arcsunray").style.display='none';
		document.getElementById("arcsunrings").style.display='none';
		} else {
		document.getElementById("moon").style.display='block';
		document.getElementById("moonray").style.display='block';
		document.getElementById("sun").style.display='none';
		document.getElementById("sunray").style.display='none';
		document.getElementById("sunrings").style.display='none';
	}

	var container4 = document.getElementById("starsBGContainer");
	container4.appendChild(createAbackground());
	var NUMBER_OF_METEOR = 3; // Number of meteors to show on screen
	var NUMBER_OF_METEOR_IMAGES = 3; // images + 1
	var container2 = document.getElementById("meteorContainer");
	var meteorTimer = setInterval( function () {
		delelement("meteorContainer");
		for (var i = 0; i < NUMBER_OF_METEOR; i++) { container2.appendChild(createAmeteor());	}
		}, 10000);
	var NUMBER_OF_LIGHT = 30; // Number of stars to show on screen
	var NUMBER_OF_LIGHT_IMAGES = 6; // images + 1
	var container1 = document.getElementById("starContainer");
	for (var i = 0; i < NUMBER_OF_LIGHT; i++) { container1.appendChild(createAstar()); }
}// End Nighttime
function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}

function pixelValue(value) {
    return value + "px";
}

function durationValue(value) {
    return value + "s";
}

function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}

function createABalloon() {
    var big_balloonDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/balloons/big_balloons/balloon" + randomInteger(1, NUMBER_OF_BIG_BALLOON__IMAGES) + ".png";
    big_balloonDiv.style.top = pixelValue(randomInteger(-20, 75));
    big_balloonDiv.style.left = pixelValue(randomInteger(-150, 0));
    big_balloonDiv.style.webkitAnimationName = "fade1, float1";
    var fadeAndfloatDuration = durationValue(randomFloat(80, 140));
    big_balloonDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
    big_balloonDiv.appendChild(image);
    return big_balloonDiv;
}

function createBBalloon() {
    var small_balloonDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/balloons/small_balloons/balloon" + randomInteger(1, NUMBER_OF_SMALL_BALLOON__IMAGES) + ".png";
    small_balloonDiv.style.top = pixelValue(randomInteger(-20, 20));
    small_balloonDiv.style.left = pixelValue(randomInteger(-150, 0));
    small_balloonDiv.style.webkitAnimationName = "fade1, float1";
    var fadeAndfloatDuration = durationValue(randomFloat(140, 250));
    small_balloonDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
    small_balloonDiv.appendChild(image);
    return small_balloonDiv;
}

function createAstar() {
    var starDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/moon/star" + randomInteger(1, NUMBER_OF_LIGHT_IMAGES) + ".png";
    starDiv.style.top = pixelValue(randomInteger(0, 100));
    starDiv.style.left = pixelValue(randomInteger(10, 310));
    starDiv.style.webkitAnimationName =  "star_anim";
    starDiv.style.webkitAnimationDuration = durationValue(randomInteger(5, 20));
	starDiv.style.webkitAnimationDelay = durationValue(randomInteger(1, 10));
    starDiv.appendChild(image);
    return starDiv;
}

function createAmeteor() {
    var meteorDiv = document.createElement("div");
    var image = document.createElement("img");
	var meteorNumber = randomInteger(1, NUMBER_OF_METEOR_IMAGES);
    image.src = "Images/Weather/moon/meteor" + meteorNumber + ".png";
    meteorDiv.style.top = pixelValue(randomInteger(-10, 70));
    meteorDiv.style.left = pixelValue(randomInteger(0, 320));
    meteorDiv.style.webkitAnimationName = "fade2, drop" + meteorNumber;
    var fadeAndDropDuration = durationValue(randomFloat(1, 3));
    meteorDiv.style.webkitAnimationDuration = fadeAndDropDuration + ", " + fadeAndDropDuration;
	meteorDiv.style.webkitAnimationDelay = durationValue(randomInteger(1, 7));
    meteorDiv.appendChild(image);
    return meteorDiv;
}

function createACloud() {
    var cloudDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/cloud/" + where + "/cloud" + randomInteger(1, NUMBER_OF_CLOUD_IMAGES) + ".png";
	if (FullScreenClouds == true) {
		cloudDiv.style.top = pixelValue(randomInteger(-90, 400));
		cloudDiv.style.left = pixelValue(randomInteger(-250, 0));
		cloudDiv.style.webkitAnimationName = "fade, float";
		var fadeAndfloatDuration = durationValue(randomFloat(70, 140));
		cloudDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
		cloudDiv.appendChild(image);
		return cloudDiv;
		} else {
		cloudDiv.style.top = pixelValue(randomInteger(-90, 30));
		cloudDiv.style.left = pixelValue(randomInteger(-250, 0));
		cloudDiv.style.webkitAnimationName = "fade, float";
		var fadeAndfloatDuration = durationValue(randomFloat(70, 140));
		cloudDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
		cloudDiv.appendChild(image);
		return cloudDiv;
	}
}

function createBbird() {
    var image = document.createElement("img");
    image.id = "birds1";	
    image.src = "Images/Weather/birds/birds1.gif";
    return image;
}

function createAbird() {
	var image = document.createElement("img");
	image.id = "V_Birds";	
	image.src = "Images/Weather/birds/V_Birds.gif";
	return image;
}

function createAbackground() {
    var image = document.createElement("img");
    image.id = "starsBG";	
    image.src = "Images/Weather/moon/starsBG.png";
    return image;
}
