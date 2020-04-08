class Gameworld{
    constructor(eventHandler){
        this.tank = new Tank({x: 200, y: 200}, 0 , {x: 25, y: 50});
        this.tank2 = new Tank2({x: 400, y: 200}, 0 , {x: 25, y: 50})
        this.mapa1 = new Mapa();
        this.vybuch = new Explosion();
        this.gameBar = new GameBar({x:0, y : 10*64}, {x : 1216, y : 100 }, "rgb(224, 224, 184)");    
        this.healthBar = new HealthBar({x:500, y : 10*64 + 10 }, {x : 200, y : 40 }, "red");
        //this.buttonSound = new Sound({x: 1100, y: 620},{x: 64, y: 64});

        
        this.time = Date.now();
        this.dt = 0;
        this.keyInput = eventHandler.keyInput;
       // this.mouseX = -1;
        //this.mouseY = -1;
    

    }

    init(){
        //this.input_init()
        //this.tank.reset();
    }

           

                
    update(){
        this.dt = ( Date.now()- this.time ) / 100;
        this.time = Date.now();

        //this.input();
        //this.buttonSound.update(this.mouseX, this.mouseY);
        this.tank.update(this.keyInput, this.dt);     
        this.tank2.update(this.keyInput, this.dt);
        this.CollisionCheck_Shot(this.tank.strely, this.tank2);
        this.CollisionCheck_Shot(this.tank2.strely, this.tank);
        
        if(this.CollisionCheck_Tank(this.tank) == 0 ){
            this.tank.position.x = this.tank.positionOld.x;
            this.tank.position.y = this.tank.positionOld.y;
            
            this.tank.rotation = this.tank.rotationOld;
        }
        
        this.Death(this.tank);
        this.Death(this.tank2);
        this.mouseX = -1;
        this.mouseY = -1;
    }
    
    draw(){
        Canvas.drawImage(Sprites.background, {x : 0, y : 0});
        this.mapa1.drawMap();
        this.tank.drawShots();
        this.tank2.drawShots();
        this.tank.draw(); 
        this.tank2.draw();
        this.gameBar.drawBar();
        this.healthBar.drawBar(this.tank.life);
       // this.buttonSound.draw();

        if(this.vybuch.counter > 0){
            this.vybuch.drawExplosion(this.vybuch.position, Math.floor(this.vybuch.counter / 3)*0.25);
            this.vybuch.counter--;
        }

        }

    CollisionCheck_Shot(pole, tank){
        if(pole.length > 0){

            var pos = {X : 0, Y : 0};
            for(var i = 0; i < pole.length; i++){       
                pos.Y = Math.floor(pole[i].y  / this.mapa1.tileSize);
                pos.X = Math.floor(pole[i].x / this.mapa1.tileSize) ;
                if(this.mapa1.MapArray[pos.Y][pos.X] == 1){
                    this.vybuch.counter = 20;
                    this.vybuch.position = pole[i];                    
                    
                    pole.splice(i,1);
                
                } else if(this.hitDetection(tank, pole[i]) == 1){
                    this.vybuch.counter = 20;
                    this.vybuch.position = pole[i];                    
                    tank.life--;
                    pole.splice(i,1);
                }
            }
            return  pos;
            
        }
    }

    CollisionCheck_Tank(tank){
        var rt = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var lt = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var rb = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }
        var lb = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
                , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
            }    

        if( this.mapa1.MapArray[Math.floor(rt.y / this.mapa1.tileSize)][Math.floor(rt.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[Math.floor(lt.y / this.mapa1.tileSize)][Math.floor(lt.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[Math.floor(rb.y / this.mapa1.tileSize)][Math.floor(rb.x / this.mapa1.tileSize)] == 1 ||
            this.mapa1.MapArray[Math.floor(lb.y / this.mapa1.tileSize)][Math.floor(lb.x / this.mapa1.tileSize)] == 1  ){
            
            return 0 ;
            }
    }


    hitDetection(tank, raketa){
    var f = 0;

    var rt = {x : tank.position.x +  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
            , y : tank.position.y + Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x - Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
        }
    
    var lb = {x : tank.position.x -  Math.cos(tank.rotation* Math.PI / 180)*tank.origin.x - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.y 
            , y : tank.position.y - Math.sin(tank.rotation* Math.PI / 180)*tank.origin.x + Math.cos(tank.rotation* Math.PI / 180)*tank.origin.y 
        } 
        
        if(rt.x > lb.x) {
            if(rt.x>= raketa.x && lb.x <= raketa.x)  f= 1;
        } else{
            if(rt.x<= raketa.x && lb.x >= raketa.x)  f= 1;
        }
        
        if(f == 1 && rt.y > lb.y){
            if(rt.y>= raketa.y && lb.y <= raketa.y) return 1;
        } else if(f == 1 && rt.y <= lb.y){
            if(rt.y<= raketa.y && lb.y >= raketa.y) return 1;    
        }
        
        return 0;
    }

    Death(tank){
        if(tank.life <=0){
            this.vybuch.counter = 40;
            this.vybuch.position = tank.position;
            tank.life = 0.01;
        }
    }
    
}
