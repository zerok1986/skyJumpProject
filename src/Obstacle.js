class Obstacle {
  constructor(ctx, posX, posY, width, height, slope, speedX, speedY) {
    this.ctx = ctx

    this.pos = {
      x: posX,
      y: posY
    }

    this.size = {
      width: width,
      height: height
    }

    this.speed = {
      x: speedX,
      y: speedY
    }

    this.slope = {
      angle: slope.angle,
      start: { x: slope.start.x, y: slope.start.y },
      end: { x: slope.end.x, y: slope.end.y },
    };
  }
  
  draw() {
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
  }

  move() {
    this.pos.x -= this.speed.x
  }

}