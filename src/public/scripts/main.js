import {side_data, emotionSeconds, emotionArray, heartrate, screenshotImage, textResponses, clearData} from "./data_storage.js";

// button
const reset = document.getElementById("reset");
const nextquestion = document.getElementById("next-question");
const record = document.getElementById("record");
const capture = document.getElementById("capture");

// text spots
const progress = document.getElementById("progress");
const instructions = document.getElementById("instructions");
const question = document.getElementById("question");
const questiontitle = document.getElementById("question-title");
const bpmDisplay = document.getElementById("bpm-count");
const canvas = document.getElementById('canvas1');     
const video = document.getElementById('player');
var currIndex = 0;
var currStep = 0;
var maxStep = side_data[side_data.length - 1].step;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();


// when next question is clicked
nextquestion.addEventListener("click", () => {
    // check to make sure it can't go any further
    if (currIndex != side_data.length) {
        currIndex++;
        currStep = side_data[currIndex].step;
        if (side_data[currIndex].type === "speak")
            textResponses.append("");
        updateSideData();
    } else {
        getResults();
    }
})

reset.addEventListener("click", () => {
    currIndex = 0;
    currStep = 0;
    clearData();
    updateSideData();
})

function updateSideData() {
    progress.innerHTML = currStep + "/" + maxStep;
    instructions.innerHTML = side_data[currIndex].instructions;
    question.innerHTML = side_data[currIndex].question;
    if (side_data[currIndex].question === "")
        questiontitle.innerHTML = "";
    else
        questiontitle.innerHTML = "Question";
}

function updateBPM(BPM) {
    bpmDisplay.innerHTML = BPM + " BPM";
}

function getResults() {
    // emotionSeconds, emotionArray, heartrate, textResponses, and image
    // formData
}

record.addEventListener("click", () => {
    if (side_data[currIndex].type === "speak")
        runSpeechRecognition();
    else if (side_data[currIndex].type === "photo")
        runPhotoTake();
    else
        console.log("Record button won't do anything at the moment you silly goose!");
})

function runPhotoTake() {
    let image = await captureImage();
    screenshotImage = image;
}

function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        document.getElementById('record').setAttribute("style", "background-color:white");
        console.log("Begin speaking");
        // action.innerHTML = "<small>please speak...</small>";
    };

    recognition.onspeechend = function() {
        document.getElementById('record').setAttribute("style", "background-color:rgb(75,189,214)")
        console.log("Stopped speaking");
        // action.innerHTML = "<small>stopped listening...</small>";
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        console.log(transcript);
        textResponses[textResponses.length - 1].append(" " + transcript);
        // output.innerHTML = "<b>Text:</b> " + transcript;
        // output.classList.remove("hide");
    };

     // start recognition
     recognition.start();
}

function captureImage() {
    return new Promise((resolve, reject) => {{
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
        canvas.toBlob((blob) => {
            let img = new Image();
            img.src = (window.URL ? URL : webkitURL).createObjectURL(blob);
            return resolve(img);
        });
    }})
}

/**
function capture() {        
    var canvas = document.getElementById('canvas1');     
    var video = document.getElementById('player');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
    canvas.toBlob((blob) => {
        const img = new Image();
        img.src = (window.URL ? URL : webkitURL).createObjectURL(blob);
        console.log(img);
    });
}**/

export {updateBPM};