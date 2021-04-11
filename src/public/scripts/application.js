const video = document.getElementById('player');
const viddiv = document.getElementById("videodiv");
/*function startVideo() {
    navigator.getUserMedia({
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

var handleSuccess = function (stream) {
    video.srcObject = stream;
    video.onloadmetadata = () => {
        video.play();
        console.log("Playing video");
    }
};

navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    .then(handleSuccess)*/

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('scripts/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('scripts/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('scripts/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('scripts/models')
]).then(startVideo)


function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  viddiv.append(canvas)
  $('canvas').attr("style","position:absolute")
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})