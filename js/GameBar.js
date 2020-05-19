class GameBar{
    constructor(position, size, color){
        this.position = position;
        this.size = size;
        this.color = color;
        
    }

    drawBar(){
        Canvas.context.fillStyle = this.color;
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x, this.size.y);
    }
}

class HealthBar extends GameBar{
    constructor(position, size, color, text ){
        super(position, size, color);
        this.text = text;
    
    }

    drawBar(life, maxLife){
        Canvas.context.beginPath();
        Canvas.context.fillStyle = this.color;
        Canvas.context.strokeStyle = "black";
        Canvas.context.lineWidth = "5";
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x / maxLife * life, this.size.y);
        Canvas.context.rect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.stroke();
        Canvas.context.fillStyle = "black";
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText(this.text,this.position.x + 70, this. position.y + 60 );
    }
}

class Timer extends GameBar{
    constructor(position, size, color){
        super(position, size, color)
    }

    drawBar(limit){
        
        Canvas.context.save();
        Canvas.context.fillStyle = this.color;
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.fillStyle = "white";
        Canvas.context.textAlign = "center";
        Canvas.context.font = "30px Arial black";
        Canvas.context.fillText(limit, this.position.x + this.size.x / 2, this.position.y +this.size.y / 2 + 7);
        Canvas.context.restore();
    }
}

class Zasobnik extends GameBar{
    constructor(position, size, color){
        super(position, size, color);

    }

    drawBar(counter, max){
        Canvas.context.save();
        Canvas.context.fillStyle = this.color;
        Canvas.context.lineWidth = "2";
        Canvas.context.strokeStyle = "black";
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.rect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.stroke();
        Canvas.context.restore();
        var x = 5;
        for(var i = 0; i < max - counter; i++){
            Canvas.context.save();
            Canvas.context.translate(this.position.x + x, this.position.y + 5)
            Canvas.context.drawImage(Sprites.naboj, 0, 0);
            Canvas.context.restore();
            x+=20;
        }
    }
}

class PowerUp{
    constructor(mapa){
        this.mapa1 = mapa;
        this.timer = 0;
        this.powArray = [];
    }

    update(dt, level,tank1, tank2){
        this.generatePowerup(dt,level);
        this.usePowerup(tank1, tank2);
    }

    usePowerup(tank1, tank2){
        for(var i in this.powArray){
            // console.log(this.powArray[i].y);
            // console.log( Math.floor(tank1.position.x / this.mapa1.tileSize));
            if(this.powArray[i].y == Math.floor(tank1.position.x / this.mapa1.tileSize) && this.powArray[i].x == Math.floor(tank1.position.y / this.mapa1.tileSize) ){
                this.powArray.splice(i,1);
                tank1.life+=3;
                if(tank1.life>tank1.maxLife)
                    tank1.life=tank1.maxLife;
            }else if(this.powArray[i].y == Math.floor(tank2.position.x / this.mapa1.tileSize) && this.powArray[i].x == Math.floor(tank2.position.y / this.mapa1.tileSize) ){
                this.powArray.splice(i,1);
                tank2.life+=3;
                if(tank2.life>tank2.maxLife)
                    tank2.life=tank2.maxLife;
                
            }
        }
    }

    generatePowerup(dt, level){
        this.timer += dt;
        // console.log(this.timer);
        if(this.timer > 150){
            this.timer = 0;
            var posx = Math.floor(Math.random()* (this.mapa1.mapSize.y -2)) + 1;
            var posy = Math.floor(Math.random()* (this.mapa1.mapSize.x -2)) + 1;
            
            
            // console.log(this.mapa1.MapArray[0][10][2]);
            while(this.mapa1.MapArray[level][posx][posy]!=0){
                posx = Math.floor(Math.random()* (this.mapa1.mapSize.y -2)) + 1;
                posy = Math.floor(Math.random()* (this.mapa1.mapSize.x -2)) + 1;
            }

            this.powArray.push({x : posx, y : posy});
            // console.log(this.powArray);
        }
            
    }


    draw(){
        for(var i in this.powArray){

            Canvas.context.save();
            Canvas.context.translate(this.mapa1.tileSize*this.powArray[i].y, this.mapa1.tileSize*this.powArray[i].x );
            Canvas.context.drawImage(Sprites.medkit, 0,0);
            Canvas.context.restore();
        }
    }
}