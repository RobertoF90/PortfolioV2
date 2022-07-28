const overlay = document.querySelector(".overlay");

const inputField = document.querySelector(".input-field");
const inputBtn = document.querySelector(".input-btn");
const listContainer = document.querySelector(".container__list");
const startDate = document.querySelector(".start-date-box");
const endDate = document.querySelector(".end-date-box");

const newProjectBtn = document.querySelector(".projects__add-btn");
const projectsContainer = document.querySelector(".projects__list");

let listId = 0;
let load = false;
let create = false;

// ------- PROJECTS

function renderTodoList() {
  window.projects
    .filter((val) => {
      return val.id === listId;
    })[0]
    .items.forEach((listItem) => {
      const todo = new Todo({
        id: listItem.id,
        text: listItem.text,
        startDate: listItem.startDate,
        startClass: listItem.startClass,
        endDate: listItem.endDate,
        endClass: listItem.endClass,
      });
      todo.init();
    });
}

function projectBtnClass(btn) {
  document.querySelectorAll(".projects__item--btn").forEach((el) => {
    el.classList.add("hidden");
  });
  btn.lastElementChild.classList.remove("hidden");
}

function createProjectList() {
  document.querySelectorAll(".projects__item--project").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      clearList();
      const target = e.target.parentElement;

      projectBtnClass(target);
      const id = target.dataset.id;
      listId = id;

      renderTodoList();
    });
  });
}

newProjectBtn.addEventListener("click", () => {
  create = true;
  const project = new Project({
    id: (Date.now() + "").slice(-10),
    name: "New Project",
  });
  // console.log(project);
  project.init(projectsContainer);
  createProjectList();
  saveData();
  create = false;
});

// ------- TO DO LIST

//-- CREATE

function createItem(e) {
  if (window.projects.length === 0) return;

  const todo = new Todo({
    id: (Date.now() + "").slice(-10),
    text: inputField.value,
    startDate: startDate.innerText,
    startClass: true,
    endDate: endDate.textContent,
    endClass: true,
  });
  // console.log(window.projects);

  todo.init(true);
  calendar.updateDays();
  saveData();
}

//-- Delete

function deleteItem(e) {
  const element = e.target.parentElement;
  element.remove();

  window.projects.filter((val) => {
    return val.id === listId;
  })[0].items = window.projects
    .filter((val) => {
      return val.id === listId;
    })[0]
    .items.filter((item) => {
      return item.id !== element.dataset.id;
    });

  calendar.updateDays();

  saveData();
}

function clearList() {
  document.querySelectorAll(".list__element").forEach((el) => {
    el.remove();
  });
}

inputBtn.addEventListener("click", createItem);

inputField.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createItem();
  }
  return;
});

// ------- SAVE

const saveData = function () {
  console.log("Data saved as:", window.projects);
  localStorage.setItem("todo-list", JSON.stringify(window.projects));
};

// ------- LOAD

const loadData = function () {
  const data = JSON.parse(localStorage.getItem("todo-list"));

  if (!data) return;
  console.log("data loaded as: ", data);
  load = true;

  Object.values(data).forEach((project, i) => {
    window.projects[i] = project;
    let projects = new Project(project);
    projects.init(projectsContainer);
  });
  if (window.projects.length === 0) return;

  listId = data[0].id;

  // DANGER ZONE ?!?!??!!?!?
  window.projects.pop();
  // FIND WHY!

  // console.log(window.projects);

  createProjectList();
  projectBtnClass(document.querySelector(".projects__list--item"));

  Object.values(data[0].items).forEach((listItem) => {
    const todo = new Todo({
      id: listItem.id,
      text: listItem.text,
      startDate: listItem.startDate,
      startClass: listItem.startClass,
      endDate: listItem.endDate,
      endClass: listItem.endClass,
    });
    todo.init();
  });

  load = false;
};
loadData();

// ------- CALENDAR
const date = Date.now();
const calendar = new Calendar(date);

function createCalendar(box) {
  calendar.init();
  // const calendar = new Calendar(date, box);
  // const container = box;
  // calendar.init(container);
}

createCalendar();

// endDate.addEventListener("click", function (e) {
//   createCalendar(e.target);
//   e.stopPropagation();
// });
// startDate.addEventListener("click", function (e) {
//   createCalendar(e.target);
//   e.stopPropagation();
// });

// const resetBtn = document
//   .querySelector(".reset-btn")
//   .addEventListener("click", () => {
//     localStorage.removeItem("todo-list");
//     location.reload();
//   });
