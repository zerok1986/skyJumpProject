class Slope {
  constructor(ctx, posX, posY, width, height, speedX, imageName) {
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

	this.slope = {
    angle: 20,
    start: {x: 0, y: 42},  ///// x is always 0 y is 7% of canvas height
    end: {x:1300, y: 360}	//// x is 130% of canvas width y is 60% of canvas height
  	}

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `../img/${this.imageName}`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    )
    this.ctx.drawImage(
      this.imageInstance,
      this.pos.x + this.size.width,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    if (this.pos.x < -this.size.width) {
      this.pos.x = 0;
    }
    this.pos.x -= this.speed.x;
  }
}
