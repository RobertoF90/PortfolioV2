const btn = document.querySelector(".btn");
const container = document.querySelector(".container--jokes");
const setup = document.querySelector(".setup");
const delivery = document.querySelector(".delivery");

const getJoke = async function () {
  const joke = await (
    await fetch("https://v2.jokeapi.dev/joke/Christmas")
  ).json();
  console.log(joke);
  buildJoke(joke);
};

buildJoke = function (joke) {
  setup.textContent = `${joke.setup}`;
  delivery.textContent = `${joke.delivery}`;
};

btn.addEventListener("click", getJoke);
