import {
    side_data,
    emotionSeconds,
    emotionArray,
    heartrate,
    screenshotImage,
    textResponses,
    clearData
} from "./data_storage.js";

// button
const reset = document.getElementById("reset");
const nextquestion = document.getElementById("next-question");
const record = document.getElementById("record");
const capture = document.getElementById("capture");
const resultspanel = document.getElementById("results-panel");

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
var localImage = null;


// when next question is clicked
nextquestion.addEventListener("click", () => {
    // check to make sure it can't go any further
    if (currIndex != side_data.length - 1) {
        currIndex++;
        currStep = side_data[currIndex].step;
        console.log(side_data[currIndex]);
        if (side_data[currIndex].type === "speak")
            textResponses.push("");
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

record.addEventListener("click", () => {
    if (side_data[currIndex].type === "speak")
        runSpeechRecognition();
    else if (side_data[currIndex].type === "photo")
        runPhotoTake();
    else
        console.log("Record button won't do anything at the moment you silly goose!");
})

async function runPhotoTake() {
    question.innerHTML = "Your photo has been taken!";
    localImage = await captureImage();
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
    recognition.onstart = function () {
        document.getElementById('record').setAttribute("style", "background-color:white");
        console.log("Begin speaking");
        // action.innerHTML = "<small>please speak...</small>";
    };

    recognition.onspeechend = function () {
        document.getElementById('record').setAttribute("style", "background-color:rgb(75,189,214)")
        console.log("Stopped speaking");
        // action.innerHTML = "<small>stopped listening...</small>";
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        console.log(transcript);
        textResponses[textResponses.length - 1] = textResponses[textResponses.length - 1] + " " + transcript;
        // output.innerHTML = "<b>Text:</b> " + transcript;
        // output.classList.remove("hide");
    };

    // start recognition
    recognition.start();
}

function captureImage() {
    return new Promise((resolve, reject) => {
        {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            canvas.toBlob((blob) => {
                let img = new Image();
                img.src = (window.URL ? URL : webkitURL).createObjectURL(blob);
                console.log(img);
                return resolve(img);
            });
        }
    })
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

function getResults() {
    // emotionSeconds, emotionArray, heartrate, textResponses, and image
    // formData
    console.log("Getting results");
    const formData = new FormData();

    formData.append("emotionSeconds[]", emotionSeconds);
    formData.append("emotionArray[]", emotionArray);
    formData.append("heartrate[]", heartrate);
    formData.append("textResponses[]", textResponses);
    formData.append("image", localImage);

    console.log(Array.from(formData));
    // console.log("Sent");

    jQuery.ajax({
        url: '/getResults',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function (data) {
            // Where the magic happens
            console.log("Data Received");
            var jsondata = JSON.parse(data);
            console.log(jsondata);
            useData(jsondata);
        }
    });
    console.log("Data Sent");
}

function useData(data) {
    let htmlData = `<div class="row" style="margin-top: 7rem;margin-bottom: 3rem;">
    <div class="col">
        <div class="container">
            <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 1rem;background-color: white;">
                <h1 class="text-center" style="font-weight: bold;">Overall Score: 85%</h1>
            </div>
        </div>
    </div>
</div>
<div class="row people" style="margin-bottom: 3rem;">
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Mental Health</h1><img src="/application/assets/img/brain.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">85%</h3>
        </div>
    </div>
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Physical Health</h1><img src="/application/assets/img/applemuscle.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">81%</h3>
        </div>
    </div>
    <div class="col-md-6 col-lg-4 item">
        <div class="text-center border rounded border-dark shadow box" data-aos="zoom-in" data-aos-once="true" style="background-color: white;padding: 2rem;">
            <h1 class="name" style="font-weight: bold;">Social Health</h1><img src="/application/assets/img/socialhealth.png">
            <h3 class="name" style="font-weight: bold;font-size: 3rem;">90%</h3>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col-7">
        <div class="border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center"><strong>🙂&nbsp;</strong>Mood Data&nbsp;<a href="https://emojipedia.org/loudly-crying-face/"><span style="text-decoration: underline;">😭</span></a><br></h1>
            <p style="font-size: 1.3rem;"><strong>Sad - 40%</strong><br></strong><strong>Neutral - 31%</strong><br><strong>Happy - 13%</strong><br><strong>Angry - 10%</strong><br><strong>Surprised - 5%</strong><br></p>
        </div>
    </div>
    <div class="col">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Emotion Analysis</h1>
            <p style="font-size: 1.3rem;"><strong>Your seem a bit on the sadder side. We recommend you try to get some exercise, hang out with others, or do something that you enjoy to cheer up!</strong></p>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col">
        <div class="border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Cardiovascular Analysis&nbsp;</h1>
            <p style="font-size: 1.3rem;"><strong>You seem to have a normally healthy heart! No need to feel at risk unless you have had people in your family history who were prone to heart attacks.</strong></p>
        </div>
    </div>
    <div class="col-7">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center"><strong>💓&nbsp;</strong>Heart Rate Data&nbsp;📈&nbsp;</h1>
            <p style="font-size: 2rem;">Average: 78 BPM&nbsp;<br></p><img class="img-fluid" src="/application/assets/img/heartrate.png"></div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col-6">
        <div class="border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center"><strong>🎤&nbsp;</strong>Transcript&nbsp;<strong>⚙️</strong></h1>
            <p class="text-left" style="font-size: 1.3rem;"><strong>My legs hurt a bit when I walk. I do too much work. I feel stressed during the weekdays. I don't feel super supported by my family and friends. Sometimes I feel depressed.</strong><br></p>
        </div>
    </div>
    <div class="col-6">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">&nbsp;✏️ Doctors Notes&nbsp;📋<br></h1>
            <p class="text-left" style="font-size: 1.3rem;"><strong><ul><li>Major depressive disorder - 0.1318</li><li>Fatigue - 0.1318</li><li>Fatigue - 0.0897</li><li>Seasonal Affective Disorder - 0.0205</li><li>Major depress<li>Varicose veins of lower extremities - 0.0161</li><li>Anxiety disorder - 0.0149</li><li>General anxiety disorder - 0.0149</li></ul></strong><br></p>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col">
        <div class="container">
            <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 1rem;background-color: white;">
                <h1 class="text-center" style="font-weight: bold;">Prognosis</h1>
            </div>
        </div>
    </div>
</div>
<div class="row" style="margin-bottom: 3rem;">
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Acne</h1>
            <h1 class="text-center">Moderate</h1>
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">COVID-19</h1>
            <h1 class="text-center">Get Tested</h1>
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Stress</h1>
            <h1 class="text-center">51%</h1>
        </div>
    </div>
    <div class="col-3">
        <div class="text-center border rounded border-dark shadow" data-aos="zoom-in" data-aos-once="true" style="padding: 2rem;background-color: white;">
            <h1 class="text-center">Depression</h1>
            <h1 class="text-center">3%</h1>
        </div>
    </div>
</div>`;
    $('#results-panel').html(htmlData);
}

export {
    updateBPM
};