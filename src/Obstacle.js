class Obstacle {
  constructor(ctx, posX, posY, width, height, speedX) {
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
  }
  // TODO: Métodos init, draw, move

}