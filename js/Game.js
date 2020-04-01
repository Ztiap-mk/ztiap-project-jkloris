class Game{         
    constructor(flag){
    }

    init(){
        this.game_world = new Gameworld();
        this.menu = new Menu();
    }
    
    start(){
    
    TankTrouble.init();
    
    TankTrouble.mainLoop();
    
    }

    mainLoop (){
        Canvas.clear();

        if(flag == 0){
            TankTrouble.game_world.update();
            TankTrouble.game_world.draw();      
        }else if(flag == 1){
            TankTrouble.menu.update();
            TankTrouble.menu.draw();
        }
        
        requestAnimationFrame(TankTrouble.mainLoop);
    }
}


let flag = 1;
let TankTrouble = new Game();