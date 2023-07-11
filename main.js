img = "";
Status = "";

function preload() {
    audio = loadSound("heart_like_a_truck.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.size(380, 380);
    webcam.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(webcam, 0, 0, 380, 380);
    if (Status != "person") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(webcam, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            audio.stop();
        }
    }

    else {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Person Not Found" + objects.length;
        audio.play();
    }
}