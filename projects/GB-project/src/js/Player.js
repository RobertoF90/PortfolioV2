class Player extends GameObject {
  constructor(config) {
    super(config);

    this.hp = config.hp;
    this.mp = config.mp;
    this.xp = config.xp;

    this.directionUpdate = {
      up: -1,
      left: -1,
      right: 1,
      down: 1,
    };
  }

  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x + 6;
  }
  get right() {
    return this.x + this.width - 6;
  }
  get top() {
    return this.y + 6;
  }

  update(data = "") {
    let inputOne = data.input[0];
    let inputTwo = data.input[1];
    if (inputOne) {
      if (inputOne === "up" || inputOne === "down") {
        p1.y += this.directionUpdate[inputOne];
      }
      if (inputOne === "left" || inputOne === "right") {
        p1.x += this.directionUpdate[inputOne];
      }
      if (inputTwo) {
        if (inputTwo === "up" || inputTwo === "down") {
          p1.y += this.directionUpdate[inputTwo];
        }
        if (inputTwo === "left" || inputTwo === "right") {
          p1.x += this.directionUpdate[inputTwo];
        }
      }
    }

    // stats
    hpContainer.forEach((rect) => {
      rect.style.width = `${this.hp}%`;
    });

    mpContainer.forEach((rect) => {
      rect.style.width = `${this.mp}%`;
    });

    xpContainer.forEach((rect) => {
      rect.style.width = `${this.xp}%`;
    });

    this.sprite.draw();
  }

  damage(projectile, bkObj) {
    if (projectile === "easy") {
      p1.hp -= 5;
    }
    if (projectile === "normal") {
      p1.hp -= 10;
    }

    if (bkObj) {
      p1.hp = 0;
    }

    if (p1.hp <= 0) {
      p1.hp = 0;
      // p1.update();

      scene = new GameObject({
        type: "lose",
        scene: gameStage[stage].scenes,
      });
      scene.startScene();
    }
  }
}
