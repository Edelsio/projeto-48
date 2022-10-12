var ground;
var modulo;
var modulo_img;
var fundo_img;
var solo_invisivel;
var MarcaçãoParaPouso, MarcaçãoParaPousoImg;
var botão_restartImg, botão_restart;
var introdução, introduçãoImg;


var vx = 0;
var g = 0.0005;
var vy = 0;

estado_de_jogo = 0

function preload()
{
  video = createVideo("apollo11.mp4");

  somFundo = loadSound("Música espacial.mp3");
  som_de_spray = loadSound("som de spray.mp3");

  modulo_img = loadImage("apollo 11.png");
  fundo_img = loadImage("bg_sur.png");
  MarcaçãoParaPousoImg = loadImage("marcação para pouso.png")
  introduçãoImg = loadImage("Introdução - Jogo Apollo 11.png")
  botão_restartImg = loadImage("botão_restart.png")
}

function setup() {

  var eCelular = /Android|iPod|iPhone|iPad/i.test(navigator.userAgent);

  if(eCelular == true){
    canW =displayWidth;
    canH =displayHeight;
  }else{
    canW =windowWidth;
    canH =windowHeight;
  }

  createCanvas(canW,canH);
  frameRate(80);

  video.size(400, 400);
  video.volume(0);
  //video.loop();

  somFundo.loop();
  somFundo.play();
  somFundo.setVolume(0.5); 

  introdução = createSprite(width/2,height - 400,1000, 700);
  introdução.addImage(introduçãoImg)
  introdução.visible = true;

  modulo = createSprite(250,50,30,30);
  modulo.addImage(modulo_img);
  modulo.scale = 0.3;
  modulo.visible = false

  solo_invisivel = createSprite(width/2, height -250, 10000, 10);
  solo_invisivel.visible = false

  MarcaçãoParaPouso = createSprite(width/2,height - 220,20,10);
  MarcaçãoParaPouso.addImage(MarcaçãoParaPousoImg)
  MarcaçãoParaPouso.visible = false
  MarcaçãoParaPouso.scale = 0.1
  MarcaçãoParaPouso.setCollider("circle", 0 , 0, 500)

  botão_restart = createSprite(width/2, height - 200, 10, 10);
  botão_restart.addImage(botão_restartImg);
  botão_restart.scale = 0.5;
  botão_restart.visible = false;

  botaoVolume = createImg("mute.png");
  botaoVolume.position(20, 25);
  botaoVolume.size(50, 50);
  botaoVolume.mouseClicked(pausar);

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  //MarcaçãoParaPouso.debug = true
  background(fundo_img);
  push()
  fill(255);
  text("Velocidade Vertical: "+round(vy),800,75);
  pop();
  

  if (keyDown("SPACE")){
    estado_de_jogo = 1
  }


  if(modulo.isTouching(solo_invisivel)){

    estado_de_jogo = 3

  }

  if(modulo.isTouching(MarcaçãoParaPouso) && vy < 1 && vy > 0){

    estado_de_jogo = 2

  }



  if(estado_de_jogo == 3){
    textSize(50)
    fill("white")
    text("Você Perdeu", width/2 , height/2);

    modulo.y = 50

    botão_restart.visible = true;
    somFundo.stop();

    if(mousePressedOver(botão_restart)){

      restart()
    }
    MarcaçãoParaPouso.visible = false
  }

  if(estado_de_jogo == 2){
    modulo.y = 50
    modulo.visible = false
    MarcaçãoParaPouso.visible = false
    somFundo.stop();

    video.play();
    video.volume(1)

    image(video,0,0,width,height);

    textSize(50)
    fill("white")
    text("Você Venceu", 350 , 50);

  }else{
    video.hide();
  }

  if(estado_de_jogo == 1){

    modulo.visible = true;
    MarcaçãoParaPouso.visible = true
    introdução.visible = false;
    vy += g
    modulo.position.y+=vy;
    movendo()
    pausar()


  }
  drawSprites();
}

 function movendo(){

  if(keyDown("UP")){

    vy -= 0.01
    
  }

  if(keyDown("DOWN")){
    
    vy += 0.05

  }

  if(keyDown("LEFT")){
    
    modulo.x -= 0.09
  
  }

  if(keyDown("RIGHT")){
    
    modulo.x += 0.09

  }

 }

 function pausar() {

  if (somFundo.isPlaying()) {
      somFundo.stop();

  } else {
      somFundo.play();
      somFundo.setVolume(10);
  }
}

 function restart(){

  estado_de_jogo = 1;

  botão_restart.visible = false;

  modulo.y = 50

  vy = 0

 }


