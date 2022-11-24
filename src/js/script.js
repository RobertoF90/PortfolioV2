//////////////////////////////
// Smooth scrolling

const ctaBtn = document.querySelector(".btn--cta");
const toTopBtn = document.querySelector(".go-to-top");

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

  let sec = [...sections].filter((s) => {
    return s.dataset.id === e.target.dataset.id;
  });

  sections.forEach((s) => {
    s.classList.add("hidden");
  });

  navLinks.forEach((l) => {
    l.classList.remove("active");
  });

  e.target.classList.add("active");

  sec.forEach((s) => {
    s.classList.remove("hidden");
  });
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
  document.styleSheets[4].disabled = !document.styleSheets[4].disabled;

  checkDarkMode();
});

const checkDarkMode = function () {
  if ([...darkModeBtn.classList].includes("active")) {
    darkModeBtn.firstElementChild.src = "./src/img/icons/dark-mode/sun.png";
    darkModeBtn.style.backgroundColor = "rgb(255, 255, 255)";

    darkModeBtn.classList.remove("active");
  } else {
    darkModeBtn.firstElementChild.src = "./src/img/icons/dark-mode/moon.png";
    darkModeBtn.style.backgroundColor = "rgb(13, 71, 125)";
    darkModeBtn.classList.add("active");
  }
};

checkDarkMode();
