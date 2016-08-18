// Thunderstorm condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

document.getElementById("twilightBG").style.display= "none";

var container = document.getElementById("frameContainer");
container.appendChild(createAlight2());

var NUMBER_OF_CLOUDS = 10; // clouds to show on screen
var NUMBER_OF_CLOUD_IMAGES = 17; // images + 1
var container1 = document.getElementById("cloudContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container1.appendChild(createACloud()); }

if ( RainDropsAndCircles == false ) {

if ( DropRain == false ) {
	var NUMBER_OF_circle = 20; // drop to show on screen
	var NUMBER_OF_CIRCLE_IMAGES = 5; // images + 1
	var container2 = document.getElementById("circleContainer");
	for (var i = 0; i < NUMBER_OF_circle; i++) 	{
		var topDiv = pixelValue(randomInteger(20, 400));
		var leftDiv = pixelValue(randomInteger(20, 300));
		var fadeAndDropDuration = durationValue(randomFloat(2, 4));
		var delayDuration = durationValue(randomInteger(1, 10));
		var NumCircle = randomInteger(2, NUMBER_OF_CIRCLE_IMAGES);
		for (var t = 1; t <5; t++) { container2.appendChild(createAcircle()); }
		}
} else {
	var NUMBER_OF_drop = 30; // drop to show on screen
	var NUMBER_OF_DROP_IMAGES = 9; // images + 1
	var container2 = document.getElementById("dropContainer");
	for (var i = 0; i < NUMBER_OF_drop; i++) { container2.appendChild(createAdrop()); }
}

} else {

	var NUMBER_OF_circle = 20; // drop to show on screen
	var NUMBER_OF_CIRCLE_IMAGES = 5; // images + 1
	var container2 = document.getElementById("circleContainer");
	for (var i = 0; i < NUMBER_OF_circle; i++) 	{
		var topDiv = pixelValue(randomInteger(20, 400));
		var leftDiv = pixelValue(randomInteger(20, 300));
		var fadeAndDropDuration = durationValue(randomFloat(2, 4));
		var delayDuration = durationValue(randomInteger(1, 10));
		var NumCircle = randomInteger(2, NUMBER_OF_CIRCLE_IMAGES);
		for (var t = 1; t <5; t++) { container2.appendChild(createAcircle()); }
		}

	var NUMBER_OF_drop = 30; // drop to show on screen
	var NUMBER_OF_DROP_IMAGES = 9; // images + 1
	var container2 = document.getElementById("dropContainer");
	for (var i = 0; i < NUMBER_OF_drop; i++) { container2.appendChild(createAdrop()); }
}

var container3 = document.getElementById("frameContainer");
container3.appendChild(createAlight());

var container4 = document.getElementById("frameContainer");
container4.appendChild(createAlight3());

var container5 = document.getElementById("wiperContainer");
if (ShowWiper == true) {
	container3.appendChild(createAlight4());
	container3.appendChild(createAwiper_trace());
	container3.appendChild(createAwiper_water());
}

var container6 = document.getElementById("frameContainer");
container6.appendChild(createAlight5());

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

function createAdrop() {
    var dropDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/rain/drop" + randomInteger(1, NUMBER_OF_DROP_IMAGES) + ".png";
    dropDiv.style.top = pixelValue(randomInteger(-200, 50));
    dropDiv.style.left = pixelValue(randomInteger(-10, 330));
    dropDiv.style.webkitAnimationName = "fadeDrop, drop";
    var fadeAndDropDuration = durationValue(randomFloat(1, 2));
    dropDiv.style.webkitAnimationDuration = fadeAndDropDuration + ", " + fadeAndDropDuration;
    dropDiv.appendChild(image);
    return dropDiv;
}

function createAlight() {
    var image = document.createElement("img");
    image.id = "thunder";	
    image.src = "Images/Weather/thunderstorm/Thunder2.png";
    return image;
}

function createAlight2() {
    var image = document.createElement("img");
    image.id = "thunder2";	
    image.src = "Images/Weather/thunderstorm/Thunder1.png";
    return image;
}

function createAlight3() {
    var image = document.createElement("img");
    image.id = "thunder3";	
    image.src = "Images/Weather/thunderstorm/Thunder3.png";
    return image;
}

function createAlight4() {
    var image = document.createElement("img");
    image.id = "wiper";	
    image.src = "Images/Weather/wiper/wiper.png";
    return image;
}

function createAlight5() {
    var image = document.createElement("img");
    image.id = "Static_cloud";	
    image.src = "Images/Weather/thunderstorm/Static_cloud.png";
    return image;
}

function createAcircle() {
	var circleDiv = document.createElement("div");
    var image = document.createElement("img");
	circleDiv.style.top = topDiv;
    circleDiv.style.left = leftDiv;
	if (t == 1) { image.src = "Images/Weather/rain/circle1.png"; }
	else { image.src = "Images/Weather/rain/circle" + NumCircle + ".png"; }
    circleDiv.style.webkitAnimationName = "fade" + t + ", scale" + t;
    circleDiv.style.webkitAnimationDuration = fadeAndDropDuration + "," + fadeAndDropDuration;
	circleDiv.style.webkitAnimationDelay = delayDuration +", " + delayDuration;
    circleDiv.appendChild(image);
    return circleDiv;
}

function createAwiper_trace() {
    var image = document.createElement("img");
    image.id = "trace";
    image.src = "Images/Weather/wiper/wiper_trace.png";
    return image;
}

function createAwiper_water() {
    var image = document.createElement("img");
    image.id = "water";
    image.src = "Images/Weather/wiper/wiper_water.png";
    return image;
}
