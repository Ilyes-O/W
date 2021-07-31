const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var engine, world
var s1, s2;

var form, player, game;
var s1_dead, s1_shooting, s2_dead, s2_shooting;
var jet1, jet1Img, jet2, jet2Img, heliImg;
var jet1Group, jet2Group;
var score,score2;
var bullet1, bullet2,bullet1Img, bullet2Img,bomb1,bomb2,bom1Img,bomb2Img;
var bomb1, bomb2;
var tank, tankImg;
var tank2, tankImg2;
var invsWall
var block1 = [],block2 = [];

var score = 0;
var score2 = 0

var stand1, stand2

function preload() {
  bg = loadImage("images/sky.jpg");
  s1_shooting = loadImage("images/shooting_1.png");
  s1_dead = loadImage("images/destroyed_1.png");
  s2_shooting = loadImage("images/shooting_2.png");
  s2_dead = loadImage("images/falling_2.png");
  jet1Img = loadImage("images/jet (2).png")
  jet2Img = loadImage("images/jet (3).png");
  heli1Img = loadImage("images/helicopter.png")
  heli2Img = loadImage("images/heli.png");
  bullet1Img = loadImage("images/bullet_1.png");
  bullet2Img = loadImage("images/bullet_2.png");
  bomb1Img = loadImage("images/bomb1.png");
  bomb2Img = loadImage("images/bomb2.png");
  tankImg = loadImage("images/tank.png");
  tankImg2 = loadImage("images/tank2.png");
}
function setup() {
  engine = Engine.create();
  world = engine.world
  canvas = createCanvas(1800, 800);

  tank = createSprite(1300,550);
  tank.addImage(tankImg)

  tank2 = createSprite(500,550);
  tank2.addImage(tankImg2)
  
  soldier1 = createSprite(300,570);
  soldier1.addImage(s1_shooting)
  soldier1.scale = .15

  soldier2 = createSprite(1400,580);
  soldier2.addImage(s2_shooting)
  soldier2.scale = .7

  stand1 = new Stand(380,340,250,10);
  stand2 = new Stand(1320,340,250,10);

  bomb1 = new Bomb1(400,400,60,60);
  bomb2 = new Bomb2(1300,400,60,60);

  sling1 = new Slingshot1({x:400,y:450}, bomb1.body)
  sling2 = new Slingshot2({x:1300,y:450}, bomb2.body)

  for (var j = 300; j <=525; j=j+40) { 
    block1.push(new Block(j,320));
  }

  for (var j = 300; j <=520; j=j+40) { 
    block1.push(new Block(j,280));
  }

  for (var j = 1200; j <=1400; j=j+40) { 
    block2.push(new Block(j,330));
  }

   for (var j = 1200; j <=1400; j=j+40) { 
    block2.push(new Block(j,310));
  }


  jet1Group = new Group();
  jet2Group = new Group();

  heli1Group = new Group();
  heli2Group = new Group();

  bullet1Group= new Group();
  bullet2Group = new Group();

  score = score2 = 0;
}


function draw() {
  background(bg)
  Engine.update(engine)

  if(keyDown("1")){
    spawnBullet1();
  }

  if(keyDown("2")){
    spawnBullet2();
  }

  if(tank.x < 920){
    tank.x = 930
  }

  if(tank2.x > 920){
    tank2.x = 930
  }

  if(bullet1Group.isTouching(jet2Group)){
    bullet1Group.destroyEach();
    jet2Group.destroyEach();
    score = score+1
  }

  if(bullet1Group.isTouching(heli2Group)){
    bullet1Group.destroyEach();
    heli2Group.destroyEach();
    score = score+1
  }

  if(bullet2Group.isTouching(jet1Group)){
    bullet2Group.destroyEach();
    jet1Group.destroyEach();
    score2 = score2+1
  }

  if(bullet2Group.isTouching(heli1Group)){
    bullet2Group.destroyEach();
    heli2Group.destroyEach();
    score2 = score2+1
  }



  if(keyDown(LEFT)){
    tank.x = tank.x - 20
  }

  if(keyDown(RIGHT)){
    tank.x = tank.x + 20
  }

  if(keyDown("A")){
    tank2.x = tank2.x - 20
  }

  if(keyDown("D")){
    tank2.x = tank2.x + 20
  }


  // jet1.display();
  //jet2.display();

  bomb1.display();
  bomb2.display();

  stand1.display();
  stand2.display();

  for (var i = 0; i < block1.length; i++) {
    block1[i].display();   
  }

  for (var i = 0; i < block2.length; i++) {
    block2[i].display();   
  }

  spawnObs2();
  spawnObs();
  drawSprites();
  fill("yellow")
  textSize(17)
  text("Player 1 score:" +score,900,50)

  fill("yellow")
  textSize(17)
  text("Player 2 score:" +score2,900,100)
}

function spawnObs() {
  if (frameCount % 250 === 0) {
    jet1 = createSprite(-50, 250, 100);
    jet1.y = Math.round(random(0,300))
    jet1.addImage(jet1Img)
    jet1.scale = .5
    jet1.velocityX = (6 + score/2);
    jet1Group.add(jet1);
  }
  if(frameCount%600 === 0){
    heli1 = createSprite(-50,250,100);
    heli1.y = Math.round(random(0,300));
    heli1.addImage(heli1Img);
    heli1.velocityX = (6 + score/2);
    heli1.scale = .3
    heli1Group.add(heli1)
  }

}

function spawnObs2() {
  if(frameCount%270==0){
  jet2 = createSprite(2050, 250, 150);
  jet2.y = Math.round(random(0,250));
  jet2.addImage(jet2Img);
  jet2.velocityX = -(6 + score/2);
  jet2Group.add(jet2);
}
if(frameCount%630 === 0){
  heli2 = createSprite(2050,250,100);
  heli2.y = Math.round(random(0,250));
  heli2.addImage(heli2Img);
  heli2.velocityX = -(6 + score/2);
  heli2.scale = .5
  heli2Group.add(heli2)
}
}

function spawnBullet1(){
  bullet1 = createSprite(300,540);
  bullet1.addImage(bullet1Img);
  bullet1.x = tank2.x+80
  bullet1.scale = .08
  bullet1.setVelocity(4, -4);
  bullet1.rotation = 60
  bullet1Group.add(bullet1)
}

function spawnBullet2(){
  bullet2 = createSprite(1000,550);
  bullet2.x = tank.x-50
  bullet2.addImage(bullet2Img);
  bullet2.scale = .08
  bullet2.setVelocity(-4, -4);
  bullet2.rotation = 285;
  bullet2Group.add(bullet2);

}

function mouseDragged(){
  Matter.Body.setPosition(bomb1.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
  sling1.fly();
}

function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(bomb1.body, {x:400, y:400})
    sling1.attach(bomb1.body)
  }
}