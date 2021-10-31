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
  frames: 60,
  intervalId: undefined,
  background: undefined,
  player: undefined,
  scoreBoard: undefined,
  obstacles: [],
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
    this.drawBackground()
  },


  drawBackground() {
    console.log("pintando Background")
    // this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    this.background.draw()
  },
  
  createBackground() {
    console.log("creando Background")
    this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, 5, "bg.png")
  },

  moveBackground() {
    console.log("moviendo Background")
    this.background.move()
  },


  createAll() {
    this.createBackground()
 /*    this.createPlayer()
    this.createScoreBoard() */
  },

  // TODO: Métodos init(), setContext(), setDimensions(), start(), createAll()
  // drawAll(), drawScoreBoard(), moveBackground(), setListerners(), clearScreen()
  // clearObstacles(), isCollision(), gameOver()
}