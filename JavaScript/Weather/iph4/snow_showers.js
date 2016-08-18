// Snow Showers condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var NUMBER_OF_CLOUDS = 10; // clouds to show on screen
var NUMBER_OF_CLOUD_IMAGES = 17; // images + 1
var container1 = document.getElementById("cloudContainer");
for (var i = 0; i < NUMBER_OF_CLOUDS; i++) { container1.appendChild(createACloud()); }

var NUMBER_OF_drop = 40; // drop to show on screen
var NUMBER_OF_DROP_IMAGES = 4; // images + 1
var container2 = document.getElementById("dropContainer");
for (var i = 0; i < NUMBER_OF_drop; i++) { container2.appendChild(createAdrop()); }

var container3 = document.getElementById("wiperContainer");
if (ShowWiper == true) {
	container3.appendChild(createAlight());
	container3.appendChild(createAwiper_trace());
	container3.appendChild(createAwiper_water());
}

var container4 = document.getElementById("frameContainer");
container4.appendChild(createAlight1());

if (where == "day") {
	if (sun_moon_arc == true) {
	document.getElementById("arcmoon").style.display='none';
	document.getElementById("arcsun").style.display='block';
	document.getElementById("arcmoonray").style.display='none';
	document.getElementById("arcsunray").style.display='block';
	document.getElementById("arcsunrings").style.display='block';
	} else {
	document.getElementById("moon").style.display='none';
	document.getElementById("sun").style.display='block';
	document.getElementById("moonray").style.display='none';
	document.getElementById("sunray").style.display='block';
	document.getElementById("sunrings").style.display='block';
	}
} // End of Daytime
else
{ //Start Nighttime
	if (sun_moon_arc == true) {
	document.getElementById("arcmoon").style.display='block';
	document.getElementById("arcsun").style.display='none';
	document.getElementById("arcmoonray").style.display='block';
	document.getElementById("arcsunray").style.display='none';
	document.getElementById("arcsunrings").style.display='none';
	} else {
	document.getElementById("moon").style.display='block';
	document.getElementById("sun").style.display='none';
	document.getElementById("moonray").style.display='block';
	document.getElementById("sunray").style.display='none';
	document.getElementById("sunrings").style.display='none';
	}
} // End Nighttime

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
    image.src = "Images/Weather/snow/snow" + randomInteger(1, NUMBER_OF_DROP_IMAGES) + ".png";
    dropDiv.style.top = pixelValue(randomInteger(-200, 50));
    dropDiv.style.left = pixelValue(randomInteger(0, 330));
    dropDiv.style.webkitAnimationName = "fade2, drop";
    var fadeAndDropDuration = durationValue(randomFloat(4, 10));
    dropDiv.style.webkitAnimationDuration = fadeAndDropDuration + ", " + fadeAndDropDuration;
    dropDiv.appendChild(image);
    return dropDiv;
}

function createAlight() {
    var image = document.createElement("img");
    image.id = "wiper";	
    image.src = "Images/Weather/wiper/wiper.png";
    return image;
}

function createAlight1() {
    var image = document.createElement("img");
    image.id = "Static_cloud";	
    image.src = "Images/Weather/rain/Static_cloud.png";
    return image;
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
