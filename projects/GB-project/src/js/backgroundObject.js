class BackgroundObject extends GameObject {
  constructor(config) {
    super(config);
    this.mapPosition = config.mapPosition;
    this.hp = 3;
  }

  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }

  checkCollision() {
    if (
      this.top > p1.bottom ||
      this.right < p1.left ||
      this.bottom < p1.top ||
      this.left > p1.right
    ) {
      return false;
    }
    p1.y++;
    if (p1.y + p1.height >= canvas.height + p1.height / 2) {
      p1.damage(false, true);
    }
  }
}
