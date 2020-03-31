class Game{         


    init(){
        this.game_world = new Gameworld();
    }
    
    start(){
    
    TankTrouble.init();
    
    TankTrouble.mainLoop();
    
    }

    mainLoop (){
        Canvas.clear();
        TankTrouble.game_world.update();
        TankTrouble.game_world.draw();   
        
        requestAnimationFrame(TankTrouble.mainLoop);
        
    }
}







let TankTrouble = new Game();