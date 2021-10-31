const game = {
  title: 'Ski Jump App',
  author: 'Mauro Monereo & Miguel Angel Abad',
  license: undefined,
  version: '0.0.1',
  desciption: 'Sky jump game with lots of snow',
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: 500, height: 300 },
  framesCounter: 0,
  FPS: 60,
  intervalId: undefined,
  background: undefined,
  player: undefined,
  scoreBoard: undefined,
  obstacles: [],
  obstaclesSpeed: 1,
  isCollisionCount: 0,
  isCollisionDodgedCount: 0,
  slope: {
    angle: 20,
    start: {x: 0, y: 20},
    end: {x:650, y: 180}
  },
  keys: {
    player: {
      ARROW_UP: "ArrowUp",
      ARROW_DOWN: "ArrowDown"
    }
  },

  init() {
    this.setContext()
    this.setDimensions()
    this.createAll()
    this.setListeners()
    
    this.start()
  },

  setContext() {
    this.canvasDOM = document.querySelector(".canvas")
    this.ctx = this.canvasDOM.getContext("2d")
  },

  setDimensions() {
    this.canvasDOM.setAttribute("width", this.canvasSize.width)
    this.canvasDOM.setAttribute("height", this.canvasSize.height)
  },

  start(){
  this.intervalId = setInterval(() => {
    this.framesCounter++
    if (this.framesCounter > 2000) {
      this.framesCounter = 0
    }
    if (this.framesCounter % 150 === 0) {
      this.createObstacle()
    }
    this.clearScreen();
    this.drawAll()
    this.moveAll()
    this.clearObstacles()
    this.collisionResult(this.isCollision())
    console.log(this.isCollisionCount)
    console.log(this.isCollisionDodgedCount)
   
  }, 1000 / this.FPS)
   
  },
  
  resetContext(){
    this.ctx.rotate((this.slope.angle * -1 * Math.PI) / 180);
  },

  drawAll(){
    this.drawBackground()
    this.drawSlope()
    this.drawPlayer()
    this.drawObstacles()
    this.resetContext()
  },

  drawBackground() {
    // this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    this.background.draw()
    // console.log("pintando Background")
  },

  drawSlope(){
    this.ctx.rotate(this.slope.angle * Math.PI / 180);
    this.ctx.fillStyle = '#FFF'
    this.ctx.fillRect(this.slope.start.x, this.slope.start.y, this.slope.end.x, this.slope.end.y);
    // console.log("pintando slope")
  },

  drawPlayer(){
    this.player.draw()
    
  },

  drawObstacles() {
    this.obstacles.forEach(obs => obs.draw())
  },

  moveAll(){
    this.moveBackground()
    this.moveObstacle()
  },

  createBackground() {
    this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, 5, "bm-view.png")
    //console.log("creando Background")
  },

  createPlayer() {
    this.player = new Player(this.ctx, 100, 100, 20, 20, this.slope, 5)
    //console.log("creando Player")
  },
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  createObstacle() {
    const randomY = this.getRandomInt(
      this.slope.start.y,
      this.slope.end.y - 20
    );
    this.obstacles.push(new Obstacle(this.ctx, this.slope.end.x, randomY, 15, 15, this.slope, this.obstaclesSpeed))
  },

  moveBackground() {
    this.background.move()
    //console.log("moviendo Background")
  },

  moveObstacle() {
    this.obstacles.forEach(obs => obs.move())
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  },

  createAll() {
    this.createBackground()
    this.createPlayer()
    /* TODO:
    this.createScoreBoard() */
  },

  setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.player.ARROW_UP) {
        this.player.moveUp()
      }
      if (e.key === this.keys.player.ARROW_DOWN) {
        this.player.moveDown()
      }
    }
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => {
      if (obs.pos.x > 0) {
        return true
      }
    })
  },

  isCollision() {
      return this.obstacles.some((obs) => {
      let dx = (this.player.pos.x + this.player.pos.radius) - (obs.pos.x + obs.pos.radius);
      let dy = (this.player.pos.y + this.player.pos.radius) - (obs.pos.y + obs.pos.radius);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.player.pos.radius + obs.pos.radius) {
          return true
      }
    })
  },


  collisionResult(result) {
    result === true ? this.isCollisionCount++ : this.isCollisionDodgedCount++
  }






  /* TODO:  
            colisiones que tengan efecto en velocidad
            crear otro tipo de Obstacle (PowerUp)
              - otro tipo de efecto en velocidad
            score() */
}