var bananaImage, obstacleImage, obstaclegroup, backdrop, score; 

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  backdropImage = loadImage("jungle.jpg");
  
  Monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

bananaImage = loadImage("banana.png");
obstacleImage = loadImage("stone.png");

}




function setup() {
  createCanvas(400, 400);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  
  backdrop = createSprite(200,200,400,400);
  backdrop.addImage("backdrop",backdropImage);
  backdrop.x = backdrop.width /2;
  backdrop.velocityX = -3;
  
  Invisibleground = createSprite(200,380,400,20);
  Invisibleground.visible = false;
  
  player = createSprite(60,340,20,20);
  player.addAnimation("Monkey",Monkey_running);
  player.scale = 0.1;
  player.depth = obstaclesGroup.depth + 1;
  
  
  score = 0;
  
}

function draw() {
  background(220);
  
 if(gameState === PLAY) {
// to reset background
  if(backdrop.x<0) {
    backdrop.x = backdrop.width /2;
  }
   
   if(keyDown("space")) {
    player.velocityY = -13;
  } 
  
 }
// banana and obstacle functions being called
  banana();
  obstacle();
  
// to make monkey jump if space is pressed
  
    player.velocityY = player.velocityY + 1;
    player.collide(Invisibleground);
  
  
// to destroy banana and increase score by +2 if monkey touches it.
  if(foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(player)) {
    player.scale = 0.1;
    gameState = END; // make it so second collision is detected. 
    
  } 
  

  
  if(gameState === END) {
    backdrop.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);  
    
    
  }
  
  
  switch(score){
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;  
    case 30: player.scale = 0.16;  
      break;
    case 40: player.scale = 0.18;
      break;
    default: break;
      
      
      
  }
  
  
  
  
  
  drawSprites();
  fill(0);
  textSize(30);
  strokeWeight(5);
  stroke("white");
  text("score: "+ score,260,50);
}

function banana () {
  if(frameCount % 60 === 0){
    bananaSprite = createSprite(400,250,10,10);
    bananaSprite.addImage("banana",bananaImage);
    bananaSprite.velocityX = -4;
    bananaSprite.lifetime = 120;
    bananaSprite.scale = 0.05;
    foodGroup.add(bananaSprite);
    
  }
  
}
function obstacle() {
  if(frameCount % 300 === 0) {
    obstacleSprite = createSprite(400,340,50,50);
    obstacleSprite.addImage("stone",obstacleImage);
    obstacleSprite.velocityX = -5;
    obstacleSprite.scale = 0.2;
    obstacleSprite.lifetime = 100;
    obstaclesGroup.add(obstacleSprite);
    
  }
  
}