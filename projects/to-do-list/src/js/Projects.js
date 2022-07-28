class Project {
  constructor(config) {
    // console.log(config);
    this.id = config.id || 0;
    this.name = config.name;

    // this.todoList = config.todoList || {};
  }

  createProject() {
    this.element = document.createElement("li");
    this.element.classList.add("projects__list--item");
    // console.log(this.id);
    this.element.dataset.id = this.id;
    if (load) {
      console.log("loading...");
    }
    if (create) {
      console.log("creating");
    }

    window.projects.push({
      id: this.id,
      name: this.name,
      items: [],
    });

    listId = this.element.dataset.id;
    // PAY CLOSE ATTENTION HERE!!!

    // GIVE NAME TO PROJECT AND FIX
    this.element.innerHTML = `
      <div class="projects__item--project"> ${this.name} </div>
      <button class="projects__item--btn hidden">...</button>
    `;

    this.addProjectsBtn(this.element);

    clearList();
    // console.log(window.projects);
  }

  createList() {
    this.clearList();
    window.projects[`list${Number(listId)}`].forEach((item) => {
      const todo = new Todo(item);
      todo.render();
      todo.addDoneBtn();
    });
  }

  addProjectsBtn(el) {
    // console.log(el);
    el.querySelector(".projects__item--btn").addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      // console.log(e.target.parentElement);
      this.projectMenu(e.target.parentElement);
      overlay.classList.remove("hidden");
      overlay.addEventListener("click", this.projectMenuClose);
    });
  }

  projectMenu(container) {
    this.element = document.createElement("div");
    this.element.classList.add("project__menu");
    this.element.innerHTML = `
    <ul class="project__menu--list">
      <li class="project__menu--list-item" data-option="rename"> Rename </li>
      <li class="project__menu--list-item" data-option="delete"> Delete </li>
    </ul>
    `;

    container.appendChild(this.element);

    this.element.querySelectorAll(".project__menu--list-item").forEach((el) => {
      el.addEventListener("click", (e) => {
        this.projectMenuOptions(e.target.dataset.option);
      });
    });
  }

  projectMenuClose() {
    document.querySelector(".project__menu").remove();

    overlay.classList.add("hidden");
  }

  projectMenuOptions(option) {
    if (option === "rename") {
      this.projectMenuClose();

      let listElement;

      document.querySelectorAll(".projects__list--item").forEach((el) => {
        if (el.dataset.id === listId) listElement = el;
      });

      listElement.insertAdjacentHTML(
        "beforeend",
        `
        <div class="project__rename">

      <input type="text" class="project__rename--input" /> 
      <button class="btn-rename">Ok</button>
        </div>
      `
      );

      const input = document.querySelector(".project__rename--input");

      function renameProject(text) {
        let name;

        text.value ? (name = text.value) : (name = "New Project");

        window.projects.filter((val) => {
          return val.id === listId;
        })[0].name = name;
        listElement.firstElementChild.textContent = name;
        document.querySelector(".project__rename").remove();
        saveData();
      }

      input.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          renameProject(e.target);
        }
      });
      document.querySelector(".btn-rename").addEventListener("click", (e) => {
        renameProject(e.target.previousElementSibling);
      });

      input.focus();
    }
    if (option === "delete") {
      window.projects = window.projects.filter((val) => {
        return val.id !== listId;
      });

      this.element.parentElement.remove();
      this.element.remove();
      overlay.classList.add("hidden");

      clearList();

      if (window.projects.length > 0) {
        listId = window.projects[0].id;
        projectBtnClass(document.querySelector(".projects__list--item"));
        renderTodoList();
      } else {
        listId = 0;
      }

      calendar.updateDays();

      saveData();
    }
  }

  clearProjectList() {
    document.querySelectorAll(".projects__list--item").forEach((el) => {
      el.remove();
    });
  }

  init(container) {
    this.createProject();
    container.appendChild(this.element);
    projectBtnClass(this.element);
  }
}

window.projects = [];
// list1: {
//   id: 1,
//   name: "list1",
//   items: [
//     (item1 = {
//       id: 0,
//       text: "first to do list",
//       startDate: "",
//       startClass: false,
//       endDate: "",
//       endClass: false,
//     }),
//     (item2 = {
//       id: 1,
//       text: "second element first to do list",
//       startDate: "",
//       startClass: false,
//       endDate: "",
//       endClass: false,
//     }),
//   ],
// },
// list2: {
//   id: 2,
//   name: "list2",
//   items: [
//     (item1 = {
//       id: 0,
//       text: "second to do list",
//       startDate: "",
//       startClass: false,
//       endDate: "",
//       endClass: false,
//     }),
//   ],
// },
