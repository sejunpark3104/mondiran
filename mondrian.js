

var r;

var numvL = Math.floor(Math.random(5)) + 6; // min: 6, max: 10
var vL = new Array(numvL + 1);
var numhL = Math.floor(Math.random(5)) + 4; // min: 4, max: 8
var hL = new Array(numhL + 1);


var indexFilled = new Array(numvL);
for (var i = 0; i < numvL; i++) {
  indexFilled[i] = new Array(numhL);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  background(255);
}


function draw() {
  drawBaseLines();

  var trials = 0;
  while (trials < 15) {
    trials++;
    fillColor();  

   
    var startX = Math.floor(random(numvL - 2));
    var startY = Math.floor(random(numhL - 2));
    var endX = Math.floor(random(numvL - startX - 2)) + startX + 1;
    var endY = Math.floor(random(numhL - startY - 2)) + startY + 1;

    var tempStartX = startX;
    var tempStartY = startY;

    var filled = false;
    while (startX < endX) {
      startY = tempStartY;
      while (startY < endY) {
        if(indexFilled[startX][startY]) { 
          filled = true; 
        }
        startY = startY + 1;
      }
      startX = startX + 1;
    }

    startX = tempStartX;
    startY = tempStartY;

    if (! filled) {
      rect(vL[startX], hL[startY],
       vL[endX] - vL[startX], hL[endY] - hL[startY]);
      while (startX < endX) {
        startY = tempStartY;
        while (startY < endY) {
          indexFilled[startX][startY] = true;
          startY = startY + 1;
        } 
        startX = startX + 1;
      }
    } 
  } 
}

function drawBaseLines() {
  strokeWeight(3); 
  for (var i = 0; i < numvL; i++) {
    if (i == 0) { r = random(windowWidth / 3); }
    else { r = random(windowWidth / 3) + vL[i - 1] + 15; }
    vL[i] = r;
    stroke(0);
    line(r, 0, r, height);
  }

  for (var i = 0; i < numhL; i++) {
    if (i == 0) { r = random(windowHeight / 3); }
    else { r = random(windowHeight / 3) + hL[i - 1] + 15; }
    hL[i] = r;
    stroke(0);
    line(0, r, width, r);
  }
}

function fillColor() {
  var randomColor = Math.floor(random(3));
  if (randomColor == 0) {
    fill('#ff0000'); // red
  } else if (randomColor == 1) {
    fill('#ffff00'); // yellow
  } else if (randomColor == 2) {
    fill('#0000ff'); // blue
  }
}

function mousePressed() {
  clear();
  numvL = Math.floor(Math.random(5)) + 6; // min: 6, max: 10
  vL = new Array(numvL + 1);
  numhL = Math.floor(Math.random(5)) + 4; // min: 4, max: 8
  hL = new Array(numhL + 1);


  indexFilled = new Array(numvL);
  for (var i = 0; i < numvL; i++) {
    indexFilled[i] = new Array(numhL);
  }
  
  var i;
  var j;
  while (i < numvL) {
    while (j < numhL) {
      indexFilled[i][j] = true;
    }
  }

  redraw();
}
