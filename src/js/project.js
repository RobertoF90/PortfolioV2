class Project {
  constructor(id) {
    this.projects = [];
    this.project;
  }

  async getProjects(id) {
    let res = await fetch(`./src/json/${id}.json`);
    let projectsData = await res.json();
    Object.values(projectsData).forEach((p) => this.projects.push(p));
  }

  renderProject(id) {
    if (!id) {
      this.project = this.projects[0];
    } else {
      [this.project] = this.projects.filter(
        (p) => this.createId(p.title) === id
      );
    }

    let markup = `
  
      <div class="container__projects--showcase">
        <h2 class="project__showcase--title">${this.project.title}</h2>

        <div class="showcase__project">
          <div class="project__intro">
            <p class="project__intro--text">${this.project.intro.text}</p>
            <div>
              <a class="project__intro--link" href="#">${this.project.intro.link}</a>
            </div>
            <div>
              <div class="bold">Stack:</div>
              <p class="project__intro--stack">
                ${this.project.description.stack}
              </p>
            </div>
            <div>
              <div class="bold">Version:</div>
              <p class="project__intro--version">${this.project.description.version}</p>
            </div>
          </div>

          <div class="project__img--zoomed">
            <img src='${this.project.img.src}' class="zoomed__img" />
          </div>
        </div>

        <!-- IMPLEMENTED FEATURES  -->

        <div class="features__container">
          <h3>Features implemented:</h3>
          <div class="implemented-features__lists"></div>
        </div>

        <!-- FEATURES TO IMPLEMENT -->

        <div class="features__container">
          <h3>Work-in-progress Features:</h3>
          <div class="to-implement-features__lists"></div>
        </div>

        <p class="feedback">Do you want to provide any feedback?</p>
        <p class="feedback">
          Please feel free to contact me on any social platform or through
          the form below!
        </p>
      </div>


    `;

    document
      .querySelector(".container__projects")
      .insertAdjacentHTML("afterbegin", markup);

    let featuresImplemented = Object.values(this.project.implemented);

    // Crashes if no value are inserted in "to implement"
    let featuresToImplement = Object.values(this.project.toImplement);

    let implementedContainer = document.querySelector(
      ".implemented-features__lists"
    );
    let toImplementContainer = document.querySelector(
      ".to-implement-features__lists"
    );

    this.createLists(featuresImplemented, implementedContainer);
    this.createLists(featuresToImplement, toImplementContainer);
  }

  createLists(features, container) {
    container.innerHTML = "";
    features.forEach((item) => {
      let element = document.createElement("div");

      element.insertAdjacentHTML(
        "beforeend",
        `
      <p class="feature__title">${item.title}</p>
    `
      );

      item.items.forEach((f, i) => {
        element.insertAdjacentHTML(
          "beforeend",
          `
      <li class="feature__list--item">${item.items[i]} </li>
      `
        );
      });
      container.insertAdjacentElement("beforeend", element);
    });
  }

  createNavigation() {
    document
      .querySelector(".container__projects")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="project__card-container"></div>'
      );

    let projectCards = document.querySelector(".project__card-container");

    this.projects.forEach((p) => {
      projectCards.insertAdjacentHTML(
        "beforeend",
        `
      <div class="project__card" data-id=${this.createId(p.title)}>
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

  addNavigationEvents() {
    document.querySelectorAll(".project__card").forEach((p) =>
      p.addEventListener("click", (e) => {
        document.querySelector(".container__projects--showcase").remove();
        this.renderProject(e.target.closest("div").dataset.id);
      })
    );
  }

  createId(text) {
    return text.toLowerCase().split(" ").join("");
  }

  async init(id) {
    await this.getProjects(id);

    const projects = document.querySelector(".section__projects");
    if (projects?.dataset.id === id) {
      return;
    }

    projects?.remove();
    document
      .querySelectorAll(".section__home")
      .forEach((s) => s.classList.add("hidden"));

    document.querySelector(".main").insertAdjacentHTML(
      "afterbegin",
      ` 
    <section class="section section__projects" data-id="${id}">
      <div class="container__projects">
    
      </div>
    </section>
    `
    );

    this.renderProject();
    this.createNavigation();
    this.addNavigationEvents();
  }
}
