const game = {
  title: "Ski Run Maister App",
  author: "Mauro Monereo & Miguel Angel Abad",
  license: undefined,
  version: "1.0.0",
  desciption: "Sky run game with lots of snow",
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: 1000, height: 600 },
  framesCounter: 0,
  FPS: 60,
  intervalId: undefined,
  background: undefined,
  backgroundSpeed: 1,
  player: undefined,
  obstacles: [],
  obstaclesRow: [],
  row: false,
  obstaclesSpeed: 1,
  powerUps: [],
  isCollisionCount: 0,
  isCollisionDodgedCount: 0,
  score: 0,
  lifes: 1000,
  slopeInstance: undefined,
  wastedPlayer: false,
  slope: {
    angle: 20,
    start: { x: 0, y: 42 }, ///// x is always 0 y is 7% of canvas height
    end: { x: 1300, y: 360 }, //// x is 130% of canvas width y is 60% of canvas height
  },
  moving: 0,
  falling: false,
  keyPressedUp: false,
  keyPressedDown: false,
  keys: {
    player: {
      ARROW_UP: "ArrowUp",
      ARROW_DOWN: "ArrowDown",
    },
  },

  /* - - - Init Methods - - - */

  init() {
    this.setContext();
    this.setDimensions();
    this.createAll();
    this.setListeners();

    this.start();
  },

  setContext() {
    this.canvasDOM = document.querySelector(".canvas");
    this.ctx = this.canvasDOM.getContext("2d");
  },

  setDimensions() {
    this.canvasDOM.setAttribute("width", this.canvasSize.width);
    this.canvasDOM.setAttribute("height", this.canvasSize.height);
  },

  createAll() {
    this.createBackground();
    this.createSlope();
    this.createPlayer();
  },

  createBackground() {
    this.background = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height,
      this.backgroundSpeed,
      "bg-double-3.png"
    );
  },

  /* - - - Create Methods - - - */

  createSlope() {
    this.slopeInstance = new Slope(
      this.ctx,
      this.slope.start.x,
      this.slope.start.y,
      this.slope.end.x,
      this.slope.end.y,
      this.backgroundSpeed,
      "slope-huge.png"
    );
  },

  createPlayer() {
    // player starting x is 20% of canvas x
    let startingX = this.canvasSize.width * 0.2;
    // player starting y is 33% of canvas y
    let startingY = this.canvasSize.height * 0.33;
    // player ending x and y is 15% of player starting x and y respectively
    let width = startingX * 0.25;
    let height = startingY * 0.25;

    this.player = new Player(
      this.ctx,
      startingX,
      startingY,
      width,
      height,
      this.slope,
      7,
      "player-sprite.png",
      "falling2.png"
    );
  },

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  createObstacle() {
    const randomY = this.getRandomInt(this.slope.start.y, this.slope.end.y);

    this.obstacles.push(
      new Obstacle(
        this.ctx,
        this.slope.end.x,
        randomY,
        25,
        25,
        this.slope,
        this.obstaclesSpeed,
        "flag-sprite.png"
      )
    );
  },

  setObstacleRow() {
    if (this.obstaclesSpeed >= 17 && !this.row) {
      this.createObstacleRow();
      this.row = true;
    }
    if (this.row) {
      if (this.clearObstacleRow()) {
        this.row = false;
      }
    }
  },

  createObstacleRow() {
    const totalObstacles = 14;
    let startY = 42;
    let spliced = this.getRandomInt(0, totalObstacles - 1);
    for (let i = 0; i < totalObstacles; i++) {
      this.obstaclesRow.push(
        new Obstacle(
          this.ctx,
          this.slope.end.x,
          startY,
          25,
          25,
          this.slope,
          this.obstaclesSpeed - 5,
          "flag-sprite.png"
        )
      );
      startY += 25;
    }
    if (!this.row) {
      this.obstaclesRow.splice(spliced, 2);
    }
  },

  clearObstacleRow() {
    this.obstaclesRow = this.obstaclesRow.filter((obs) => {
      if (obs.pos.x > 0) {
        return true;
      }
    });
    if (!this.obstaclesRow.length) {
      return true;
    }
  },

  createPowerUp() {
    const randomY = this.getRandomInt(
      this.slope.start.y + 20,
      this.slope.end.y - 20
    );
    this.powerUps.push(
      new PowerUp(
        this.ctx,
        this.slope.end.x,
        randomY,
        25,
        35,
        this.slope,
        7,
        "jagger-bottle.png",
        "powerUp-explosion.png"
      )
    );
  },

  /* - - - Start & Interval Method - - - */

  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;
      if (this.framesCounter > 2000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 1500 === 0) {
        this.setObstacleRow();
      }
      if (!this.row) {
        this.setObstacleFrequency();
      }
      if (this.framesCounter % 300 === 0) {
        this.createPowerUp();
      }
      this.clearScreen();
      if (!this.falling) {
        sounds.wind.play();
        sounds.wind.volume = 0.7;
      }
      this.drawAll();
      this.moveAll();
      this.collisionsAndClear();
      this.updateSpeed();
    }, 1000 / this.FPS);
  },

  /* - - - Collisions and Obstacles Set Up - - - */

  collisionsAndClear() {
    this.clearObstacles();
    this.collisionResult(this.isCollision());
    this.isCollisionPowerUp();
    this.clearPowerUps();
    this.isCollisionRow();
  },

  setObstacleFrequency() {
    if (this.obstaclesSpeed > 7) {
      if (this.framesCounter % 25 === 0) {
        this.createObstacle();
      }
    } else {
      if (this.framesCounter % 100 === 0) {
        this.createObstacle();
      }
    }
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  resetContext() {
    this.ctx.rotate((this.slope.angle * -1 * Math.PI) / 180);
  },

  /* - - - Draw Methods - - - */

  drawAll() {
    this.drawBackground();
    this.updateScore();
    this.updateLifes();
    this.drawSlope();
    this.drawPlayer();
    this.drawObstacles();
    this.drawObstaclesRow();
    this.drawPowerUps();
    this.resetContext();
    this.drawGameOver();
  },

  drawBackground() {
    this.background.draw();
  },

  drawSlope() {
    this.ctx.rotate((this.slope.angle * Math.PI) / 180);
    this.slopeInstance.draw();
  },

  drawPlayer() {
    if (this.falling) {
      this.player.drawFall();
      return;
    }
    this.player.draw(0, 0, 60, 50);
  },

  drawObstacles() {
    this.obstacles.forEach((obs) => obs.draw());
  },

  drawObstaclesRow() {
    this.obstaclesRow.forEach((obs) => obs.draw());
  },

  drawPowerUps() {
    this.powerUps.forEach((pwu) => {
      if (pwu.isCollision === 1) {
        pwu.drawCollision();
      }
      pwu.draw();
    });
  },

  drawGameOver() {
    if (this.falling) {
      if (!this.wastedPlayer) {
        sounds.wasted.play();
        sounds.wasted.volume = 0.9;
        this.wastedPlayer = true;
      }
      this.ctx.fillStyle = "rgba(194, 191, 197, 0.79";
      this.ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
      this.ctx.fillStyle = "#CC0000";
      this.ctx.font = "50px Postdam";
      this.ctx.fillText(
        "WASTED",
        this.canvasSize.width / 2 - 100,
        this.canvasSize.height / 2
      );
    }
  },

  /* - - - Update methods - - - */

  calculateScore() {
    this.score += Math.ceil(this.obstaclesSpeed * 0.4);
  },

  updateScore() {
    if (this.falling) {
      return;
    }
    this.calculateScore();
    scoreHTML.innerHTML = `Score: ${this.score}`;
  },

  updateLifes() {
    if (this.lifes <= 0) {
      this.lifes = 0;
    }
    if (this.lifes === 0) {
      this.falling = true;
    }
    lifesHTML.value = `${this.lifes}`;
  },

  updateSpeed() {
    this.updateObstacleSpeed();
    this.updateBackgroundSpeed();
    this.updatePlayerSpeed();
  },

  updateObstacleSpeed() {
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 5) {
      if (this.isCollisionDodgedCount > 300) {
        this.obstaclesSpeed += 1;
        this.isCollisionDodgedCount = 0;
      }
    } else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed < 10) {
      if (this.isCollisionDodgedCount > 200) {
        this.obstaclesSpeed += 2;
        this.isCollisionDodgedCount = 0;
      }
    } else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      if (this.isCollisionDodgedCount > 100) {
        this.obstaclesSpeed += 3;
        this.isCollisionDodgedCount = 0;
      }
    }
  },

  updateBackgroundSpeed() {
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 3) {
      this.background.speed.x = 2;
      this.slopeInstance.speed.x = 2;
    } else if (this.obstaclesSpeed >= 3 && this.obstaclesSpeed < 5) {
      this.background.speed.x = 4;
      this.slopeInstance.speed.x = 4;
    } else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed < 10) {
      this.background.speed.x = 6;
      this.slopeInstance.speed.x = 6;
    } else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      this.background.speed.x = 8;
      this.slopeInstance.speed.x = 8;
    }
  },

  updatePlayerSpeed() {
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed < 10) {
      this.player.speed.y = 7;
    } else if (this.obstaclesSpeed >= 10 && this.obstaclesSpeed < 15) {
      this.player.speed.y = 12;
    }
  },

  /* - - - Move Methods - - - */

  moveAll() {
    this.moveBackground();
    this.moveSlope();
    this.moveObstacle();
    this.moveObstacleRow();
    this.movePowerUps();
    this.movePlayer();
  },

  moveBackground() {
    this.background.move();
  },

  moveSlope() {
    this.slopeInstance.move();
  },

  moveObstacle() {
    this.obstacles.forEach((obs) => obs.move());
  },

  moveObstacleRow() {
    this.obstaclesRow.forEach((obs) => obs.move());
  },

  movePowerUps() {
    this.powerUps.forEach((pwu) => pwu.move());
  },

  movePlayer() {
    if (this.keyPressedUp) {
      this.player.moveUp();
    } else if (this.keyPressedDown) {
      this.player.moveDown();
    }
  },

  /* - - - setListeners Methods - - - */

  setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.player.ARROW_UP) {
        this.moving = 1;
        if (this.falling) {
          return;
        }
        this.keyPressedUp = true;
        this.player.spriteSource.source.x = 185;
        this.player.spriteSource.source.y = 0;
      }
      if (e.key === this.keys.player.ARROW_DOWN) {
        this.moving = 1;
        if (this.falling) {
          return;
        }
        this.keyPressedDown = true;
        this.player.spriteSource.source.x = 120;
        this.player.spriteSource.source.y = 0;
      }
    };

    document.onkeyup = (e) => {
      if (e.key === this.keys.player.ARROW_UP) {
        this.moving = 0;
        this.keyPressedUp = false;
        this.player.spriteSource.source.x = 0;
        this.player.spriteSource.source.y = 0;
      }
      if (e.key === this.keys.player.ARROW_DOWN) {
        this.moving = 0;
        this.keyPressedDown = false;
        this.player.spriteSource.source.x = 0;
        this.player.spriteSource.source.y = 0;
      }
    };
  },

  /* - - - Collisions Methods - - - */

  clearObstacles() {
    this.obstacles = this.obstacles.filter((obs) => {
      if (obs.pos.x > 0) {
        return true;
      }
    });
  },

  clearPowerUps() {
    this.powerUps = this.powerUps.filter((pwu) => {
      if (pwu.pos.x > 0) {
        return true;
      }
    });
  },

  isCollision() {
    return this.obstacles.some((obs) => {
      let dx =
        this.player.pos.x +
        this.player.pos.radius -
        (obs.pos.x + obs.pos.radius);
      let dy =
        this.player.pos.y +
        this.player.pos.radius -
        (obs.pos.y + obs.pos.radius);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.player.pos.radius + obs.pos.radius) {
        this.lifes -= Math.floor(this.calculateDamage());

        this.obstaclesSpeed = 1;
        obs.spriteSource.source.x = 42;
        sounds.collision.play();
        sounds.collision.volume = 0.7;
      }
    });
  },

  isCollisionRow() {
    return this.obstaclesRow.some((obs) => {
      let dx =
        this.player.pos.x +
        this.player.pos.radius -
        (obs.pos.x + obs.pos.radius);
      let dy =
        this.player.pos.y +
        this.player.pos.radius -
        (obs.pos.y + obs.pos.radius);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.player.pos.radius + obs.pos.radius) {
        this.lifes = 0;
        obs.spriteSource.source.x = 42;
        sounds.collision.play();
        sounds.collision.volume = 0.7;
      }
    });
  },

  calculateDamage() {
    if (this.obstaclesSpeed > 0 && this.obstaclesSpeed <= 4) {
      return 40;
    } else if (this.obstaclesSpeed >= 5 && this.obstaclesSpeed <= 12) {
      return 50;
    } else if (this.obstaclesSpeed >= 13 && this.obstaclesSpeed <= 14) {
      return 400;
    } else if (this.obstaclesSpeed > 15) {
      return 1000;
    }
  },

  isCollisionPowerUp() {
    if (this.falling) {
      return;
    }
    return this.powerUps.some((pws) => {
      let dx =
        this.player.pos.x +
        this.player.pos.radius -
        (pws.pos.x + pws.pos.radius);
      let dy =
        this.player.pos.y +
        this.player.pos.radius -
        (pws.pos.y + pws.pos.radius);
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.player.pos.radius + pws.pos.radius) {
        pws.isCollision = 1;
        this.score += 50;
        sounds.drink.play();
        sounds.drink.volume = 0.7;
        if (this.lifes < 1000) {
          if (this.lifes + 20 > 1000) {
            this.lifes = 1000;
          } else {
            this.lifes += 20;
          }
        }
      }
    });
  },

  collisionResult(result) {
    result === true ? this.isCollisionCount++ : this.isCollisionDodgedCount++;
  },
};
