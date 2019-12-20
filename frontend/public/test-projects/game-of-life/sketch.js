let all_cells = [];

let run = false;
let cellno = 0;


function Cell(cellX, cellY, cellStatus, cellList) {
  this.x = cellX;
  this.y = cellY;
  this.list = cellList;
  this.status = cellStatus;
  
  this.isAlive = function() {
    if (this.status === "alive" || this.status === "dying") {
      return true;
    }
    else {
      return false;
    }
  }
  
  this.convertAlive = function() {
    this.status = "alive";
  }
  
  this.render = function() {
    if (this.status === "dead") {
      fill(191);
      rect(this.x, this.y, 20, 20);
    }
    if (this.status === "alive") {
      fill(255, 255, 0);
      rect(this.x, this.y, 20, 20);
    }
  }
  
  this.logic = function() {
    if (this.status === "alive") {
      let surround_cells = 0;
      if (this.list-56 > -1) {
        if (all_cells[parseInt(this.list)-26].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-25 > -1) {
        if (all_cells[parseInt(this.list)-25].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-24 > -1) {
        if (all_cells[parseInt(this.list)-24].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-1 > -1) {
        if (all_cells[parseInt(this.list)-1].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+1 < 625) {
        if (all_cells[parseInt(this.list)+1].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+24 < 625) {
        if (all_cells[parseInt(this.list)+24].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+25 < 625) {
        if (all_cells[parseInt(this.list)+25].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+26 < 625) {
        if (all_cells[parseInt(this.list)+26].isAlive()) {
          surround_cells++;
        }
      }
      if (surround_cells <= 1) {
        this.status = "dying";
      }
      else if (surround_cells >= 4) {
        this.status = "dying";
      }
    }
    if (this.status === "dead") {
      let surround_cells = 0;
      if (this.list-51 > -1) {
        if (all_cells[parseInt(this.list)-26].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-50 > -1) {
        if (all_cells[parseInt(this.list)-25].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-49 > -1) {
        if (all_cells[parseInt(this.list)-24].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list-1 > -1) {
        if (all_cells[parseInt(this.list)-1].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+1 < 625) {
        if (all_cells[parseInt(this.list)+1].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+24 < 625) {
        if (all_cells[parseInt(this.list)+24].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+25 < 625) {
        if (all_cells[parseInt(this.list)+25].isAlive()) {
          surround_cells++;
        }
      }
      if (this.list+26 < 625) {
        if (all_cells[parseInt(this.list)+26].isAlive()) {
          surround_cells++;
        }
      }
      if (surround_cells == 3) {
        this.status = "born";
      }
    }
  }
  
  this.nextstage = function() {
    if (this.status === "dying") {
      this.status = "dead";
    }
    if (this.status === "born") {
      this.status = "alive";
    }
  }
}


function setup() {
  createCanvas(500, 500);
  background(191);
  strokeWeight(1);
  generatecells();
}

function draw() {
  if (run === true) {
    cell_logic();
    //delay(100);
  }
  drawcells();
}

function keyPressed() {
  if (keyCode === 32) {
    if (run === true) {
      run = false;
    }
    else if (run === false) {
      run = true;
    }
  }
  if (keyCode === 10) {
    run = false;
    generatecells();
  }
}

function mouseDragged() {
  clickcells();
}
function mousePressed() {
  clickcells();
}

function clickcells() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      if ((mouseX > i*20)&&(mouseX < (i+1)*20)&&(mouseY > j*20)&&(mouseY < (j+1)*20)) {
        all_cells[i*25+j].convertAlive();
      }
    }
  }
}

function drawcells() {
  for (let i = 0; i < all_cells.length; i++) {
    all_cells[i].render();
  }
}

function generatecells() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      all_cells[cellno] = new Cell(20*i, 20*j, "dead", i*25+j);
      cellno++;
    }
  }
  cellno = 0;
}

function cell_logic() {
  for (let i = 0; i < all_cells.length; i++) {
    all_cells[i].logic();
  }
  for (let i = 0; i < all_cells.length; i++) {
    all_cells[i].nextstage();
  }
}
