const  Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var divisions = [];
var divisionHeight=300;
var particles = [];
var plinkos = [];

var score = 0;
var count = 0;
var particle;
var turn = 0;
var gameState = "play";
var gameState = "end";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  if (gameState = "end") {
    background("black");
    fill("red");
    textSize(100);
    text("Game Over",200,400);
  }


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }

    Engine.run(engine);
    

    
}
 


function draw() {
  background("black");
  
  Engine.update(engine);
  drawSprites();


  textSize(35)
  fill("white");
  text("500",10,540);
  text("500",90,540);
  text("500",170,540);
  text("500",250,540);
  text("100",330,540);
  text("100",410,540);
  text("100",490,540);    
  text("200",570,540);
  text("200",650,540);
  text("200",730,540);

    textSize(20)
  text("Score : "+score,20,30);

  
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display(); 
   }

   if (particle!=null) {
    particle.display();
    
    if (particle.body.position.y>760) {
      if (particle.body.position.x < 300) {
        score = score+500;
        particle = null;
        if (count>=5) gameState = "end";
      }
      else if (particle.body.position.x>301 && particle.body.position.x<600) {
        score = score+100;
        particle = null;
        if (count>=5) gameState = "end";
      }
      else if (particle.body.position.x>600 && particle.body.position<900) {
        score = score+200;
        particle = null;
        if (count>=5) gameState = "end";
      }
    }
  }
  
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
   }

   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

}

function mousePressed() {
  if (gameState!=="end"){
    count++;
    particle = new Particle(mouseX,10,10,10);
  }
}