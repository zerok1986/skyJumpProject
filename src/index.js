const startBtn = document.querySelector(".start-btn");
const howToBtn = document.querySelector(".how-btn");
const scoreHTML = document.querySelector(".score");
const lifesHTML = document.querySelector("#life");
const howToPanel = document.querySelector(".how-to");

startBtn.onclick = () => {
  if (!howToPanel.classList.contains("hidden")) {
    howToPanel.classList.add("hidden");
  }
  game.init();
};

howToBtn.onclick = () => {
  howToPanel.classList.toggle("hidden");
};

window.onload = () => {
  sounds.skiUp.preload = "auto";
  sounds.skiUp.load();
  sounds.skiDown.preload = "auto";
  sounds.skiDown.load();
  sounds.drink.preload = "auto";
  sounds.drink.load();
  sounds.collision.preload = "auto";
  sounds.collision.load();
  sounds.wasted.preload = "auto";
  sounds.wasted.load();
  sounds.wind.preload = "auto";
  sounds.wind.load();
};
