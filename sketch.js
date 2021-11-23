var bg,sonic;
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var obstaclesGroup, obstacle1;
var score=0;
function preload() {
  
  bg = loadImage("background.png");
  sonicImg=loadImage("sonic1.png");



coin = loadImage("coin.png");
  coin2= loadImage("coin2.png");
  coin3 = loadImage("coin3.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.wav");

  
}

function setup() {
  createCanvas(displayWidth-200,displayHeight-200);

  background=createSprite(0,0,displayWidth-200,displayHeight-200);
  background.addImage("background",bg);
  background.x = background.width /2;
  
  background.velocityX=-3;

  sonic=createSprite(100,150,40,40);
sonic.addImage(sonicImg)
sonic.scale=0.5


  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);

  invisibleGround = createSprite(400,650,1600,10);
  invisibleGround.visible = false;

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {

    
  if (gameState===PLAY){

    background.velocityX=-3

    if(background.x<0)
    {
       background.x=background.width/2;}

   console.log(background.x);
    if(keyDown("space")&& sonic.y>250) {
      
      sonic.velocityY  = -16;
    }
  
    sonic.velocityY = sonic.velocityY + 0.8
    spawncoins();
    spawnObstacles();

    sonic.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(sonic)){
      
      gameState = END;
    }
    if(coinsGroup.isTouching(sonic)){
      score = score + 1;
      coinsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    sonic.velocityY = 0;
    background.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);

    
    
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
    else if (gameState === WIN) {
      jungle.velocityX = 0;
      kangaroo.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);
  
    
  
      obstaclesGroup.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);
    }


  }

  drawSprites();
  textSize(50);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);

  if(score >= 5){
    kangaroo.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congragulations!! You win the game!! ", 70,200);
    gameState = WIN;
  }
}
function spawncoins() {
 
  if (frameCount % 150 === 0) {

    var coin = createSprite(camera.position.x+500,650,40,10);
    //console.log("spawncoins")
    coin.velocityX = -(6 + 3*score/100)
    coin.scale = 0.6;

    var rand = Math.round(random(1,2,3));
    switch(rand) {
      case 1: coin.addImage(coin);
              break;
      case 2: coin.addImage(coin2);
              break;
      case 3: coin.addImage(coin3);
              break;
      default: break;
    }
       
    coin.scale = 0.05;
    coin.lifetime = 400;
    
    coin.setCollider("rectangle",0,0,coin.width/2,coin.height/2)
    coinsGroup.add(coin);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,650,40,40);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15; 

    var rand = Math.round(random(1,2,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      
      default: break;
    }
    
    obstacle.setCollider("rectangle",0,0,200,200);
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
score=0;
}


