class Button{
    constructor(position,size, name, Bcolor,Fcolor, font){
        this.position = position;
        this.size = size;
        this.Bcolor = Bcolor;
        this.Fcolor = Fcolor;
        this.Font = font;
        if(this.size.y < 30) this.size.y = 30;
        
        this.name = name;
    }

    update(mouseX, mouseY){
        this.check(mouseX, mouseY);
    }


    check(mouseX, mouseY){
        if(mouseX >= this.position.x && mouseX <=this.position.x + this.size.x && mouseY >= this.position.y && mouseY <=this.position.y +this.size.y){
            this.action();
        } 
    }
    
    draw(){        
        var a = this.size.y / 2 + 16;
        var b = this.size.x/2;
        Canvas.context.save();
        Canvas.context.fillStyle = this.Bcolor;
        Canvas.context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        Canvas.context.fillStyle = this.Fcolor;
        Canvas.context.font = this.Font;
        Canvas.context.textAlign = "center";
        Canvas.context.fillText(this.name, this.position.x + b, this.position.y+a);
        Canvas.context.restore();
    }


}

class Sound extends Button{
    constructor(position, size){
        super(position, size);
        this.soundON = 1;
    }

    draw(){
        Canvas.context.save();
        Canvas.context.translate(this.position.x, this.position.y);
        if(this.soundON==1){
            Canvas.context.drawImage(Sprites.soundON, 0, 0);
        } else{
            Canvas.context.drawImage(Sprites.soundON, -20, 0,64,64, -20,0,64,64);
        }
        Canvas.context.restore();
    }

    action(){
        function mute(Sounds, value){
            Object.keys(Sounds).forEach(function(key){ Sounds[key].muted=value});
            return Sounds;
        }
        
        if(this.soundON == 1) {
            this.soundON = 0;
            mute(Sounds, true);
            
        }
        else {
            this.soundON = 1;
            mute(Sounds, false);
        }
    }

}
