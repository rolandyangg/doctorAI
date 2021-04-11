const video = document.getElementById('player');
const viddiv = document.getElementById("videodiv");
var emotionSeconds = {
    "angry": 0,
    "disgusted": 0,
    "fearful": 0,
    "happy": 0,
    "neutral": 0,
    "sad": 0,
    "surprised": 0,
    "offcamera": 0
}
var emotionArray = [];
var heartrate = [];

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('scripts/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('scripts/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('scripts/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('scripts/models'),
    faceapi.nets.ageGenderNet.loadFromUri('scripts/models')
]).then(getPerms)

var getPerms = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    .then(startVideo);


function startVideo() {
    navigator.getUserMedia({
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    viddiv.append(canvas)
    $('canvas').attr("style", "position:absolute")
    const displaySize = {
        width: video.width,
        height: video.height
    }
    faceapi.matchDimensions(canvas, displaySize)

    var count = 0;

    // setup box drawer
    setInterval(async () => {
        try {
            const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions().withAgeAndGender();
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            var emotionsDetected = detections.expressions;
        } catch (error) {
            console.log("Cannot update box person has moved off camera");
        }

        var bpm = 70;
        // update data once every second
        if (count++ == 10) {
            let largestEmotion = "offcamera";
            try {
                Object.entries(emotionsDetected).forEach(([expression, chance]) => {
                    if (largestEmotion === "offcamera")
                        largestEmotion = expression;
                    else {
                        if (chance > emotionsDetected[largestEmotion])
                            largestEmotion = expression;
                    }
                })
            } catch (error) {
                console.log("Pushing off camera to data");
            }
            console.log(largestEmotion);
            emotionSeconds[largestEmotion]++;
            count = 0;
            emotionArray.push(largestEmotion);
            heartrate.push(bpm);
        }
    }, 100)

})