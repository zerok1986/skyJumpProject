class Player {
  constructor(ctx, posX, posY, width, height, slope, speedY, imageName) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
      radius: (width / 2) * 0.7,
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

    //// TODO:
    // this.frames = 3
    this.framesIndex = 0;

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.spriteSource = {
      source: { x: 0, y: 0 },
      size: { width: 60, height: 50 },
    };

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `../img/${this.imageName}`;
  }

  draw() {
    // Referencia dimensiones player: w:60 / h: 50
    if (game.moving != 1) {
      this.ctx.drawImage(
        this.imageInstance,
        this.spriteSource.source.x +
          this.spriteSource.size.width * this.framesIndex,
        this.spriteSource.source.y,
        this.spriteSource.size.width,
        this.spriteSource.size.height,
        this.pos.x,
        this.pos.y,
        this.size.width,
        this.size.height
      );
      if (game.framesCounter % 50 === 0) {
        this.animate();
      }
    } else {
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
  }

  animate() {
    if (this.framesIndex === 1) {
      this.framesIndex = 0;
      return;
    }
    this.framesIndex++;
  }

  moveUp() {
    if (this.pos.y > this.slope.start.y) {
      if (this.pos.y - this.speed.y > this.slope.start.y) {
        this.pos.y -= this.speed.y;
      } else {
        this.pos.y = this.slope.start.y;
      }
    }
  }

  moveDown() {
    if (this.pos.y < this.slope.end.y) {
      if (this.pos.y + this.speed.y < this.slope.end.y) {
        this.pos.y += this.speed.y;
      } else {
        this.pos.y = this.slope.end.y;
      }
    }
  }
}
