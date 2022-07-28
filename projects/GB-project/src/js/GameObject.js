class GameObject {
  constructor(config) {
    this.id = Date.now() + "";
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.direction = config.direction;

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "src/img/pg1-sheet.png",
    });

    this.scene = config.scene || [];
    this.sceneType = config.type || "";

    this.sceneIndex = 0;
  }

  async playScene() {
    let sceneConfig = this.scene[this.sceneType][this.sceneIndex];

    const sceneToPlay = new Scene({
      type: this.sceneType,
      text: sceneConfig.text,
    });
    await sceneToPlay.init();

    this.sceneIndex++;
    if (this.sceneIndex === this.scene[this.sceneType].length) {
      this.sceneIndex = 0;

      scene = false;
    } else {
      this.playScene();
    }
  }

  startScene() {
    setTimeout(() => {
      this.playScene();
    }, 10);
  }
}
