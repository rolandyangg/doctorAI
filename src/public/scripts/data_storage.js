/** 
 * null = record button wont do anything
 * speak = record button takes spoken answer
 * photo = record button takes photo
*/
const side_data = [{
        "step": 0,
        "question": "",
        "instructions": "",
        "type": "null"
    },
    {
        "step": 1,
        "question": "",
        "instructions": "",
        "type": "speak"
    },
    {
        "step": 2,
        "question": "",
        "instructions": "",
        "type:": "speak"
    },
    {
        "step": 3,
        "question": "",
        "instructions": "",
        "type:": "speak"
    },
    {
        "step": 4,
        "question": "",
        "instructions": "",
        "type": "speak"
    },
    {
        "step": 5,
        "question": "",
        "instructions": "",
        "type": "photo"
    },
    {
        "step": 6,
        "question": "",
        "instructions": "",
        "type": "null"
    }
]

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
var textResponses = [];
var screenshotImage = null;

function clearData() {
    emotionSeconds = {
        "angry": 0,
        "disgusted": 0,
        "fearful": 0,
        "happy": 0,
        "neutral": 0,
        "sad": 0,
        "surprised": 0,
        "offcamera": 0
    }
    emotionArray = [];
    heartrate = [];
    textResponses = [];
    screenshotImage = null;
    console.log("Successfully reset data!");
}

export {side_data, emotionSeconds, emotionArray, heartrate, textResponses, screenshotImage, clearData};