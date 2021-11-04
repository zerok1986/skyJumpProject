class Background {
  constructor(
    ctx,
    posX,
    posY,
    width,
    height,
    speedX,
    imageName,
    cornerImageName
  ) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.speed = {
      x: speedX,
    };

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.cornerImageInstance = undefined;
    this.cornerImageName = cornerImageName;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `../img/${this.imageName}`;
    this.cornerImageInstance = new Image();
    this.cornerImageInstance.src = `../img/${this.cornerImageName}`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
    this.ctx.drawImage(
      this.imageInstance,
      this.pos.x + this.size.width,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  drawCorner() {
    this.ctx.drawImage(this.cornerImageInstance, 0, 350, 500, 300);
  }

  move() {
    if (this.pos.x < -this.size.width) {
      this.pos.x = 0;
    }
    this.pos.x -= this.speed.x;
  }
}
