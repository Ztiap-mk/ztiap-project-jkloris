class Instrukcie{
    constructor(){
        this.buttonMenu = new Button({x: 50, y: 620},{x: 150, y: 60}, "Menu", "white", "black");
        this.buttonMenu.action = function(){
            flag = 1;
        }
        this.buttonSound = new Sound({x: 1100, y: 620},{x: 64, y: 64});
        this.mouseX = -1;
        this.mouseY = -1;
    }


    mousePos(){
        document.addEventListener("click",(e)=>{
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        })
        
    }
    
    update(){
        this.mousePos();
        this.buttonSound.update(this.mouseX, this.mouseY);
        this.buttonMenu.update(this.mouseX, this.mouseY);
        this.mouseY = -1;
        this.mouseX = -1;
    }

    draw(){
        this.drawBackground();
        this.buttonSound.draw();
        this.buttonMenu.draw();

    }

    
    drawBackground(){
        Canvas.context.save();
        Canvas.context.translate(0, 0); 
        Canvas.context.drawImage(Sprites.instrukcie, 0, 0 ); 
        Canvas.context.restore();
    }
    
   
}
