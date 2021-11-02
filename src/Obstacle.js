class Obstacle {
  constructor(ctx, posX, posY, width, height, slope, speedY, imageName) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
      radius: (width / 2) * 0.70,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.speed = {
      y: speedY,
    };

    this.slope = {
      angle: slope.angle,
      start: { x: slope.start.x, y: slope.start.y },
      end: { x: slope.end.x, y: slope.end.y },
    };

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.spriteSource = {
      source: { x: 0, y: 0 },
      size: { width: 42, height: 50 },
    };

    this.init()
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `../img/${this.imageName}`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.spriteSource.source.x,
      this.spriteSource.source.y,
      this.spriteSource.size.width,
      this.spriteSource.size.height,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    this.pos.x -= this.speed.y;
  }
}