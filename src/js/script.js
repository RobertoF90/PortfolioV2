//////////////////////////////
// Smooth scrolling

const ctaBtn = document.querySelector(".btn--cta");
const toTopBtn = document.querySelector(".go-to-top");
const ctaParagraph = document
  .querySelector(".paragraph--cta")
  .addEventListener("click", scrollCta);

ctaBtn.addEventListener("click", scrollCta);
toTopBtn.addEventListener("click", scrollTop);

function scrollCta(e) {
  e.preventDefault();
  document
    .querySelector(".section__cta")
    .scrollIntoView({ behavior: "smooth" });
  toTopBtn.classList.remove("hidden");
}

function scrollTop(e) {
  e.preventDefault();
  document.querySelector("body").scrollIntoView({ behavior: "smooth" });
}

// Home animation

const latestCards = document.querySelectorAll(".latest__card");
const latestCardText = document.querySelector(".latest__card--text");

latestCards.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    e.target.parentElement.lastElementChild.classList.add("visible");
  });
});

latestCards.forEach((el) => {
  el.addEventListener("mouseout", (e) => {
    e.target.parentElement.lastElementChild.classList.remove("visible");
  });
});

// SECTIONS NAVIGATION

const navLinks = document.querySelectorAll(".nav__btn");
const sections = document.querySelectorAll(".section");

navLinks.forEach((el) => {
  el.addEventListener("click", navigation);
});

function navigation(e) {
  if (e.target.dataset.id === "cta") {
    return;
  }

  if (e.target.dataset.id === "home") {
    document.querySelector(".section__projects")?.remove();
    document
      .querySelectorAll(".section__home")
      .forEach((s) => s.classList.remove("hidden"));
  }

  if (
    e.target.dataset.id === "projects" ||
    e.target.dataset.id === "websites"
  ) {
    let projects = new Project();
    projects.init(e.target.dataset.id);
  }
}

let pageHeight = window.innerHeight;

window.addEventListener("scroll", (e) => {
  if (visualViewport.pageTop > 350) {
    toTopBtn.classList.remove("hidden");
  } else {
    toTopBtn.classList.add("hidden");
  }
});

// DARKMODE

const darkModeBtn = document.querySelector(".btn--darkmode");

darkModeBtn.addEventListener("click", () => {
  const dark = [...document.styleSheets].filter((s) => {
    return s.href?.split("/").includes("darkmode.css");
  });
  dark[0].disabled = !dark[0].disabled;

  checkDarkMode();
});

const checkDarkMode = function () {
  if ([...darkModeBtn.classList].includes("active")) {
    darkModeBtn.firstElementChild.src = "./src/img/icons/dark-mode/sun.png";
    // darkModeBtn.style.backgroundColor = "rgb(255, 255, 255)";

    darkModeBtn.classList.remove("active");
  } else {
    darkModeBtn.firstElementChild.src = "./src/img/icons/dark-mode/moon.png";
    // darkModeBtn.style.backgroundColor = "rgb(13, 71, 125)";
    darkModeBtn.classList.add("active");
  }
};

checkDarkMode();
