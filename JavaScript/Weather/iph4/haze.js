// Haze condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var NUMBER_OF_CLOUDS = 20; // clouds to show on screen
var NUMBER_OF_IMAGES = 17; // images + 1
var container = document.getElementById("fogContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container.appendChild(createACloud()); }

if (where == "day") {
	if (DacalSun == false) {
	document.getElementById("sun").style.backgroundImage = "url(Images/Weather/sun/dacals_sun.png)";
	document.getElementById("sunray").style.backgroundImage = "url(Images/Weather/sun/dacals_sunray.png)";
	document.getElementById("sunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
	document.getElementById("arcsun").style.backgroundImage = "url(Images/Weather/sun/dacals_sun.png)";
	document.getElementById("arcsunray").style.backgroundImage = "url(Images/Weather/sun/dacals_sunray.png)";
	document.getElementById("arcsunrings").style.backgroundImage = "url(Images/Weather/sun/sunrings.png)";
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

	var NUMBER_OF_LIGHT = 30; // Number of stars to show on screen
	var NUMBER_OF_LIGHT_IMAGES = 6; // images + 1
	var container1 = document.getElementById("starContainer");
	for (var i = 0; i < NUMBER_OF_LIGHT; i++) { container1.appendChild(createAstar()); }

	var NUMBER_OF_METEOR = 3; // Number of meteors to show on screen
	var NUMBER_OF_METEOR_IMAGES = 3; // images + 1
	var container2 = document.getElementById("meteorContainer");
	var meteorTimer = setInterval( function () {
		delelement("meteorContainer");
		for (var i = 0; i < NUMBER_OF_METEOR; i++) { container2.appendChild(createAmeteor()); }
		}, 10000);

	var container3 = document.getElementById("starsBGContainer");
	container3.appendChild(createAbackground());
} // End of nighttime

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
    var fadeAndDropDuration = durationValue(randomFloat(1, 2));
    meteorDiv.style.webkitAnimationDuration = fadeAndDropDuration + ", " + fadeAndDropDuration;
	meteorDiv.style.webkitAnimationDelay = durationValue(randomInteger(1, 7));
    meteorDiv.appendChild(image);
    return meteorDiv;
}

function createACloud() {
    var cloudDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/haze/fog" + randomInteger(1, NUMBER_OF_IMAGES) + ".png";
	if (FullScreenFogHaze == true) {
		cloudDiv.style.top = pixelValue(randomInteger(-110, 300));
		cloudDiv.style.left = pixelValue(randomInteger(-340, 50));
		cloudDiv.style.webkitAnimationName = "fade, float";
		var fadeAndfloatDuration = durationValue(randomFloat(12, 25));
		cloudDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
		cloudDiv.appendChild(image);
		return cloudDiv;
		} else {
		cloudDiv.style.top = pixelValue(randomInteger(-110, -20));
		cloudDiv.style.left = pixelValue(randomInteger(-340, 50));
		cloudDiv.style.webkitAnimationName = "fade, float";
		var fadeAndfloatDuration = durationValue(randomFloat(12, 25));
		cloudDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
		cloudDiv.appendChild(image);
		return cloudDiv;
	}
}

function createAbackground() {
    var image = document.createElement("img");
    image.id = "starsBG";	
    image.src = "Images/Weather/moon/starsBG.png";
    return image;
}
