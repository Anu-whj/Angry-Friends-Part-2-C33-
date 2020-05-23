const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, box2, box3, box4, box5, pig1,pig3;
var log1, log3, log4, log5;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";

var score;

function preload() {
    backgroundImg = loadImage("school.jpg"); 
    getBackgroundImg();
}

function setup(){
  var canvas = createCanvas(1200,400);
  engine = Engine.create();
  world = engine.world;


  ground = new Ground(600,height,1200,20);
  platform = new Ground(150, 305, 300, 170);

  box1 = new Box(700,380,70,70);
  box2 = new Box(920,380,70,70);
  pig1 = new Pig1(820, 380);
  log1 = new Logg(800,260,300,15);

  box3 = new Box(700,240,70,70);
  box4 = new Box(920,240,70,70); 
  pig3 = new Pig3(800, 227);

  
  log3 = new Logg(800,120,300,15);

  box5 = new Box(820,100,70,70);
  
  bird = new Bird(200,50);

  slingshot = new SlingShot(bird.body,{x:200, y:50});

  score = 0;
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Score: "+score, width-300, 50);

    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display(); 
    pig3.display();
    pig3.score(); 
    log3.display();

    box5.display();
    

    bird.display();
    platform.display();
    slingshot.display(); 
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<1){
        bird.trajectory = []; 
        Matter.Body.setPosition(bird.body, {x:200, y:50});
        slingshot.attach(bird.body);
        console.log(bird.body.speed);
    }
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11, 13);

    if(hour>=06 && hour<=19){
       bg = "school.jpg";
    }
    else{
       bg = "nightimage.jpg";
    }
    backgroundImg = loadImage(bg);
}
