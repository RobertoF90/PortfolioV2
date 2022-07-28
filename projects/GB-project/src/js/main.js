// #e0f8d0
// #88c070
// #346856
// #081820

let devmode = true;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 160;
canvas.height = 144;
let backgroundObjects = [];
let backgroundObjectsStored = [];

let background;

let camera;

async function drawBackground() {
  background = new Background();
  await background.loadMap();

  camera = new Camera({
    x: 0,
    y: (background.tileMap.length / 10) * 16 - canvas.height,
    width: 172,
    height: 144,
  });
  background.init();
}

let p1;

function createPlayer() {
  p1 = new Player({
    width: 16,
    height: 16,
    x: canvas.width / 2 - 8,
    y: canvas.height - 16,
    src: 'src/img/pg1-sheet.png',
    hp: 100,
    mp: 100,
    xp: 0,
  });
}

let shooting = false;
let cutscene = false;

let projectiles = [];
let enemyProjectiles = [];

let particles = [];

function updateParticles() {
  particles.forEach((p) => {
    p.draw();
  });
}

function createProjectile() {
  let projectile = new Projectile({
    x: p1.x + p1.width / 2,
    y: p1.y - 1,
    width: 1,
    height: 2,
    projectileDirection: -1,
    type: 'easy',
    who: 'player',
  });
  projectiles.push(projectile);
}

function updateProjectile() {
  projectiles.forEach((p) => {
    p.draw();
    // if (enemies.length > 0) {
    //   p.checkCollision();
    // }
  });
}

let enemies = [];
let activeEnemies = [];

function updateEnemies() {}

let ticking = 0;
let frame = 0;

let stage = 0;
let gameEnd = false;

let scene;

let gameStage;
let level;

async function createLevel() {
  level = await fetch('./src/json/level.json').then((res) => res.json());
  gameStage = Object.values(level);
}

async function init() {
  createPlayer();
  controls = new DirectionInput();
  controls.init();

  await drawBackground();
  await createLevel();
  enemies = gameStage[stage].enemies;

  // scene = new GameObject({
  //   type: "stage",
  //   scene: gameStage[stage].scenes,
  // });
  // await scene.startScene();

  main();
  backgroundObjectsStored = backgroundObjects;
}

const portrait = document.querySelector('.portrait__img');
let portraitN = 1;

function updatePortrait() {
  portrait.src = `./src/img/portrait4-${portraitN}.png`;
  portraitN += 1;
  if (portraitN === 3) {
    portraitN = 1;
  }
}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background.update();

  p1.update({
    input: controls.direction,
  });
  if (particles.length > 0) {
    updateParticles();
  }

  if (ticking % 10 === 0) {
    camera.update();
  }
  // updatePortrait();
  if (ticking % 30 === 0) {
    frame++;
    // updatePortrait();

    if (frame === 4) {
      frame = 0;
    }
  }

  if (ticking % 10 === 0 && p1.mp < 100) {
    p1.mp += 2;
  }

  if (!scene || devmode) {
    if (enemies.length > 0 && activeEnemies.length < 4) {
      enemies.forEach((en) => {
        console.log('creating enemy');
        let enemy = new Enemy({
          type: en.type,
          src: en.src,
        });
        activeEnemies.push(enemy);
        en.number--;
      });
      enemies = enemies.filter((en) => {
        return en.number > 0;
      });
    }

    if (enemies.length === 0 && activeEnemies.length === 0) {
      stage++;

      if (stage === gameStage.length) {
        scene = new GameObject({
          type: 'win',
          scene: gameStage[0].scenes,
        });
        scene.startScene();
      } else if (stage < gameStage.length) {
        scene = new GameObject({
          type: 'stage',
          scene: gameStage[stage].scenes,
        });
        enemies = gameStage[stage].enemies;

        scene.startScene();
      }
    }

    if (activeEnemies.length > 0) {
      activeEnemies.forEach((e) => {
        e.update();
      });
    }
  }

  if (enemyProjectiles.length > 0) {
    enemyProjectiles.forEach((ep) => {
      ep.update();
    });
  }

  if (shooting) {
    updateProjectile();
  }
  backgroundObjects.forEach((obj) => {
    obj.checkCollision();
  });

  backgroundObjects = [];

  if (!gameEnd) {
    requestAnimationFrame(main);
  }

  ticking++;
}

let controls;

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    shoot();
  }
});

function shoot() {
  // shots++;
  // updateShots();
  if (p1.mp >= 5) {
    p1.mp -= 5;
    shooting = true;
    createProjectile();
  }
}

document.addEventListener('click', shoot);

init();
