document.querySelector('button').addEventListener('click', getFetch);
drinkContainer = document.querySelector('.container__drinks');
containerApp = document.querySelector('.container');

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function getDrink(e) {
  // document.querySelector('.cocktail__ingredients').innerHTML = '';
  const choice = e.target.closest('div').dataset.id;
  fetch(url + choice)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const { drinks } = data;
      const drink = drinks[0];

      document.querySelector('.hidden').classList.remove('hidden');

      document.querySelector('.intro').classList.add('hidden');

      document.querySelector('.cocktail__name').innerText = drink.strDrink;

      document.querySelector('.cocktail__img').src = drink.strDrinkThumb;

      const ingredients = [];
      const measures = [];

      for (let i = 1; i < 10; i++) {
        let ingr = 'strIngredient' + i;
        let meas = 'strMeasure' + i;
        if (drink[ingr] !== null) {
          ingredients.push(drink[ingr]);
          measures.push(drink[meas]);
        } else {
          break;
        }
      }

      document.querySelector('.cocktail__ingredients').innerHTML = `
      <p class="ingredients__title">Cocktail Ingredients</p>
      <div class="ingredients__container"></div>
      `;
      ingredients.forEach((ing, i) => {
        document.querySelector('.ingredients__container').insertAdjacentHTML(
          'beforeend',
          `
          <div class="ingredients">

          <p class="ingredient">${ing}</p>
          <p class="measure">${measures[i] ? measures[i] : ''}</p>
          </div>
          
          `
        );
      });

      document.querySelector('.cocktail__instructions').innerHTML = `
      <p class="ingredients__title">Cocktail Instructions</p>
      <p>
      ${drink.strInstructions}
      </p>
      `;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getFetch() {
  const choice = document.querySelector('input').value;

  fetch(url + choice)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      const { drinks } = data;
      drinkContainer.innerHTML = '';
      drinks.forEach((drink) => {
        drinkContainer.insertAdjacentHTML(
          'beforeend',
          `
          <div class="drink" data-id="${drink.strDrink}">
            <img src="${drink.strDrinkThumb}" alt="" />
            <p>${drink.strDrink}</p>
          </div>
        `
        );
      });

      document
        .querySelectorAll('.drink')
        .forEach((el) => el.addEventListener('click', getDrink));
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

const hideDrinksBtn = document.querySelector('.container__drinks--btn');

function hideDrinks(e) {
  drinkContainer.classList.toggle('active');
  containerApp.classList.toggle('active');
  hideDrinksBtn.classList.toggle('active');
}

hideDrinksBtn.addEventListener('click', hideDrinks);

console.log(hideDrinksBtn);
