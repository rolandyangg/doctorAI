import {Heartbeat} from './heartbeat.js';

const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";
const HAARCASCADE_URI = "scripts/haarcascade_frontalface_alt.xml"

// Load opencv when needed
async function loadOpenCv(uri) {
  return new Promise(function(resolve, reject) {
    console.log("Loading OpenCV");
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      cv['onRuntimeInitialized'] = () => {
        console.log("OpenCV Loaded");
        resolve();
      }
    };
    tag.onerror = () => {
      throw new URIError("opencv didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

let camera = new Heartbeat("player", "canvas1", HAARCASCADE_URI, 30, 6, 250);
var ready = loadOpenCv(OPENCV_URI);
ready.then(function() {
  camera.init();
});
