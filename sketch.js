var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,gameover,gameoverImage;
var gamestate = "start";
var stationaryBoyImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  stationaryBoyImage=loadAnimation("stop","runner2.png");
  gameoverImage = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
 path=createSprite(200,200,400,400);
 path.addImage(pathImg);

  gameover = createSprite(200,200);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  


//creating boy running
 boy = createSprite(70,330,20,20);
boy.addAnimation("run",boyImg);
 boy.scale=0.08;
  
  
 cashG=new Group();
 diamondsG=new Group();
 jwelleryG=new Group();
 swordGroup=new Group();

}

function draw(){

  background(0);
 
  //boy.debug = true;
  boy.setCollider("circle",0,0,40);
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  //  text("PRESS SPACE TO PLAY",200,200);
      
     
    
    boy.x = World.mouseX ;
  if(keyDown("space")){
    gamestate = "play";
     if(path.x<0){
        path = path.width/2;
      }
  }
  if(gamestate ==="play"){
   
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
     if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+5;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+10;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+15;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gamestate = "end";
         
      }
      
      if(gamestate ==="end"){
        gameover.visible = true;
        // text("GAME OVER",200,200);
        
        treasureCollection = 0;
        boy.changeAnimation("stop",stationaryBoyImage);
         boy.setVelocity(0,0);
      path.setVelocity(0,0);
      swordGroup.setVelocityYEach(0);
        swordGroup.setLifetimeEach(-1);
      diamondsG.setVelocityYEach(0);
        diamondsG.setLifetimeEach(-1);
      jwelleryG.setVelocityYEach(0);
        jwelleryG.setLifetimeEach(-1);
      cashG.setVelocityYEach(0);
        cashG.setLifetimeEach(-1);
      }
         textSize(20);
     fill(255);
     text("Treasure: "+ treasureCollection,150,30);}
    }
 
      
    
    
     // boy.changeAnimation()
     
     
  drawSprites();
}


function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}