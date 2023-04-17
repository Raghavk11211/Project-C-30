scoreLeftWrist = 0;
scoreRightWrist = 0;
peterPan = "";
harryPotter = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    peterPan = loadSound("peter_pan.mp3");
    harryPotter = loadSound("Harry Potter Theme Song (1).mp3");
}

function setup() {
    canvas = createCanvas(500,350);
    canvas.center();
    canvas.position(400,150)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0,0,500,400);

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
    }
}
function play() {
    if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        peterPan.stop();
        harryPotter.play();
    }

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        harryPotter.stop();
        peterPan.play();
    }
}