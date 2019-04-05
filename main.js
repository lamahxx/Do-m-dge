import { Character } from "./character.js";
import { Projectile } from "./projectile.js";

//Event Listener
const LEFTARROW = 37;
const RIGHTARROW = 39;
const keyState = {};
window.onkeydown = e => (keyState[e.keyCode] = true);
window.onkeyup = e => (keyState[e.keyCode] = false);

//Calling Dom Elements
const scene = document.getElementById("scene");
const characterScene = document.getElementById("char-grid");
const projectilesScene = document.getElementById("proj-grid");
const timeDisplay = document.getElementById("time");
const defeatDisplay = document.getElementById("defeat");

//Creating DOM ELements;
const character = new Character({ x: 2, y: 33 });
// const projectile = new Projectile();
character.createCharacterElement(characterScene);
// scene.appendChild(projectile.createProjectileElement(projectilesScene));
character.animationControl(keyState);
let hit = false;
const projectilesArray = [];
let maxObj = 10;
let projSpeed = 500;
let projStack = 0;
let timeElapsed = null;

function checkCollision() {
  if (character.lives <= 0) {
    defeatDisplay.style.display = "block";
    setInterval(() => {
      document.location.reload(true);
    }, 5000);
  }
  const char = character.domElement;
  let cX = char.style.gridColumnStart;
  let cY = char.style.gridRowStart;
  if (projectilesScene.children.length) {
    for (let i = 0; i < projectilesScene.children.length - 1; i++) {
      let pX = projectilesScene.children[i].style.gridColumnStart;
      let pY = projectilesScene.children[i].style.gridRowStart;
      if (pX - cX >= -2 && pX - cX < 3 && pY - cY >= -2 && pY - cY < 3) {
        projectilesScene.removeChild(projectilesScene.children[i]);
        const lives = document.getElementsByClassName("lives");
        lives[0].removeChild(lives[0].lastElementChild);
        character.lives--;
        console.log("fuck");
      }
    }
  }

  // const proj = projectile.domElement;

  // let pX = proj.style.gridColumnStart;
  // let pY = proj.style.gridRowStart;

  // if (pX - cX >= -2 && pX - cX < 3 && pY - cY >= -2 && pY - cY < 3) {
  //   try {
  //     if (!hit) {
  //       projectilesScene.removeChild(proj);
  //       const lives = document.getElementsByClassName("lives");
  //       lives[0].removeChild(lives[0].lastElementChild);
  //       console.log(lives[0].lastElementChild);
  //     }
  //     hit = true;
  //     setTimeout(() => {
  //       hit = false;
  //     }, 1000);
  //   } catch (e) {}
  // }
  requestAnimationFrame(checkCollision);
}
requestAnimationFrame(checkCollision);

function levelIncrease() {
  if (timeElapsed > 10) {
    maxObj = 40;
  }
  if (timeElapsed > 20) {
    maxObj = 60;
    projSpeed = 500;
  }
  if (timeElapsed > 30) {
    maxObj = 65;
  }
  if (timeElapsed > 40) {
    maxObj = 90;
    projSpeed = 300;
  }
  if (timeElapsed > 50) {
    maxObj = 100;
  }
  if (timeElapsed > 60) {
    maxObj = 110;
    projSpeed = 200;
  }
}

function gameLoop() {
  if (keyState[LEFTARROW]) {
    character.move("LEFT");
  }
  if (keyState[RIGHTARROW]) {
    character.move("RIGHT");
  }
  if (keyState[32]) {
    if (!character.isAirborne) {
      character.jump();
    }
  }
  levelIncrease();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

const timeInterval = setInterval(() => {
  timeDisplay.innerHTML = `Time Elapsed: ${timeElapsed++}s`;
}, 1000);

function createProjectiles(parentNode) {
  const createInterval = setInterval(() => {
    if (projStack <= maxObj) {
      const projectile = new Projectile();
      const element = projectile.createProjectileElement(parentNode);
      projectilesArray.push(element);
      projStack++;
    }
    console.log(projectilesArray.length);
  }, projSpeed);
}

/////////////////// TODO : MAYBE SET A REQUEST ANIMATION FRAME HERE INCASE IT GETS BUGGY
function deleteProjOverFlow(parentNode) {
  const deleteInterval = setInterval(() => {
    if (parentNode.children.length) {
      try {
        for (let i = 0; i < projectilesArray.length - 1; i++) {
          if (parseInt(parentNode.children[i].style.gridRow, 10) > 60) {
            parentNode.removeChild(parentNode.children[i]);
          }
        }
      } catch (e) {
        return "fuck";
      }
    }
  }, 10);
}

createProjectiles(projectilesScene);
deleteProjOverFlow(projectilesScene);
