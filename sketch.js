var player, playerImg;
var enemy, enemyImg, enemyGroup;
var bullet;
var bulletCount = 0;
var lifeCount = 10;
var isAlive = true;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score = 0;

function preload() {
  playerImg = loadImage("Player.png");
  enemyImg = loadImage("enemy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createSprite(width/8, height/2, 20, 80);
  //player.debug = true;
  player.addImage(playerImg);
  player.scale = 0.5;

  bullet = createSprite((width * (180/800)) - 50, (height/2) - 30, 10, 2);
  bullet.visibile = false;

  enemy = createSprite(width - width/8, (height/2) - 30, 25, 25);
  enemy.addImage(enemyImg);
  enemy.scale = 0.1;
  enemy.setCollider("rectangle", 0, 0, 30, 30);
  //enemy.debug = true;
}

function keyPressed() {
  if (keyCode === 32) {
    if (bulletCount < 3) {
      bullet = createSprite(width * (180/800), (height/2) - 30, 10, 2);
      bullet.velocityX = 10;
      bullet.setCollider("rectangle", 0, 0, 20, 20);
      //bullet.debug = true;
      bulletCount += 1;
      console.log(bulletCount);
    }
  }
}

function draw() {
  background(200);
  if (gameState === PLAY) {
    if (enemy.x < 0) {
      enemy.destroy();
      enemy = createSprite(width * (7/8), (height/2) - 30, 25, 25);
      enemy.addImage(enemyImg);
      enemy.scale = 0.1;
    }

    if (bullet.isTouching(enemy) && bulletCount === 3) {
      enemy.destroy();
      bulletCount = 0;
      enemy = createSprite(width * (7/8), (height/2) - 30, 25, 25);
      enemy.addImage(enemyImg);
      enemy.scale = 0.1;
      score = score + 10;
    }

    if (bullet.isTouching(enemy)) {
      bullet.destroy();
    }

    if (enemy.isTouching(player)) {
      player.destroy();
      enemy.destroy();

      lifeCount -= 1;

      player = createSprite(width/8, height/2, 20, 80);
      player.addImage(playerImg);
      player.scale = 0.5;
      //player.debug = true;


      enemy = createSprite(width * (7/8), (height/2) - 30, 25, 25);
      enemy.addImage(enemyImg);
      enemy.scale = 0.1;
      enemy.setCollider("rectangle", 0, 0, 30, 30);
      //enemy.debug = true;

    }

    if (lifeCount === 0) {
      gameState = END;

    }

    enemy.velocityX = -5 - score / 50;

    fill('black');
    text("Lives Remaining: " + lifeCount, 30, 30);
    text("Score: " + score, 300, 30);

    drawSprites();
  } else if (gameState === END) {
    player.destroy();
    enemy.destroy();
    bullet.destroy();

    fill('black');
    textSize(48);
    text('Game Over!', (width/2) - 200, (height/2) + 30);
    textSize(18);
    text('Press "R" to restart the game.', (width/2) - 190, (height/2) + 100);

    if (keyDown('r')) {
      gameState = PLAY;

      player = createSprite(width/8, height/2, 20, 80);
      //player.debug = true;
      player.addImage(playerImg);
      player.scale = 0.5;

      enemy = createSprite(width * (7/8), (height/2) - 30, 25, 25);
      enemy.addImage(enemyImg);
      enemy.scale = 0.1;
      enemy.setCollider("rectangle", 0, 0, 30, 30);
      //enemy.debug = true;

      lifeCount = 10;

      enemy.velocityX = -5 - score / 50;

      score = 0;
    }
  }
}