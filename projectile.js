export class Projectile {
  constructor() {
    this.projectilesArray = [];
    // Position is layed out such as : {x: Horizontal position; y: Vertical Position}
    this.position = null;
    this.domElement = null;
  }
  createProjectileElement(parentNode) {
    const element = document.createElement("div");
    element.classList.add("projectile");
    this.domElement = element;
    let randomX = Math.floor(Math.random() * Math.floor(90));
    this.position = { x: randomX, y: 1 };
    this.domElement.style.gridRow = `${this.position.y} / span 2 `;
    this.domElement.style.gridColumn = `${this.position.x} / span 2`;
    parentNode.appendChild(this.domElement);
    this.falling();
    return parentNode;
  }
  getPosition() {
    return this.position;
  }
  getOldPosition() {
    return this.oldPosition;
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  falling() {
    const intervalId = setInterval(() => {
      this.position.y = this.position.y + 1;
      this.domElement.style.gridRow = `${this.position.y} / span 2`;
    }, 20);
  }
}
