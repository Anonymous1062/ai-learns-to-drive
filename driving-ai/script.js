var walls = [];
var cars = [];
var checkpoints = [];
var totalcars = 100;
var deadcars = 0;
var nocarsleft = false;
var best = 0;
var bestcar;
var carcount = 100;

function setup() {
  angleMode(DEGREES)
  for (i = 0; i < totalcars; i ++) {
    cars[i] = new Player(20, 10, 250, 150, 0, 4, false);
  }
  createCanvas(1000, 600);
  createTrack();
}

function draw() {
  background(100);
  carcount = totalcars - deadcars;
  nextGen();
  for (let wall of walls) {
    wall.display();
  }
  for (i = 0; i < checkpoints.length; i++) {
    checkpoints[i].display();
  }
  for (car of cars) {
    car.display();
    car.rayTrace(walls);
    for (let i = 0; i <  walls.length; i++) {
      car.cornercalc(walls[i]);
    }
    car.checkpointcalc(checkpoints[car.checkpoints]);
    if (car.checkpoints == checkpoints.length) {
      car.checkpoints = 0;
    }
    car.aistuff();
    car.move();
  }
  if (deadcars == totalcars) {
    nocarsleft = true;
  }
}

function nextGen() {
  if (nocarsleft == true) {
      for (car of cars) {
          if (car.fitness > best) {
              best = car.fitness;
              bestcar = car;
          }
      }
      for (i = 0; i < totalcars-1; i ++) {
          cars[i] = new Player(20, 10, 250, 150, 0, 4, false, bestcar.nn);
      }
      cars[totalcars-1] = new Player(20, 10, 250, 150, 0, 4, true, bestcar.nn);
      deadcars = 0;
      nocarsleft = false;
  }
}
