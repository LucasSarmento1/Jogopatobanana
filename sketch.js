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
var estadodejogo=0;
var button, button2;
var gover;
var win;
var princesa, princesaimg;


 function preload(){
    patoimg=loadImage("images/heroi.png");
    fundo1=loadImage("images/fundo1.jpg");
    fundo2=loadImage("images/fundo2.jpg");
    balaimg=loadImage("images/fogo.png");
    vida1img=loadImage("images/heart_1.png");
    vida2img=loadImage("images/heart_2.png");
    vida3img=loadImage("images/heart_3.png");
    gover=loadImage("images/fundo3.jpg");
    win=loadImage("images/fundo1.jpg");
    princesaimg=loadImage("images/princesa.png");
    

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
    vida3.visible=true;
   
    //gerar grupos
    inimigog=new Group();
    balag=new Group();


    button=createButton("JOGAR");
    button.position(width/2-100, height/2);
    button.class("estiloButton");

    button2=createButton("JOGAR NOVAMENTE?");
    button2.position(width/2-100, height/2);
    button2.class("estiloButton");
    button2.hide();

    princesa=createSprite(width*2,height-140,60,60);
    princesa.addImage(princesaimg);
    princesa.scale=0.7;

   

   
}

function draw(){
     background("white") 
    console.log(estadodejogo);

    //controlando os estados de jogo
    if(estadodejogo===0){
        background(fundo1);
        textSize(70);
        fill("yellow");
        stroke("black");
        strokeWeight(30)
        text("Pato Banana Adventures",width/2-390,height/2-200);
        button.mousePressed(()=>{         
            estadodejogo=1;
            button.hide();
        })

    }
      
    else if(estadodejogo===1){
    
    //button.hide();
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
     if(vida<=0){
        vida3.visible=false;
        vida2.visible=false;
        vida1.visible=false;

        estadodejogo=2;
     }

     //condição para ganhar o jogo
     if(score>=10){
        estadodejogo=3;
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

    if(estadodejogo===2){
        background(gover);
        textSize(70);
        fill("red");
        stroke("black");
        strokeWeight(30)
        text("O Pato Foi Descascado :(",width/2-390,height/2-200);
        button2.show()

        button2.mousePressed(()=>{         
            reset();
        })

        
    }

    if(estadodejogo===3){
        background(win);

        inimigog.destroyEach()
        vida1.visible=false;
        vida2.visible=false;
        vida3.visible=false;

        textSize(70);
        fill("green");
        stroke("black");
        strokeWeight(30);
        text("Você Salvou A Princesa :)",width/2-390,height/2-200);
        button2.show()
        
        pato.x=550;
        pato.y=height-140;

        princesa.x=900;

        button2.mousePressed(()=>{         
        reset();
        })

        drawSprites()
    }


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

function reset(){
    estadodejogo=1;
    button2.hide();
    vida=3;
    score=0;
    pato.x=100;
    pato.y=height-140;
    inimigog.destroyEach()
    princesa.x=width*2;
}

