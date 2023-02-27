//////////////////////////////
// Smooth scrolling

const ctaBtn = document.querySelectorAll(".btn--cta");
const toTopBtn = document.querySelector(".go-to-top");
const ctaParagraph = document
  .querySelector(".paragraph--cta")
  .addEventListener("click", scrollCta);

ctaBtn.forEach((b) => b.addEventListener("click", scrollCta));

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

let pageHeight = window.innerHeight;

window.addEventListener("scroll", (e) => {
  if (visualViewport.pageTop > 350) {
    toTopBtn.classList.remove("hidden");
  } else {
    toTopBtn.classList.add("hidden");
  }
});

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
  document.querySelector(".mobile__menu").classList.remove("active");
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

// DARKMODE

const darkModeBtn = document.querySelectorAll(".btn--darkmode");

darkModeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dark = [...document.styleSheets].filter((s) => {
      return s.href?.split("/").includes("darkmode.css");
    });
    dark[0].disabled = !dark[0].disabled;

    checkDarkMode();
  });
});

const checkDarkMode = function () {
  darkModeBtn.forEach((btn) => {
    if ([...btn.classList].includes("active")) {
      btn.firstElementChild.src = "./src/img/icons/dark-mode/sun.png";
      // btn.style.backgroundColor = "rgb(255, 255, 255)";

      btn.classList.remove("active");
    } else {
      btn.firstElementChild.src = "./src/img/icons/dark-mode/moon.png";
      // btn.style.backgroundColor = "rgb(13, 71, 125)";
      btn.classList.add("active");
    }
  });
};

checkDarkMode();

// MOBILE MENU

const mobileMenuBtn = document.querySelector(".mobile__btn");

const mobileMenu = function () {
  document.querySelector(".mobile__menu").classList.toggle("active");
};

mobileMenuBtn.addEventListener("click", mobileMenu);
