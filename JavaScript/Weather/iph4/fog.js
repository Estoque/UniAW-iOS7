// Fog condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

document.getElementById("twilightBG").style.display= "none";

var NUMBER_OF_CLOUDS = 15; // clouds to show on screen
var NUMBER_OF_IMAGES = 17; // images + 1
var container = document.getElementById("fogContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container.appendChild(createACloud()); }

if (sun_moon_arc == true) {
	document.getElementById("arcmoon").style.display='none';
	document.getElementById("arcmoonray").style.display='none';
	document.getElementById("arcsun").style.display='none';
	document.getElementById("arcsunray").style.display='none';
	document.getElementById("arcsunrings").style.display='none';
	} else {
	document.getElementById("moon").style.display='none';
	document.getElementById("moonray").style.display='none';
	document.getElementById("sun").style.display='none';
	document.getElementById("sunray").style.display='none';
	document.getElementById("sunrings").style.display='none';
}
	
function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}
function pixelValue(value) {
    return value + "px";
}
function durationValue(value) {
    return value + "s";
}

function createACloud() {
    var cloudDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/fog/fog" + randomInteger(1, NUMBER_OF_IMAGES) + ".png";
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
