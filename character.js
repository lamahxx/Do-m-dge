export class Character {
  constructor(position) {
    // Position is layed out such as : {x: Horizontal position; y: Vertical Position}
    this.currentPosition = position;
    // this.oldPosition = { x: this.currentPosition.y, y: this.currentPosition.y };
    // this.name = name;
    this.lives = 3;
    this.isAirborne = false;
    this.isRunning = false;
    this.startingAnimation = 10;
    this.domElement = null;
  }

  animationControl(keyState) {
    const update = setInterval(() => {
      if (keyState[39] || (keyState[37] && !this.isAirborne)) {
        this.domElement.classList.remove("characterJumping");
        this.domElement.classList.add("characterRunning");
        this.domElement.classList.remove("characterIdle");
      }
      if ((this.isRunning && this.isAirborne) || this.isAirborne) {
        this.domElement.classList.add("characterJumping");
        this.domElement.classList.remove("characterRunning");
        this.domElement.classList.remove("characterIdle");
      }
      if (!keyState[37] && !keyState[39] && !this.isAirborne) {
        this.domElement.classList.remove("characterJumping");
        this.domElement.classList.remove("characterRunning");
        this.domElement.classList.add("characterIdle");
      }
    });
  }

  createCharacterElement(parentNode) {
    const element = document.createElement("div");
    element.classList.add("characterRunning");
    this.domElement = element;
    this.domElement.style.gridColumn = `${this.currentPosition.x}`;
    this.domElement.style.gridRow = `${this.currentPosition.y}`;
    parentNode.appendChild(this.domElement);
    return parentNode;
  }

  jump() {
    this.isAirborne = true;
    let height = 0;
    const intervalId = setInterval(() => {
      if (height > 15) {
        clearInterval(intervalId);
        this.fall();
      }
      this.currentPosition = {
        x: this.currentPosition.x,
        y: this.currentPosition.y - 1
      };
      this.domElement.style.gridRow = `${this.currentPosition.y + 1}`;

      height++;
    }, 11);
  }

  fall() {
    let height = 0;
    const intervalId = setInterval(() => {
      if (height > 15) {
        clearInterval(intervalId);
        this.isAirborne = false;
      }

      this.currentPosition = {
        x: this.currentPosition.x,
        y: this.currentPosition.y + 1
      };
      this.domElement.style.gridRow = `${this.currentPosition.y + 1}`;
      height++;
    }, 11);
  }

  sayMessage() {
    console.log(`Object detected`);
  }

  move(direction) {
    if (direction === "LEFT" && this.currentPosition.x > 0) {
      this.currentPosition.x -= 0.5;
      this.domElement.style.gridColumn = `${this.currentPosition.x + 1}`;
      this.domElement.classList.add("reversed");
      this.isRunning = true;
    }
    if (direction === "RIGHT" && this.currentPosition.x < 97) {
      this.currentPosition.x += 0.5;
      this.domElement.style.gridColumn = `${this.currentPosition.x + 1} `;
      this.domElement.classList.remove("reversed");
      this.isRunning = true;
    }
  }

  setPosition(direction) {
    if (direction === "LEFT" && this.isRunning === false) {
      this.isRunning = true;
      setTimeout(() => {
        this.currentPosition = {
          x: this.currentPosition.x,
          y: this.currentPosition.y - 1
        };
        this.isRunning = false;
      }, 15);
    }
    if (direction === "RIGHT" && this.isRunning === false) {
      this.isRunning = true;
      setTimeout(() => {
        this.currentPosition = {
          x: this.currentPosition.x,
          y: this.currentPosition.y + 1
        };
        this.isRunning = false;
      }, 15);
    }
  }

  getPosition() {
    return this.currentPosition;
  }
}
