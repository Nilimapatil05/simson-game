let gameseq = [];
let userseq = [];
let started = false;
let highestScore = 0;
let h3 = document.querySelector("h3");
let level = 0;
let btns = ["pink", "purple", "blue", "green"];
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});
console.log(btns);

function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `level : ${level}`;
  let randomIndex = Math.floor(Math.random() * btns.length);
  let randomcolor = btns[randomIndex];
  let randombtn = document.querySelector(`.${randomcolor}`);
  // console.log(randomIndex);
  // console.log(randombtn);
  // console.log(randomcolor);
  gameseq.push(randomcolor);
  console.log(gameseq);
  //   flash random button
  gameflash(randombtn);
}
function checkAns(idx) {
  // console.log(`current level ${level}`);
  let index = idx;
  if (userseq[index] == gameseq[index]) {
    if (userseq.length == gameseq.length) {
      if (level > highestScore) {
        highestScore = level;
        updateHighestScoreDisplay();
      }
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `game over!!!your score is <b>${level}</b> <br>press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    document.addEventListener("keypress", resetOnKeyPress);
  }
}
function resetOnKeyPress(event) {
  reset();
  document.removeEventListener("keypress", resetOnKeyPress);
}
function updateHighestScoreDisplay() {
  let highestScoreElement = document.getElementById("highest-score");
  highestScoreElement.innerText = `Highest Score: ${highestScore}`;
}

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}
function btnpress() {
  console.log(`button was press`);
  let btn = this;
  console.log(btn);
  userflash(btn);
  userColor = btn.getAttribute("id");
  userseq.push(userColor);
  console.log(userColor);
  checkAns(userseq.length - 1);
}
let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
  btn.addEventListener("click", btnpress);
}
// function reset() {
//   started == false;
//   gameseq = [];
//   userseq = [];
//   level = 0;
// }
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
  document.removeEventListener("keypress", resetOnKeyPress);
}
