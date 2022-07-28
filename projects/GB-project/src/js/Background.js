class Background {
  constructor(config) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.tileSize = 16;
    this.columns = 10;
    this.rows = 20;
  }

  draw() {
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < camera.xMax; x++) {
      for (let y = 0; y < camera.yMax; y++) {
        let tileX = x * this.tileSize - camera.x;
        let tileY = y * this.tileSize - camera.y;
        let valueX = this.tileMap[y * this.columns + x];

        // CREATE OBSTACLES
        this.createObstacles(valueX, tileX, tileY, x, y);

        // DRAW BACKGROUND
        let valueY = Math.floor(valueX / 8);
        if (valueY > 0) {
          valueX -= valueY * 8;
        }

        ctx.drawImage(
          this.mapSheet,
          valueX * this.tileSize - 16,
          valueY * 16,
          this.tileSize,
          this.tileSize,
          tileX,
          tileY,
          16,
          16
        );
        // backgroundObjects.forEach((el) => {
        //   ctx.fillStyle = "red";
        //   ctx.fillRect(el.x, el.y, 16, 16);
        // });
      }
    }
  }

  createObstacles(valueX, tileX, tileY, x, y) {
    let objNum = [11, 12, 13, 14, 19, 20, 21, 27, 28, 29, 30];

    if (objNum.includes(valueX)) {
      const obstacle = new BackgroundObject({
        x: tileX,
        y: tileY,
        width: 16,
        height: 16,
        mapPosition: y * this.columns + x,
      });
      backgroundObjects.push(obstacle);
    }
  }

  update() {
    this.draw();
  }

  async loadMap() {
    this.mapSheet = new Image();
    this.mapSheet.src = 'src/img/map1_sheet.png';
    // FIND A WAY TO READ MULTIPLE LINES

    const map = await fetch('./src/json/map.json').then((res) => res.json());
    this.tileMap = map.tileMap;
  }

  init() {
    this.tilesW = canvas.width / this.tile;
    this.tilesH = camera.yMax;
    this.draw();
  }
}
