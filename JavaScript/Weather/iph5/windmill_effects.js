// Windmill_Effects condition iph5
// UniAW6.2 By Ian Nicoll with credit to Dacal

var container = document.getElementById("windmillContainer");
container.appendChild(createAwindmill());
container.appendChild(createAwings());
function createAwindmill() {
    var image = document.createElement("img");
    image.id = "windmill";
    image.src = "Images/Weather/windmill/"+where+"/windmill.png";
    return image;
}

function createAwings() {
    var image = document.createElement("img");
    image.id = "wings";
    image.src = "Images/Weather/windmill/"+where+"/wings.png";
    return image;
}
