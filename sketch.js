var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var backgroundImg;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var cowboy, cowboyImg;
var cowboy2, cowboy2Img;
var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
  backgroundImg = loadImage("background.jpg")
  cowboyImg = loadImage("cowboy.png")
  cowboy2Img = loadImage("cowboy2.png")
}
function setup() {
  createCanvas(1600,800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.02
  
  cowboy = createSprite(200,700,50,50);
  cowboy.addImage(cowboyImg);
  cowboy.scale= 0.2

  cowboy2 = createSprite(1400,700,50,50);
  cowboy2.addImage(cowboy2Img);
  cowboy2.scale= 0.2

  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backgroundImg);
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("LEFT_ARROW")){
      cowboy.x = cowboy.x -3
    }
    if(keyDown("RIGHT_ARROW")){
      cowboy.x = cowboy.x +3
    }
  
    if(keyDown("A")){
      cowboy2.x = cowboy2.x -3
    }
    if(keyDown("D")){
      cowboy2.x = cowboy2.x +3
    }
   

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.02;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.02;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(250, 750, 50,20)
  bullet.y= cowboy.y-40
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg)
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Fin del juego`,
        text: "¡Ups perdiste el juego!",
        text: "Tu puntuación es " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Gracias por jugar"
      });
    }
  
}
