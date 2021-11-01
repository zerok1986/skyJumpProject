const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const scoreHTML = document.querySelector(".score")
const lifesHTML = document.querySelector(".lifes")

startBtn.onclick = () => {
  game.init()
}

resetBtn.onclick = () => {
  game.reset()
}

// window.onload = () => {
//   game.init()
// }