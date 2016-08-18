// Wind_Effects condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var NUMBER_OF_LEAVES = 12; // leaves to show on screen
var container = document.getElementById("windContainer");
for (var i = 1; i < NUMBER_OF_LEAVES+1; i++)
{ container.appendChild(createALeaf()); }
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

function createALeaf() {
    var windDiv = document.createElement("div");
    var image = document.createElement("img");
    image.src = "Images/Weather/wind/leaf" + i + ".png";
    windDiv.style.top = pixelValue(randomInteger(20, 500));
    windDiv.style.left = pixelValue(randomInteger(-180, 0));
    var spinAnimationName = (Math.random() < 0.0) ? "clockwiseSpin" : "counterclockwiseSpin";
    windDiv.style.webkitAnimationName = "fadeWind, floatWind";
    image.style.webkitAnimationName = spinAnimationName;
    var fadeAndfloatDuration = durationValue(randomFloat(4, 10));
    var spinDuration = durationValue(randomFloat(2, 8));
    windDiv.style.webkitAnimationDuration = fadeAndfloatDuration + ", " + fadeAndfloatDuration;
    image.style.webkitAnimationDuration = spinDuration;
    windDiv.appendChild(image);
    return windDiv;
}