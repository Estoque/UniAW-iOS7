// Frost condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var container = document.getElementById("cloudContainer");
container.appendChild(createACloud());

if (where == "day") {
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
} // End of nighttime

function createACloud() {
    var image = document.createElement("img");
    image.id = "frost";	
    image.src = "Images/Weather/frost/frost.png";
    return image;
}


