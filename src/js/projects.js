const containerProjects = document.querySelector('.container__projects');
const projectCards = document.querySelector('.project__card-container');
const projectTitle = document.querySelector('.project__showcase--title');
const projectIntroText = document.querySelector('.project__intro--text');
const projectLink = document.querySelector('.project__intro--link');
const projectStack = document.querySelector('.project__intro--stack');
const projectVersion = document.querySelector('.project__intro--version');
const zoomedImg = document.querySelector('.zoomed__img');
const projectDescription = document.querySelector('.project__description');
const implementedContainer = document.querySelector(
  '.implemented-features__lists'
);
const toImplementContainer = document.querySelector(
  '.to-implement-features__lists'
);

console.log(projectLink);

let projects = [];
let project;

async function getProjects() {
  let res = await fetch('./src/json/projects.json');
  let projectsData = await res.json();
  Object.values(projectsData).forEach((p) => projects.push(p));
}

function renderProject(id) {
  if (!id) {
    project = projects[0];
  } else {
    [project] = projects.filter((p) => createId(p.title) === id);
  }

  projectTitle.innerText = project.title;
  projectIntroText.innerText = project.intro.text;
  projectLink.href = project.intro.link;
  projectStack.innerText = project.description.stack;
  projectVersion.innerText = project.description.version;
  zoomedImg.src = project.img.src;

  let featuresImplemented = Object.values(project.implemented);

  // Crashes if no value are inserted in "to implement"
  let featuresToImplement = Object.values(project.toImplement);

  createLists(featuresImplemented, implementedContainer);
  createLists(featuresToImplement, toImplementContainer);
}

function createLists(features, container) {
  container.innerHTML = '';
  features.forEach((item) => {
    let element = document.createElement('div');

    element.insertAdjacentHTML(
      'beforeend',
      `
    <p class="feature__title">${item.title}</p>
  `
    );

    item.items.forEach((f, i) => {
      element.insertAdjacentHTML(
        'beforeend',
        `
    <li class="feature__list--item">${item.items[i]} </li>
    `
      );
    });
    container.insertAdjacentElement('beforeend', element);
  });
}

function createNavigation() {
  projects.forEach((p) => {
    projectCards.insertAdjacentHTML(
      'beforeend',
      `
      <div class="project__card" data-id=${createId(p.title)}>
      <img
      class="project__img"
      src=${p.img.src}
      alt=${p.img.alt}
      />
      
    </div>
    `
    );
  });
}

function addNavigationEvents() {
  document.querySelectorAll('.project__card').forEach((p) =>
    p.addEventListener('click', (e) => {
      renderProject(e.target.closest('div').dataset.id);
    })
  );
}

function createId(text) {
  return text.toLowerCase().split(' ').join('');
}

async function init() {
  await getProjects();
  createNavigation();
  addNavigationEvents();
  renderProject();
}

init();
