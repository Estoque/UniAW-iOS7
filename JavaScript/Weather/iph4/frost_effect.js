// Frost condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var container = document.getElementById("frostContainer");
container.appendChild(createACloud());

function createACloud() {
    var image = document.createElement("img");
    image.id = "frost";	
    image.src = "Images/Weather/frost/frost.png";
    return image;
}
