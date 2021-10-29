const game = {
  title: 'Ski Jump App',
  author: 'Mauro Monereo & Miguel Angel Abad',
  license: undefined,
  version: '0.0.1',
  desciption: 'Sky jump game with lots of snow',
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  framesCounter: 0,
  frames: 60,
  intervalId: undefined,
  background: undefined,
  player: undefined,
  scoreBoard: undefined,
  obstacles: [],
  keys: {
    player: {
    // TODO:
    //   SPACE: " ",
    //   ARROW_UP: "ArrowUp"
    }
  },

  // TODO: Métodos init(), setContext(), setDimensions(), start(), createAll()
  // drawAll(), drawScoreBoard(), moveBackground(), setListerners(), clearScreen()
  // clearObstacles(), isCollision(), gameOver()
}