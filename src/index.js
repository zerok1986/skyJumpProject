const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const scoreHTML = document.querySelector(".score")
const lifesHTML = document.querySelector("#life")

startBtn.onclick = () => {
  game.init()
}

resetBtn.onclick = () => {
  game.reset()
}

window.onload = () => {
  sounds.skiUp.preload = "auto";
  sounds.skiUp.load();
  sounds.skiDown.preload = "auto";
  sounds.skiDown.load();
  sounds.drink.preload = "auto";
  sounds.drink.load();
  sounds.collision.preload = "auto";
  sounds.collision.load()
  sounds.wasted.preload = "auto";
  sounds.wasted.load();
  sounds.wind.preload = "auto";
  sounds.wind.load();
}