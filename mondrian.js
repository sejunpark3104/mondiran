// mondrian function generator
// author: grace guan
// date: 6/22/17
//////////////////////////////////////////////////////////////////////////////////

// global variables

var r;

var numvL = Math.floor(Math.random(5)) + 6; // min: 6, max: 10
var vL = new Array(numvL + 1);
var numhL = Math.floor(Math.random(5)) + 4; // min: 4, max: 8
var hL = new Array(numhL + 1);

// a coordinate (x, y) is filled if the rectangle to its bottom right is
// also filled.
var indexFilled = new Array(numvL);
for (var i = 0; i < numvL; i++) {
  indexFilled[i] = new Array(numhL);
}

//////////////////////////////////////////////////////////////////////////////////

// set the canvas to not repeat, background white
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  background(255);
}

// draw the mondrian!
function draw() {
  drawBaseLines();

  var trials = 0;
  while (trials < 15) {
    trials++;
    fillColor();  

    // rect syntax: start point (x, y) (length x, length y). calculate indexes
    var startX = Math.floor(random(numvL - 2));
    var startY = Math.floor(random(numhL - 2));
    var endX = Math.floor(random(numvL - startX - 2)) + startX + 1;
    var endY = Math.floor(random(numhL - startY - 2)) + startY + 1;

    var tempStartX = startX;
    var tempStartY = startY;

    // check if these indices are valid (whether or not they have already been filled)
    var filled = false;
    while (startX < endX) {
      startY = tempStartY;
      while (startY < endY) {
        if(indexFilled[startX][startY]) { 
          filled = true; 
        } // end if statement
        startY = startY + 1;
      } // end while start Y < end Y loop
      startX = startX + 1;
    } // end while start X < end X loop

    startX = tempStartX;
    startY = tempStartY;

    // if they haven't been filled, fill them and increase the count
    if (! filled) {
      rect(vL[startX], hL[startY],
       vL[endX] - vL[startX], hL[endY] - hL[startY]);
      while (startX < endX) {
        startY = tempStartY;
        while (startY < endY) {
          indexFilled[startX][startY] = true;
          startY = startY + 1;
        } // end while startY < endY loop
        startX = startX + 1;
      } // end while startX < endX loop
    } // end if not filled statement
  } // end while numFilled < 3 block 
}

// draw the lines at least 15 px apart, each to the right/bottom of
// each other. draws the lines in black and stores them in arrays.
function drawBaseLines() {
  strokeWeight(3); // thin-ish lines!

  // draw the vertical lines
  for (var i = 0; i < numvL; i++) {
    if (i == 0) { r = random(windowWidth / 3); }
    else { r = random(windowWidth / 3) + vL[i - 1] + 15; }
    vL[i] = r;
    stroke(0);
    line(r, 0, r, height);
  }

  // draw the horizontal lines
  for (var i = 0; i < numhL; i++) {
    if (i == 0) { r = random(windowHeight / 3); }
    else { r = random(windowHeight / 3) + hL[i - 1] + 15; }
    hL[i] = r;
    stroke(0);
    line(0, r, width, r);
  }
}

// fill the color red yellow or blue
function fillColor() {
  var randomColor = Math.floor(random(3));
  //console.log(randomColor);
  if (randomColor == 0) {
    fill('#ff0000'); // red
  } else if (randomColor == 1) {
    fill('#ffff00'); // yellow
  } else if (randomColor == 2) {
    fill('#0000ff'); // blue
  }
}

// reset the canvas if mouse is pressed
function mousePressed() {
  clear();
  // reset the other numbers
  numvL = Math.floor(Math.random(5)) + 6; // min: 6, max: 10
  vL = new Array(numvL + 1);
  numhL = Math.floor(Math.random(5)) + 4; // min: 4, max: 8
  hL = new Array(numhL + 1);

  // a coordinate (x, y) is filled if the rectangle to its bottom right is
  // also filled.
  indexFilled = new Array(numvL);
  for (var i = 0; i < numvL; i++) {
    indexFilled[i] = new Array(numhL);
  }
  // reset it to always be true
  var i;
  var j;
  while (i < numvL) {
    while (j < numhL) {
      indexFilled[i][j] = true;
    }
  }

  redraw();
}