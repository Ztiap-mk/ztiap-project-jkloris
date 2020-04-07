class Menu{
    constructor(){
        this.button1 = new Button({x: 408, y: 200}, {x: 400, y: 80}, "Multiplayer","white","black");
        this.button1.action = function(){
        flag = 0;
        }
        this.button2 = new Button({x: 408, y: 350},{x: 400, y: 80}, "Inštrukcie","white","black" );
        this.button2.action = function(){
        flag = 2
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
        this.button1.update(this.mouseX, this.mouseY);
        this.button2.update(this.mouseX, this.mouseY);
        this.buttonSound.update(this.mouseX, this.mouseY);
        this.mouseY = -1;
        this.mouseX = -1;
    }

    draw(){
        this.drawBackground();
        this.button1.draw();
        this.button2.draw();
        this.buttonSound.draw();

    }

    
    drawBackground(){
        Canvas.context.save();
        Canvas.context.translate(0, 0); //zachovaj poradie!!
        Canvas.context.drawImage(Sprites.menu, 0, 0 ); 
        Canvas.context.font = "100px Arial Black";
        Canvas.context.fillText("Trable s tankami", 160, 120 );
        Canvas.context.restore();
    }
    
   
}
