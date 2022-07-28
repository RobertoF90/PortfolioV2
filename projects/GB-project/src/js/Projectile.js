class Projectile extends GameObject {
  constructor(config) {
    super(config);

    this.direction = config.projectileDirection;
    this.directionX = config.projectileDirectionX || 0;
    this.type = config.type;
    this.who = config.who;
  }

  draw() {
    if (this.type === "easy") {
      ctx.fillStyle = "#081820";
      ctx.fillRect(this.x, this.y, this.width, this.height);

      // let speed = 2;
      // let dx = this.x - p1.x;
      // let dy = this.y - p1.y;
      // let distance = Math.sqrt(dx * dx + dy * dy);
      // let moves = distance / speed;
      // let xunits = (p1.x - this.x) / moves;
      // let yunits = (p1.y - this.y) / moves;
      // this.x += xunits;
      // this.y += yunits;

      this.y += this.direction;
    } else if (this.type === "normal") {
      ctx.fillStyle = "#081820";
      ctx.fillRect(this.x, this.y, this.width, this.height);

      this.y += this.direction;
      this.x += this.directionX;
    }

    this.checkCollision();

    if (this.y <= 0 || this.y > canvas.height) {
      this.delete();
    }
  }

  delete() {
    if (this.who === "player") {
      projectiles = projectiles.filter((p) => {
        return p.id !== this.id;
      });
    }
    if (this.who === "enemy") {
      enemyProjectiles = enemyProjectiles.filter((p) => {
        return p.id !== this.id;
      });
    }
  }

  update() {
    this.draw();
  }

  checkCollision() {
    activeEnemies.forEach((enemy) => {
      if (
        this.y <= enemy.y + enemy.height - 5 &&
        this.y >= enemy.y &&
        this.x <= enemy.x + enemy.width - 5 &&
        this.x >= enemy.x + 5
      ) {
        enemy.delete(enemy);
        this.delete();
        if (projectiles.length === 0) {
          shooting = false;
        }
      }
    });
    backgroundObjects.forEach((obj) => {
      if (
        this.y <= obj.y + obj.height &&
        this.y >= obj.y &&
        this.x <= obj.x + obj.width &&
        this.x >= obj.x
      ) {
        if (this.who === "player") {
          console.log(background.tileMap[obj.mapPosition]);
          if (background.tileMap[obj.mapPosition] === 14) {
            background.tileMap[obj.mapPosition] = 15;
          } else if (background.tileMap[obj.mapPosition] === 30) {
            background.tileMap[obj.mapPosition] = 1;
          } else {
            background.tileMap[obj.mapPosition] = 30;
          }
          this.delete();
        }
      }
    });

    if (
      this.y >= p1.y &&
      this.y <= p1.y + p1.height &&
      this.x <= p1.x + p1.width &&
      this.x >= p1.x
    ) {
      p1.damage(this.type, false);
      this.delete();
    }
  }
}
