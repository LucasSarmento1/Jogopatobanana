class Inimigo{
    constructor(x,y,w,h){
        this.body=createSprite(x,y,w,h); 
        this.body.velocityX=-9;
     
        this.inimigoimg=loadImage("images/bomba.png");
        this.boomimg=loadImage("images/boom.png");

        this.body.addImage("inimigo",this.inimigoimg);
        this.body.scale=0.3
        inimigog.add(this.body);

    }
    remove(index){
        this.body.addImage("boom",this.boomimg);
        this.body.changeImage("boom");
        setTimeout(()=>{
        delete inimigog[index];
        },8000)                                                                                                

    }
}