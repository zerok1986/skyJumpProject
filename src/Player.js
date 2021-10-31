class Player {
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
      //console.log("draw player")
    }

    moveUp(){
      if (this.pos.y > this.slope.start.y){
        if (this.pos.y - this.speed.y > this.slope.start.y) {
          this.pos.y -= this.speed.y
        }
        else{
          this.pos.y = this.slope.start.y + this.size.height / 2
        }
      }
    }
      

    moveDown(){
      if (this.pos.y < this.slope.end.y){
        if (this.pos.y + this.speed.y < this.slope.end.y){
          this.pos.y += this.speed.y
        }
      
        else {
        this.pos.y = this.slope.end.y - this.size.height / 2
        }
      } 
    }
}