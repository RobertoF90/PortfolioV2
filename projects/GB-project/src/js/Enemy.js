class Enemy extends GameObject {
  constructor(config) {
    super(config);

    this.x = getRandomNum(5, canvas.width - 5);
    this.y = -10;
    this.width = 16;
    this.height = 16;

    this.animated = true;
    this.type = config.type;
  }

  draw() {
    this.sprite.draw();
    // initial animation
    if (this.sprite.loaded) {
      if (this.y < 0 && ticking % 3 === 0) {
        this.y++;
      }
      if (this.y === 0 && this.animated) {
        this.animated = false;
        setTimeout(() => {
          this.animate();
          this.animated = true;
        }, 300);
      }
    }
  }

  delete(enemy) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particles(enemy));
    }

    activeEnemies = activeEnemies.filter((e) => {
      return e.id !== enemy.id;
    });

    p1.xp += 5;
  }

  shoot() {
    if (this.type === "easy") {
      let projectile = new Projectile({
        type: this.type,
        x: this.x + this.width / 2,
        y: this.y + this.height + 1,
        width: 2,
        height: 3,
        projectileDirection: 1,
        who: "enemy",
      });
      enemyProjectiles.push(projectile);
    } else if (this.type === "normal") {
      let space = -1;

      for (let i = 0; i < 3; i++) {
        let projectile = new Projectile({
          type: this.type,

          x: this.x + this.width / 2 + i * space,
          y: this.y + this.height + 1,
          width: 1,
          height: 1,
          projectileDirection: 1,
          projectileDirectionX: i - 1,
          who: "enemy",
        });
        enemyProjectiles.push(projectile);
      }
    }
  }

  animate() {
    const behavior = getRandomNum(1, 100);
    let free = true;
    if (behavior <= 100 && behavior >= 80) {
      // MOVE LEFT

      if (this.x > 0 + this.width) {
        activeEnemies.forEach((en) => {
          if (this.x - 2 <= en.x + en.width - 5 && this.x - 2 >= en.x + 5) {
            free = false;
          }
        });
        if (free) {
          this.x -= 2;
        }
      }
    } else if (behavior <= 79 && behavior >= 59) {
      if (this.x < canvas.width - this.width) {
        activeEnemies.forEach((en) => {
          if (
            this.x + this.width + 2 <= en.x + en.width - 5 &&
            this.x + this.width + 2 >= en.x + 5
          ) {
            free = false;
          }
        });

        if (free) {
          this.x += 2;
        }
      }
    } else if (behavior <= 15 && behavior >= 1) {
      this.shoot();
    }
  }

  update() {
    this.draw();
  }
}
