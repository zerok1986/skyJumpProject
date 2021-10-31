class Player {
  constructor(ctx, posX, posY, width, height, speedY) {
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
      y: speedY
    }

    //// TODO:
    // this.frames = 3
    // this.framesIndex = 0

    // this.imageInstance = undefined
    // this.imageName = imageName

    this.init()
  }

    // TODO: Métodos init(), move(), 
    init() {
      console.log("init player")
    }

    draw(){
      this.ctx.fillStyle = "#F48224";
      this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height, this.speed.y)
      console.log("draw player")
    }

    moveUp(){
      this.pos.y -= this.speed.y
      console.log("moving up")
    }

    moveDown(){
      this.pos.y += this.speed.y
      console.log("moving down");
    }
      
}