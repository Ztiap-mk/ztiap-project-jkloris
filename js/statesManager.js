class stateManager{
    constructor(){
        this.currentState = null;
        this.states = {};
        
    }
    eventHandler = {
        keyInput : [],
        mouseX : -1,
        mouseY: -1,
    };

    init(){
        this.input_init();
        this.states = {
        
            GameWorld : new Gameworld(this.eventHandler),
            mainMenu  : new Menu(this.eventHandler),
            instrukcie : new Instrukcie(this.eventHandler),
        };
        this.currentState = this.states.mainMenu;
    }

    update(){
        this.changeState();
        this.currentState.update();
        //console.log(this.eventHandler.mouseY);  
    }

    draw(){
        this.currentState.draw();    
    }

    changeState(){
        if(flag == 0) this.currentState = this.states.mainMenu;
        if(flag == 1) this.currentState = this.states.GameWorld;
        if(flag == 2) this.currentState = this.states.instrukcie;
        this.currentState.init();
    }

    input_init(){
        document.addEventListener('keydown', (event)=> {
            event.preventDefault();
            if(event.keyCode != 81 && event.keyCode !=77) 
                this.eventHandler.keyInput[event.keyCode] = 1;
        });

        document.addEventListener('keyup', (event)=> {
            if(event.keyCode == 81)
                this.eventHandler.keyInput[81] = 1;
            if(event.keyCode == 77)
                    this.eventHandler.keyInput[77] = 1;
            else if(event.keyCode != 81)  this.eventHandler.keyInput[event.keyCode] = 0;
        });
        
        document.addEventListener("click",(e)=>{
            this.eventHandler.mouseX = e.clientX;
            this.eventHandler.mouseY = e.clientY; 
            console.log(this.eventHandler.mouseX);
        })
    }


}