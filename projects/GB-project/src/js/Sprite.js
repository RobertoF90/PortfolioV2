class Sprite {
  constructor(config) {
    this.gameObject = config.gameObject;
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw() {
    this.loaded &&
      ctx.drawImage(
        this.image,
        frame * 16,
        16,
        this.gameObject.width,
        this.gameObject.height,
        this.gameObject.x,
        this.gameObject.y,
        16,
        16
      );
  }
}
