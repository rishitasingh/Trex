var trex, trex_running, trex_collided;
var ground, groundImage, invisibleGround;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var CloudsGroup, ObstaclesGroup;
var count = 0;
var reset, gameOver;
var resetImage, gameOverImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  resetImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,30);
  ground.addImage("ground", groundImage);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  reset = createSprite(300,100,10,10);
  reset.visible = false;
  gameOver = createSprite(200,50,20,20);
  gameOver.visible = false;
  
  reset.addImage(resetImage);
  gameOver.addImage(gameOverImage);
}

function draw() {
  background(180);
  
  if(gameState === PLAY){
  if(World.frameCount % 5 ===0 ){
     count = count + 1;
     }
    
    if(keyDown("space")){
  trex.velocityY = -8;
  }
  trex.velocityY = trex.velocityY + 0.5;
  
  if(ground.x<0){
  ground.x = ground.width/2;
  }
    
    spawnClouds();
  spawnObstacles();
    
    if(ObstaclesGroup.isTouching(trex)){
    gameState = END;
    }
  
  }
  
  else if(gameState === END){
  ground.velocityX = 0;
    trex.velocityY = 0;
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setLifetimeEach(-1);
    reset.visible = true;
    gameOver.visible = true;
    
  }
  
  
  if(mousePressedOver(reset)){
    resetGame();
  }
  
  text("score:" + count, 500,50);
  
  trex.collide(invisibleGround);
  
  drawSprites();
}


function resetGame(){
gameState = PLAY;
  reset.visible = false;
  gameOver.visible = false;
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  count = 0;
  trex.changeAnimation("running", trex_running);
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.addImage("cloud", cloudImage);
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnBird (){
  // spawning birds
    var bird = createSprite(400,350,20,20);
    bird.y = randomNumber(300,350);
    bird.setAnimation("bee");
    bird.scale = 0.5;
    bird.velocityX = -2;
    // giving lifetime to birds
    bird.lifetime = 200;
    
    // adding each bird to the group
    BirdsGroup.add(bird);

  
  
}
