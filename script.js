// Author: Aaron Hobson

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

// Global ML Variables
let mobilenet;
let img;

function setup() {
  // create canvas
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  // create text 
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  // load image
  img = loadImage("images/guinea-pig.jpg", imageLoaded);
}

function draw() {
  
}

function imageLoaded() {
  image(img, 0, 0, width, height);
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}

function modelReady() {
  mobilenet.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    //console.log(results);
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2);
    textP.html("Label: " + label + "- Confidence: " + confidence);
  }
}