class Particles {
  constructor(config) {
    this.id = Date.now() + getRandomNum(0, 100);

    this.x = config.x + config.width / 2;
    this.y = config.y + config.height / 2;
    this.width = config.width;
    this.height = config.height;

    this.dir = getRandomNum(1, 5);
  }

  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, 1, 1);
    this.update();
  }

  update() {
    if (this.dir === 1) {
      this.x += 1;
      this.y += 1;
    } else if (this.dir === 2) {
      this.x -= 1;
      this.y -= 1;
    } else if (this.dir === 3) {
      this.x += 1;
      this.y -= 1;
    } else if (this.dir === 4) {
      this.x -= 1;
      this.y += 1;
    }

    if (
      this.x > canvas.width ||
      this.x < -canvas.width ||
      this.y < -canvas.height ||
      this.y > canvas.height
    ) {
      this.delete();
    }
  }

  delete() {
    particles = particles.filter((p) => {
      return p.id !== this.id;
    });
  }

  init() {
    this.draw();
  }
}
