class Ray {
    constructor(xPos, yPos, angle) {
      this.position = createVector(xPos, yPos);
      this.direction = p5.Vector.fromAngle(radians(angle));
    }

    display() {
      stroke(255);
      push();
      translate(this.position.x, this.position.y);
      line(0, 0, (this.direction.x * 50), (this.direction.y * 50));
      pop();
    }

    castRay(wall) {
      const t = intersectT(wall.posA.x, wall.posA.y, wall.posB.x, wall.posB.y, this.position.x, this.position.y, (this.position.x + this.direction.x), (this.position.y + this.direction.y))
      const u = intersectU(wall.posA.x, wall.posA.y, wall.posB.x, wall.posB.y, this.position.x, this.position.y, (this.position.x + this.direction.x), (this.position.y + this.direction.y))
      if (0 < t && t < 1 && u > 0) {
          const xcoords = (wall.posA.x + t * (wall.posB.x - wall.posA.x));
          const ycoords = (wall.posA.y + t * (wall.posB.y - wall.posA.y));
          const intersectcoords = createVector(xcoords, ycoords);
          return intersectcoords;
      }
      else{
          return
      }
    }
}

function intersectT(x1, y1, x2, y2, x3, y3, x4, y4) {
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  return(t)
}

function intersectU(x1, y1, x2, y2, x3, y3, x4, y4) {
  const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  return(u)
}
