import {side_data, emotionSeconds, emotionArray, heartrate, clearData} from "./data_storage.js";

// button
const reset = document.getElementById("reset");
const nextquestion = document.getElementById("next-question");
const record = document.getElementById("record");

// text spots
const progress = document.getElementById("progress");
const instructions = document.getElementById("instructions");
const question = document.getElementById("question");
const questiontitle = document.getElementById("question-title");
var currIndex = 0;
var currStep = 0;
var maxStep = side_data[side_data.length - 1].step;

// when next question is clicked
nextquestion.addEventListener("click", () => {
    // check to make sure it can't go any further
    if (currIndex != side_data.length) {
        currIndex++;
        currStep = side_data[currIndex].step;
        updateSideData();
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