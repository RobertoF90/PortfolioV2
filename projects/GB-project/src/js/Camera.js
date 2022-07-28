class Camera {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.height = config.height;
    this.width = config.width;
    this.xMin = Math.floor(this.x / 16);
    this.yMin = Math.floor(this.y / 16);
    this.xMax = Math.ceil((this.x + this.height) / 16);
    this.yMax = Math.ceil((this.y + this.height) / 16);
  }

  update() {
    if (this.y > 0) {
      this.y -= 1;
    }
    this.xMin = Math.floor(this.x / 16);
    this.yMin = Math.floor(this.y / 16);
    this.xMax = Math.ceil((this.x + this.width) / 16);
    this.yMax = Math.ceil((this.y + this.height) / 16);
  }
}
