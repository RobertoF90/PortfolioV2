class TextMessage {
  constructor(text, onComplete) {
    this.text = text;
    this.element = null;

    this.onComplete = onComplete;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("text-message");
    this.element.innerHTML = `
    <p>
    ${this.text}
    </p>
    `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.element.addEventListener("animationend", () => {
      this.element.remove();
      this.onComplete();
    });
  }
}
