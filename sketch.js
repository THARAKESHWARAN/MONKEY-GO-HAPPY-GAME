var monkeyRunning, gameOverImage, restartImage, groundImage,
    backgroundImage, monkey, Background, jungle, invisibleGround,
    score, ran, bananaGroup, obstacleGroup, gameState, monkeyJump,
    restartGroup;



function preload(){
  
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");  
  
  groundImage = loadImage("ground.jpg");
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
  monkeyJump = loadAnimation("Monkey_07.png");
  monkeyCollided = loadAnimation("Monkey_04.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(50,250);
  monkey.addAnimation("Running",monkeyRunning);
  monkey.addAnimation("jump",monkeyJump);
  monkey.addAnimation("collided",monkeyCollided);
  monkey.scale = 0.1;
  
  Background = createSprite(200,35);
  Background.x = Background.width/2;
  Background.addImage("BackgroundImage",backgroundImage);
  Background.velocityX = -10;
  
  monkey.depth = Background.depth ;
  monkey.depth = monkey.depth+1;
  
  Ground = createSprite(150,285);
  Ground.addImage("ground",groundImage);
  Ground.scale = 0.1;
  Ground.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  restartGroup = new Group();
  
  score = 0;
  
  gameState = "play-1"
  
}


function draw(){
  
 background(255);
  
  if(gameState === "play-1" || gameState === "play-2"){
    
  if(keyIsDown(32) && monkey.y >= 200){
     monkey.velocityY = -35;
     monkey.changeAnimation("jump");
  }
  
  if(keyWentUp(32)){
   monkey.changeAnimation("Running"); 
  }
    
  monkey.velocityY = monkey.velocityY + 3;
    
  if(Background.x < 100){
   Background.x = Background.width/2; 
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
    
  }   
  
  if(monkey.isTouching(obstacleGroup) && gameState === "play-1"){
    monkey.scale = 0.05; 
    gameState = "play-2"
    obstacleGroup.destroyEach();
  }
  
   if(monkey.isTouching(obstacleGroup) && gameState === "play-2"){
     gameState = "end";
     endState();
   }
  
  if(mouseIsPressed){
    if(mouseButton === LEFT && gameState === "end"){
     gameState = "play-1";
     reset();
      }
    }
  
  
  if(gameState === "play-1" || gameState === "play-2"){
    Bananas();
    obstacles();
  }
  
 
      
  monkey.collide(Ground);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score = "+score,450,50);
}

function Bananas(){
  
  if(frameCount % 120 === 0){
    var banana = createSprite(620);
    banana.y = random(80,200);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -10;
    banana.lifetime = 110;
    banana.scale = 0.04;
    
    if(gameState === "play-1"){
    switch(score){
        case 10: monkey.scale = 0.12;
            break;
        case 20: monkey.scale = 0.14;
            break;
        case 30: monkey.scale = 0.16;
            break;
        case 40: monkey.scale = 0.18;
            break;
        default: break;     
    }
  }
    bananaGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount % 80 === 0){
   var obstacle  = createSprite(630,200);
    obstacle.addImage("obstacleImage",obstacleImage);
    obstacle.velocityX = -10;
    obstacle.lifetime = 120;
    obstacle.scale = 0.2;
    obstacle.setCollider("circle",-20,0,116);
    
    obstacle.depth = Background.depth;
    obstacle.depth = obstacle.depth+1;
    
    obstacleGroup.add(obstacle);
  }
  
}

function endState(){
  
  monkey.changeAnimation("collided");
  monkey.y = 250;
  Background.velocityX = 0;
  bananaGroup.destroyEach();
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  gameOver = createSprite(290,120) 
  gameOver.addImage("gameOVer",gameOverImage);
  restart = createSprite(300,200);
  restart.addImage("restart",restartImage);
  restartGroup.add(restart);
  
}

function reset (){
  
  monkey.changeAnimation("Running");
  Background.velocityX = -10;
  obstacleGroup.destroyEach();
  score = 0;
  gameOver.destroy();
  restart.destroy();
  monkey.scale = 0.1;
  
  
}