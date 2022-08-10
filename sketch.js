/*
** Worley Noise
* Camilo Cruz Gambardella, August 2022
* 
* Based on the algorithm introduced by Steven Worley in 'A cellular texture basis function'
* (https://weber.itn.liu.se/~stegu/TNM084-2017/worley-originalpaper.pdf).
*
* The algorithm is initialised by selecting a set of random points in space (2D or 3D). These
* can be called seeds. Then, for every location in space, the distance to the nth closest 
* seed (e.g. the third closest seed) to control colour information for that location.
*
* The example shown below operates in 2D space.
*/

let seeds;

let settings = {
  n : 0,
  contrast: 3,
  max_seeds: 5
}

function gui(){
  // Adding the GUI menu
  var gui = new dat.GUI();
  gui.width = 150;
  gui.add(settings,'n', 0, settings.max_seeds, 1);
  gui.add(settings,'contrast', 1, 10, .1);
  gui.add(settings,'max_seeds', 3, 10, 1);
}

function setup() {
  gui();
  createCanvas(300, 300);
  stroke(0);
  strokeWeight(4);

  seeds = [];
  frameRate(3);
}

function draw() {
  background(220);
  

  loadPixels();
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y ++){
      let dists = [];
      for(let s of seeds){
        let d = dist(x,y,s.x,s.y);
        dists.push(d);
      }
      let sorted = sort(dists);
      let g = map(sorted[settings.n], 0, sqrt(width*width+height*height)/settings.contrast, 0, 255)
      let c = color(g, g, g);
      set(x,y,c);
    }
  }
  updatePixels();
  
  stroke(255,0,0);
  for(let v of seeds){
    point(v.x,v.y);
  }
}

function mousePressed(){
  if(0 < (mouseX && mouseY) && mouseX < width && mouseY < height){
    let v = createVector(mouseX, mouseY);
    if(seeds.length >= settings.max_seeds){
      seeds.shift();      
    }
    seeds.push(v);
  }
}
