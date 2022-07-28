class Scene {
  constructor(config) {
    this.type = config.type;
    this.text = config.text;
    this.element = null;

    // this.scene = config.sceneConfig;
    // console.log(this.scene);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("test");

    this.element.innerHTML = `
    <p class="text">${this.text}</p>
    `;
  }

  stage(resolve) {
    const container = document.querySelector(".text-box-top");
    const message = new TextMessage(`${this.text}`, resolve);
    message.init(container);
  }

  win(resolve) {
    const container = document.querySelector(".text-box-top");
    const message = new TextMessage(`${this.text}`, resolve);

    message.init(container);
  }

  lose(resolve) {
    const container = document.querySelector(".text-box");

    const message = new TextMessage(`${this.text}`, resolve);
    gameEnd = true;
    message.init(container);
  }

  init() {
    return new Promise((resolve) => {
      this[this.type](resolve);
    });
  }
}
