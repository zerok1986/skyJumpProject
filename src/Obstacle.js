class Obstacle {
  constructor(ctx, posX, posY, width, height, slope, speedY) {
    this.ctx = ctx

    this.pos = {
      x: posX,
      y: posY,
      radius: width / 2
    }

    this.size = {
      width: width,
      height: height
    }

    this.speed = {
      y: speedY
    }

    this.slope = {
      angle: slope.angle,
      start: { x: slope.start.x, y: slope.start.y },
      end: { x: slope.end.x, y: slope.end.y },
    };
  }
  
  draw() {
    this.ctx.fillStyle = '#111'
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
  }

  move() {
    this.pos.x -= this.speed.y
  }

}