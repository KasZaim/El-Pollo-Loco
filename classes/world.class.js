class World {
    ctx;
    canvas;
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ]
    character = new Character();

    constructor(canvas){
        this.canvas =  canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    
    draw() {
        let self = this;
        this.ctx.clearRect (0, 0, this.canvas.width,this.canvas.height)
        
        this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width ,this.character.height)
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img,enemy.x,enemy.y,enemy.width ,enemy.height)
        });
        requestAnimationFrame(function(){
            self.draw();
        })
    }
}