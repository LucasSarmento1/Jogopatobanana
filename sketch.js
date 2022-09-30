var pato, patoimg, princesa ;
var fundo1;
var fundo2;
var solo;
var bala, balaimg, balag;
var inimigo,inimigoimg,inimigog;
var boomimg;
var vida=3;
var vida1, vida2, vida3;
var vida1img, vida2img, vida3img;
var score=0;


 function preload(){
    patoimg=loadImage("images/heroi.png");
    fundo1=loadImage("images/fundo1.jpg");
    fundo2=loadImage("images/fundo2.jpg");
    balaimg=loadImage("images/fogo.png");
    vida1img=loadImage("images/heart_1.png");
    vida2img=loadImage("images/heart_2.png");
    vida3img=loadImage("images/heart_3.png"); 

    


 }

function setup(){
    createCanvas(windowWidth-50,windowHeight-50);

    pato=createSprite(100,height-140,60,60);
    pato.addImage(patoimg);

    solo=createSprite(pato.x,height,200,10);
    solo.visible=false;

    vida1=createSprite(50,80);
    vida1.addImage(vida1img);
    vida1.scale=0.25;
    vida1.visible=false;

    vida2=createSprite(50,80);
    vida2.addImage(vida2img);
    vida2.scale=0.25;
    vida2.visible=false;

    vida3=createSprite(80,80);
    vida3.addImage(vida3img);
    vida3.scale=0.25;
   
    //gerar grupos
    inimigog=new Group();
    balag=new Group();
}

function draw(){
    background(fundo2);
    solo.x=pato.x
     
     fill("yellow");
     textSize(20);
     text("PONTUAÇÃO:"+score,width/2,50);

     //contagem de vida

     if(vida===3){
        vida3.visible=true;
        vida2.visible=false;
        vida1.visible=false;
     }
     
     if(vida===2){
        vida3.visible=false;
        vida2.visible=true;
        vida1.visible=false;
     }

     if(vida===1){
        vida3.visible=false;
        vida2.visible=false;
        vida1.visible=true;
     }

   // console.log(pato.y);

    if(keyDown("RIGHT_ARROW")){
    pato.x=pato.x+9
    }

    
    if(keyDown("LEFT_ARROW")){
        pato.x=pato.x-9
    }

    if(keyDown("UP_ARROW") && pato.y>height-150){
        pato.velocityY=-18

    }

    if(keyDown("space")){
        tiro();
    }
    pato.velocityY=pato.velocityY+0.5;

    pato.collide(solo);
   
    gerarinimigos();

    if(balag.isTouching(inimigog)){
        for(var j=0; j<inimigog.length; j=j+1){
            if(balag.isTouching(inimigog[j])){
                balag.destroyEach();
                inimigog[j].remove(j);
                score=score+1;
    } } }

    if(pato.isTouching(inimigog)){
        for(var j=0; j<inimigog.length; j=j+1){
            if(pato.isTouching(inimigog[j])){
                inimigog[j].remove(j);
        vida=vida-1;
        console.log(vida);
    }}}
    drawSprites();
}
function gerarinimigos(){
    var frame=Math.round(random(70,100))

    if(frameCount%frame===0){
      
    inimigo=new Inimigo(width,random(150,650),30,30);
    
    }
  }

function tiro(){
    //if(frameCount%100===0){
     bala=createSprite(pato.x,pato.y,50,10);
     bala.addImage(balaimg);
     bala.velocityX=18;
     bala.scale=0.4;
     balag.add(bala);
    //}
}

