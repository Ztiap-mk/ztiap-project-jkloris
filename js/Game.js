class Game{         
    constructor(flag){
    }

    init(){
        this.game_world = new Gameworld();
        this.menu = new Menu();
        this.instrukcie = new Instrukcie();
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
        }else if(flag == 2){
            TankTrouble.instrukcie.update();
            TankTrouble.instrukcie.draw();
        }
        
        requestAnimationFrame(()=>TankTrouble.mainLoop()); //spýtať sa aký je rozdiel ked tam nieje lambda func
    }
}


let flag = 1;
let TankTrouble = new Game();