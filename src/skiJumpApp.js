const game = {
  title: 'Ski Jump App',
  author: 'Mauro Monereo & Miguel Angel Abad',
  license: undefined,
  version: '0.0.1',
  desciption: 'Sky jump game with lots of snow',
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: 1000, height: 600 },
  framesCounter: 0,
  FPS: 60,
  intervalId: undefined,
  background: undefined,
  backgroundSpeed: 1,
  player: undefined,
  scoreBoard: undefined,
  obstacles: [],
  obstaclesSpeed: 1,
  powerUps: [],
  isCollisionCount: 0,
  isCollisionDodgedCount: 0,
  score: 0,
  slope: {
    angle: 20,
    start: {x: 0, y: 42},   ///// x is always 0 y is 7% of canvas height
    end: {x:1300, y: 360}	//// x is 130% of canvas width y is 60% of canvas height
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
    if (this.framesCounter % 100 === 0) {
      this.createObstacle()
    }
    if (this.framesCounter % 300 === 0) {
      this.createPowerUp()
    }
    this.clearScreen();
    this.drawAll()
    this.moveAll()
    this.clearObstacles()
    this.clearPowerUps()
    this.collisionResult(this.isCollision())
    this.updateSpeed()
    console.log("powerup:", this.powerUps)
    console.log("obstacles: ", this.obstacles)
    console.log('this obstacles speed:' ,this.obstaclesSpeed)
   
  }, 1000 / this.FPS)
   
  },
  
  resetContext(){
    this.ctx.rotate((this.slope.angle * -1 * Math.PI) / 180);
  },

  drawAll(){
    this.drawBackground()
    this.drawScore()
    this.drawSlope()
    this.drawPlayer()
    this.drawObstacles()
    this.drawPowerUps()
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

  drawPowerUps() {
    this.powerUps.forEach(pwu => pwu.draw())
  },

  drawScore() {
    this.ctx.font = '20px serif';
    this.ctx.fillStyle = '#DE1E2E'
    this.score += Math.floor(this.obstaclesSpeed * 0.4)
    this.ctx.fillText(`Score: ${this.score}`, this.canvasSize.width - 120, 30, 90);
  },

  moveAll(){
    this.moveBackground()
    this.moveObstacle()
    this.movePowerUps()
  },

  createBackground() {
    this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, this.backgroundSpeed, "bm-view.png")
    //console.log("creando Background")
  },

  createPlayer() {

	// player starting x is 20% of canvas x
	let startingX = this.canvasSize.width * 0.20;
	// player starting y is 33% of canvas y
	let startingY = this.canvasSize.height * 0.33;
	// playeer ending x and y is 15% of player starting x and y respectively
	let width = startingX * 0.15;
	let height = startingY * 0.15;

    this.player = new Player(this.ctx, startingX, startingY, width, height, this.slope, 5)
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
 /*    obstacle width is 2.30% of slope x
	let width = (this.slope.end.x - this.slope.start.x) * 0.023
    obstacle height is 9.40% of slope y
	let height = (this.slope.end.y - this.slope.start.y) * 0.094 */
    this.obstacles.push(new Obstacle(this.ctx, this.slope.end.x, randomY, 15, 15, this.slope, this.obstaclesSpeed))
  },

  createPowerUp() {
    const randomY = this.getRandomInt(
      this.slope.start.y,
      this.slope.end.y - 20
    );
    this.powerUps.push(new PowerUp(this.ctx, this.slope.end.x, randomY, 10, 10, this.slope, 10))
  },

  moveBackground() {
    this.background.move()
    //console.log("moviendo Background")
  },

  moveObstacle() {
    this.obstacles.forEach(obs => obs.move())
  },

  movePowerUps() {
    this.powerUps.forEach(pwu => pwu.move())
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

  clearPowerUps() {
    this.powerUps = this.powerUps.filter(pwu => {
      if (pwu.pos.x > 0) {
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
          this.obstaclesSpeed = 1
      }
    })
  },


  collisionResult(result) {
    result === true ? this.isCollisionCount++ : this.isCollisionDodgedCount++
  },

  updateSpeed(){
    this.updateObstacleSpeed()
    this.updateBackgroundSpeed()
    this.updatePlayerSpeed()
  },

  updateObstacleSpeed() {
    console.log("en update speed")
    console.log("obstacle speed:", this.obstaclesSpeed)
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 5) {
      if (this.isCollisionDodgedCount > 200){
        this.obstaclesSpeed += 1
        this.isCollisionDodgedCount = 0
      }
    } 
    else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed < 10) {
      if (this.isCollisionDodgedCount > 100) {
          this.obstaclesSpeed += 2
          this.isCollisionDodgedCount = 0
        }
    }
    else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      if (this.isCollisionDodgedCount > 70) {
          this.obstaclesSpeed += 3
          this.isCollisionDodgedCount = 0
        }
    }
  },

  updateBackgroundSpeed(){
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 3) {
      this.background.speed.x = 2
    }
    else if (this.obstaclesSpeed >= 3 && this.obstaclesSpeed < 5) {
      this.background.speed.x = 4;
    }
    else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed < 10) {
      this.background.speed.x = 6;
    }
    else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      this.background.speed.x = 8;
    }

    console.log("background speed:", this.background.speed.x)
  },

  updatePlayerSpeed() {
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 3) {
      this.player.speed.y = 5
    }
    else if (this.obstaclesSpeed >= 3 && this.obstaclesSpeed < 5) {
      this.player.speed.y = 7;
    }
    else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed < 10) {
      this.player.speed.y = 10;
    }
    else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      this.player.speed.y = 15;
    }
    console.log("player speed:", this.player.speed.y)
  },


    

  /* TODO:  
            PowerUp: definir otro tipo de efecto en velocidad
            Maquetación del Game Board
            Pintar Score en el ScoreBoard
            Boton de inicio y Restart
            Sprite jugador
            Sprites obstaculos
            Sprites PowerUps
            Retocar el asset del Background
            */
}