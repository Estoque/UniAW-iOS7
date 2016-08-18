// Cloudy condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

document.getElementById("twilightBG").style.display= "none";

var NUMBER_OF_CLOUDS = 10; // clouds to show on screen
var NUMBER_OF_CLOUD_IMAGES = 17; // images + 1
var container = document.getElementById("cloudContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container.appendChild(createACloud()); }

var container1 = document.getElementById("frameContainer");
container1.appendChild(createAlight());

if (sun_moon_arc == true) {
	document.getElementById("arcmoon").style.display='none';
	document.getElementById("arcsun").style.display='none';
	document.getElementById("arcmoonray").style.display='none';
	document.getElementById("arcsunray").style.display='none';
	document.getElementById("arcsunrings").style.display='none';
	} else {
	document.getElementById("moon").style.display='none';
	document.getElementById("sun").style.display='none';
	document.getElementById("moonray").style.display='none';
	document.getElementById("sunray").style.display='none';
	document.getElementById("sunrings").style.display='none';
}

if (where == "day") {

	if (Show_Birds == true) {
		var container5 = document.getElementById("birdsContainer");
		container5.appendChild(createBbird());
		}
		
	if (V_Formation_Birds == true) {
			var container4 = document.getElementById("birdsContainer");
			container4.appendChild(createAbird());
		}

	if (Cloudy_Balloons == true) { 
		if (ShowBigBalloons == true) {
			var NUMBER_OF_BIG_BALLOON__IMAGES = 8; // images + 1
			var container2 = document.getElementById("big_balloonContainer");
			for (var i = 0; i < Number_Of_Big_Balloons; i++) { container2.appendChild(createABalloon()); }
		}
		if (ShowSmallBalloons == true) {
			var NUMBER_OF_SMALL_BALLOON__IMAGES = 6; // images + 1
			var container3 = document.getElementById("small_balloonContainer");
			for (var i = 0; i < Number_Of_Small_Balloons; i++) { container3.appendChild(createBBalloon()); }
		}
	}
} // End of Daytime

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

function createAlight() {
    var image = document.createElement("img");
    image.id = "Static_cloud";	
    image.src = "Images/Weather/rain/Static_cloud.png";
    return image;
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

