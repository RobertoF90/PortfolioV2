class DirectionInput {
  constructor() {
    this.heldDirection = [];

    this.keys = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
      ArrowDown: "down",
      KeyS: "down",
    };
  }

  get direction() {
    return this.heldDirection.slice(0, 2);
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const dir = this.keys[e.code];
      if (dir && this.heldDirection.indexOf(dir) === -1) {
        this.heldDirection.unshift(dir);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = this.keys[e.code];
      const index = this.heldDirection.indexOf(dir);
      if (index > -1) {
        this.heldDirection.splice(index, 1);
      }
    });
  }
}
