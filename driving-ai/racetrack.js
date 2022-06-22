class Wall {
    constructor(x1, y1, x2, y2) {
      this.posA = createVector(x1, y1);
      this.posB = createVector(x2, y2);
    }

    display() {
      stroke(0);
      line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
    }
  }

class Checkpoint {
    constructor(x1, y1, x2, y2) {
      this.posA = createVector(x1, y1);
      this.posB = createVector(x2, y2);
      this.middleCP = createVector((x2 + x1) / 2, (y2 + y1) / 2)
    }

    display() {
      stroke(248, 24, 148);
      line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
    }
  }

  function createTrack(){
    walls = [];
    walls.push(new Wall(100, 100, 700, 100));
    walls.push(new Wall(200, 200, 600, 200));
    walls.push(new Wall(100, 200, 100, 100));
    walls.push(new Wall(800, 300, 700, 500));
    walls.push(new Wall(700, 300, 600, 400));
    walls.push(new Wall(600, 200, 700, 300));
    walls.push(new Wall(700, 100, 800, 300));
    walls.push(new Wall(600, 400, 150, 300));
    walls.push(new Wall(700, 500, 50, 400));
    walls.push(new Wall(150, 300, 200, 200));
    walls.push(new Wall(50, 400, 100, 200));

    checkpoints = [];
    checkpoints.push(new Checkpoint(600, 200, 600, 100));
    checkpoints.push(new Checkpoint(400, 200, 400, 100));
    checkpoints.push(new Checkpoint(800, 300, 700, 300));
    checkpoints.push(new Checkpoint(600, 400, 700, 500));
    checkpoints.push(new Checkpoint(450, 366, 400, 454));
    checkpoints.push(new Checkpoint(200, 312, 150, 415));
    checkpoints.push(new Checkpoint(200, 200, 100, 200));
    checkpoints.push(new Checkpoint(200, 200, 200, 100));
    checkpoints.push(new Checkpoint(75, 300, 150, 300));
}
