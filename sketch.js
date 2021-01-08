var tower,towerImage,door,doorImage,doorGroup,ledge,ledgeImage,ledgeG;
var ghost,ghostImage,Iledge,IledgeG,gameState = "PLAY",score;



function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  ledgeImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  
  IledgeG = createGroup();
  doorGroup = createGroup();
  ledgeG = createGroup();
  
  score = 0;
}


function draw(){
  background("black");
  if(gameState === "PLAY"){ 
  if(tower.y>600){
     tower.y = 300;
     
     }
  if(keyDown("space")){
    
    ghost.velocityY = -10;
    
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  ghost.velocityX = 0;
  if(keyDown("left_arrow")){
    ghost.velocityX = -5;  
    
  }
  if(keyDown("right_arrow")){
    
    
    ghost.velocityX = 5;
  }
  if(ledgeG.isTouching(ghost)){
    
    ghost.velocityY = 0;
    score = score + 1;
  }
  if(IledgeG.isTouching(ghost)||ghost.y>600){
    gameState = "END";
    
  }
    spawnDoors();
  
  drawSprites();
    
  }
  textSize(20)
  fill("RED")
  text("Score: " + score,280,50);
  if(gameState === "END"){
    strokeWeight(4);
    stroke("red");
    fill("yellow"); 
    textSize(30);
    text("Game Over", 230,250)
    
  }
}

function spawnDoors(){
  if(frameCount% 200 ===0){
  door = createSprite(200,0,50,50);
  door.addImage(doorImage);
  door.velocityY = 2;
    door.x = Math.round(random(100,500))
    door.lifetime = 350;
    doorGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    ledge = createSprite(200,60,50,50);
    ledge.addImage(ledgeImage);
    ledge.velocityY = 2;
    ledge.x = door.x;
    ledge.lifetime = 350;
    ledgeG.add(ledge);
    
    Iledge = createSprite(200,70,85,10);
    Iledge.visible = false;
    Iledge.x = door.x;
    Iledge.lifetime = 350;
    Iledge.velocityY = 2;
    IledgeG.add(Iledge);
    
    
}
}