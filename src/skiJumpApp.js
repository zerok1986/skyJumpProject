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
  window.setInterval(() => {
    this.clearScreen();
    this.drawAll()
    
   
  }, 1000 / this.FPS)
   
  },
  
  resetContext(){
    this.ctx.rotate((this.slope.angle * -1 * Math.PI) / 180);
  },

  drawAll(){
    this.drawBackground()
    this.drawSlope()
    this.drawPlayer()
    this.resetContext()
  },

  drawBackground() {
    // this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    this.background.draw()
    console.log("pintando Background")
  },

  drawSlope(){
    this.ctx.rotate(this.slope.angle * Math.PI / 180);
    this.ctx.fillStyle = '#FFF'
    this.ctx.fillRect(this.slope.start.x, this.slope.start.y, this.slope.end.x, this.slope.end.y);
    console.log("pintando slope")
  },

  drawPlayer(){
    this.player.draw()
    
  },

  createBackground() {
    this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, 5, "bm-view.png")
    console.log("creando Background")
  },

  createPlayer() {
    this.player = new Player(this.ctx, 100, 100, 20, 20, 5)
    console.log("creando Player")
  },

  moveBackground() {
    this.background.move()
    console.log("moviendo Background")
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

  // TODO: Métodos init(), setContext(), setDimensions(), start(), createAll()
  // drawAll(), drawScoreBoard(), moveBackground(), setListerners(), clearScreen()
  // clearObstacles(), isCollision(), gameOver()
}