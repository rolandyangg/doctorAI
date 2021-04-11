const side_data = [{
        "step": 0,
        "question": "",
        "instructions": "",
    },
    {
        "step": 1,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.1,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.2,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.3,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.4,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.5,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.6,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.7,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.8,
        "question": "",
        "instructions": "",
    },
    {
        "step": 2.9,
        "question": "",
        "instructions": "",
    },
    {
        "step": 3,
        "question": "",
        "instructions": "",
    },
    {
        "step": 4,
        "question": "",
        "instructions": "",
    },
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
    console.log("Successfully reset data!");
}

export {side_data, emotionSeconds, emotionArray, heartrate, clearData};