class PowerUp {
  constructor(
    ctx,
    posX,
    posY,
    width,
    height,
    slope,
    speedY,
    imageName,
    collisionImageName
  ) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
      radius: width / 2,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.speed = {
      y: speedY,
    };

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.collisionImageInstance = undefined;
    this.collisionImageName = collisionImageName;

    this.isCollision = 0;

    this.frameIndex = 0;

    this.spriteSource = {
      source: { x: 0, y: 1330 },
      size: { width: 190, height: 190 },
    };

    this.slope = {
      angle: slope.angle,
      start: { x: slope.start.x, y: slope.start.y },
      end: { x: slope.end.x, y: slope.end.y },
    };

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `../img/${this.imageName}`;

    this.collisionImageInstance = new Image();
    this.collisionImageInstance.src = `../img/${this.collisionImageName}`;
  }

  draw() {
    if (this.isCollision !== 1) {
      this.ctx.drawImage(
        this.imageInstance,
        this.pos.x,
        this.pos.y,
        this.size.width,
        this.size.height
      );
    }
  }

  drawCollision() {
    this.ctx.drawImage(
      this.collisionImageInstance,
      this.spriteSource.source.x +
        this.spriteSource.size.width * this.frameIndex,
      this.spriteSource.source.y,
      this.spriteSource.size.width,
      this.spriteSource.size.height,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
    console.log(this.spriteSource.size.width * this.frameIndex);
    if (game.framesCounter % 2 === 0) {
      this.animate();
    }
  }

  animate() {
    if (this.frameIndex === 9) {
      this.spriteSource.source.x = 100;
    }
    this.frameIndex++;
  }

  move() {
    this.pos.x -= this.speed.y;
  }
}
