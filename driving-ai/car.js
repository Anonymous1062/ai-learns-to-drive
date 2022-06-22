class Player {
  constructor(width, length, xPos, yPos, angle, speed, keepnn, nn){
    this.width = width
    this.length = length
    this.xPos = xPos;
    this.yPos = yPos;
    this.angle = angle;
    this.speed = speed;
    this.rays = [];
    this.totalrays = 5;
    this.alive = true;
    this.moving = 0;
    this.distances = [];
    this.checkpoints = 0;
    this.totalCP = 0;
    this.howfarCP = 0;
    this.fitness = 0;
    this.timealive = 0;
    this.x1;
    this.x2;
    this.x3;
    this.x4;
    this.y1;
    this.y2;
    this.y3;
    this.y4;

    if (nn instanceof NeuralNetwork) {
      this.nn = nn.copy();
      if (keepnn != true) {
        this.nn.mutate(0.1);
      }
    }
    else {
      this.nn = new NeuralNetwork(this.totalrays + 1, 2, 2);
    }

    for (let i = 0; i < this.totalrays; i += 1) {
      this.rays.push(new Ray(this.xPos, this.yPos, this.angle));
    }
  }

  aistuff(){
    let inputs = [];
    for (i = 0; i < this.totalrays; i++) {
      inputs[i] = map(this.distances[i], 0, 1000, 0, 1);
    }
    inputs.push(this.moving);
    let output = this.nn.predict(inputs);
    if (output[0] > 0.5 && output[0] < 1){
      this.moving = 1;
    }
    else if (output[0] >= 0 && output[0] <= 0.5){
      this.moving = 0;
    }
    if (output[1] > 0.66 && output[1] < 1) {
      this.angle -= 8;
    }
    else if (output[1] > 0 && output[1] < 0.33) {
      this.angle += 8;
    }
  }

  display() {
    if (this.alive == true) {
      if (car.timealive >= 120) {
        car.alive = false;
        deadcars++;
      }
      this.timealive++;
      push();
      translate(this.xPos, this.yPos);
      rectMode(CENTER);
      stroke(0);
      rotate(this.angle);
      rect(0, 0, this.width, this.length);
      pop();
      this.fitness = this.totalCP + 1/this.howfarCP;
      if (this.fitness == Infinity) {
        this.fitness = this.totalCP;
      }
    }
  }

  rayTrace(walls){
    var distance;
    if(this.alive == true){
      for (let i = 0; i < this.rays.length; i++) {
        const ray = this.rays[i];
        ray.pos = createVector(this.xPos, this.yPos);
        ray.dir = p5.Vector.fromAngle(radians(this.angle - (180/2) + 180 / (this.rays.length - 1) * i));
        let closest = null;
        let record = Infinity;
        for (let i = 0; i <  walls.length; i++) {
          const point = ray.castRay(walls[i]);
          if (point) {
            distance = p5.Vector.dist(ray.pos, point)
            if (distance < record) {
              record = distance;
              closest = point;
            }
          }
        }
        if (closest) {
          stroke(240);
          this.distances[i] = distance;
        }
      }
    }
  }

  cornercalc(walls) {
    if (this.alive == true) {
      this.x1 = this.xPos + cos(this.angle + atan(5/10)) * sqrt(125);
      this.y1 = this.yPos + sin(this.angle + atan(5/10)) * sqrt(125);

      this.x4 = this.xPos + cos(this.angle - atan(5/10)) * sqrt(125);
      this.y4 = this.yPos + sin(this.angle - atan(5/10)) * sqrt(125);

      this.x3 = this.xPos - cos(this.angle + atan(5/10)) * sqrt(125);
      this.y3 = this.yPos - sin(this.angle + atan(5/10)) * sqrt(125);

      this.x2 = this.xPos - cos(this.angle - atan(5/10)) * sqrt(125);
      this.y2 = this.yPos - sin(this.angle - atan(5/10)) * sqrt(125);

      const t1 = intersectT(walls.posA.x, walls.posA.y, walls.posB.x, walls.posB.y, this.x1, this.y1, this.x2, this.y2);
      const u1 = intersectU(walls.posA.x, walls.posA.y, walls.posB.x, walls.posB.y, this.x1, this.y1, this.x2, this.y2);
      const t2 = intersectT(walls.posA.x, walls.posA.y, walls.posB.x, walls.posB.y, this.x3, this.y3, this.x4, this.y4);
      const u2 = intersectU(walls.posA.x, walls.posA.y, walls.posB.x, walls.posB.y, this.x3, this.y3, this.x4, this.y4);

      if (0 < t1 && t1 < 1 && u1 > 0 && u1 < 1) {
        this.alive = false;
        deadcars++;
      }
      else if (0 < t2 && t2 < 1 && u2 > 0 && u2 < 1){
        this.alive = false;
        deadcars++;
      }
    }
  }

  checkpointcalc(checkpoint) {
    if (this.alive == true) {
      const t1 = intersectT(checkpoint.posA.x, checkpoint.posA.y, checkpoint.middleCP.x, checkpoint.middleCP.y, this.x1, this.y1, this.x2, this.y2);
      const u1 = intersectU(checkpoint.posA.x, checkpoint.posA.y, checkpoint.middleCP.x, checkpoint.middleCP.y, this.x1, this.y1, this.x2, this.y2);
      const t2 = intersectT(checkpoint.posA.x, checkpoint.posA.y, checkpoint.middleCP.x, checkpoint.middleCP.y, this.x3, this.y3, this.x4, this.y4);
      const u2 = intersectU(checkpoint.posA.x, checkpoint.posA.y, checkpoint.middleCP.x, checkpoint.middleCP.y, this.x3, this.y3, this.x4, this.y4);
      const t3 = intersectT(checkpoint.middleCP.x, checkpoint.middleCP.y, checkpoint.posB.x, checkpoint.posB.y, this.x1, this.y1, this.x2, this.y2);
      const u3 = intersectU(checkpoint.middleCP.x, checkpoint.middleCP.y, checkpoint.posB.x, checkpoint.posB.y, this.x1, this.y1, this.x2, this.y2);
      const t4 = intersectT(checkpoint.middleCP.x, checkpoint.middleCP.y, checkpoint.posB.x, checkpoint.posB.y, this.x3, this.y3, this.x4, this.y4);
      const u4 = intersectU(checkpoint.middleCP.x, checkpoint.middleCP.y, checkpoint.posB.x, checkpoint.posB.y, this.x3, this.y3, this.x4, this.y4);

      this.howfarCP = dist(this.xPos, this.yPos, checkpoint.middleCP.x, checkpoint.middleCP.y);
      if (0 < t1 && t1 < 1 && u1 > 0 && u1 < 1) {
        this.checkpoints++
        this.totalCP += 2;
        this.timealive = 0;
      }
      else if (0 < t2 && t2 < 1 && u2 > 0 && u2 < 1){
        this.checkpoints++
        this.totalCP += 2;
        this.timealive = 0;
        this.howfarCP = 0;
      }
      else if ((0 < t3 && t3 < 1 && u3 > 0 && u3 < 1) || (0 < t4 && t4 < 1 && u4 > 0 && u4 < 1)) {
        this.checkpoints++
        this.totalCP++;
        this.timealive = 0;
        this.howfarCP = 0;

      }
    }
  }

  move() {
    if (this.alive == true) {
      if (this.moving == 1){
        this.xPos += cos(this.angle) * this.speed;
        this.yPos += sin(this.angle) * this.speed;
      }
    }
  }
}
