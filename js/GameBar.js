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
    constructor(position, size, color){
        super(position, size, color);
    
    }

    drawBar(life){
        Canvas.context.beginPath();
        Canvas.context.fillStyle = this.color;
        Canvas.context.strokeStyle = "black";
        Canvas.context.lineWidth = "5";
        Canvas.context.fillRect(this.position.x, this. position.y, this.size.x / 4 * life, this.size.y);
        Canvas.context.rect(this.position.x, this. position.y, this.size.x, this.size.y);
        Canvas.context.stroke();
        Canvas.context.fillStyle = "black";
        Canvas.context.font = "20px Arial";
        Canvas.context.fillText("Health",this.position.x + 70, this. position.y + 60 );
    }
}