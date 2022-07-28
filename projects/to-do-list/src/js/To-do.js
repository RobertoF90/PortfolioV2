class Todo {
  constructor(config = []) {
    // console.log(this);
    this.id = config.id;
    this.text = config.text;
    this.startDate = config.startDate;
    this.startClass = config.startClass;
    this.endDate = config.endDate;
    this.endClass = config.endClass;
  }

  renderListItem(todoItem) {
    const markup = `
      <div data-id="${this.id}" class="list__element">
        <div class="list__element--content">
         <p class="list__text">${this.text}</p>
         <p class="list__time ${this.startClass}">${this.startDate}</p>
         <p class="list__time ${this.endClass}">${this.endDate}</p>
        </div>
        <button class="btn list__btn list__btn--del">X</button>
      </div>
      `;
    listContainer.insertAdjacentHTML("beforeend", markup);
  }

  addListElement(text) {
    if (this.startDate === "Start Date") {
      this.start = "";
      this.startClass = "empty";
    } else {
      this.start = startDate.textContent;
    }

    if (this.endDate === "End Date") {
      this.end = "";
      this.endClass = "empty";
    } else {
      this.end = endDate.textContent;
    }

    this.renderListItem();

    this.addDoneBtn();

    endDate.textContent = "End Date";
    inputField.value = "";

    // console.log(window.projects[`list${listId}`]);
  }

  addDoneBtn() {
    const listItems = document.querySelectorAll(".list__element");

    listItems.forEach((el) => {
      el.lastElementChild.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        deleteItem(e);
      });
    });
  }

  init(bool) {
    this.addListElement();
    if (bool) {
      window.projects
        .filter((val) => {
          return val.id == listId;
        })[0]
        .items.push(this);
    }
  }
}
