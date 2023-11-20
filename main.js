song = "";
score_left_wrist = 0;
score_right_wrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}


function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, model_Loaded);
    posenet.on("pose", posenet_results);
}

function model_Loaded() {
    console.log("Posenet initilized correctly");
}

function draw() {
    image(video, 0, 0, 800, 500);

    stroke("red");
    fill("red");

    if (score_left_wrist > 0.02) {
        song2.pause();
        song1.play();
    }

    if (score_right_wrist > 0.02) {
        song1.pause();
        song2.play();
    }}


function posenet_results(results) {
    if (results.length > 0) {
        // console.log(results);

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
        if(score_left_wrist > score_right_wrist){
        document.getElementById("speed").innerHTML = "Splatoon Song";
        }
        else{
            document.getElementById("speed").innerHTML = "JAL boarding song";
        }

    }
}

function start_music() {
    song.play();
}
