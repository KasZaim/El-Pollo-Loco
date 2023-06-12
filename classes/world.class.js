class World {
    ctx;
    canvas; 
    character = new Character();
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ]
    clouds = [
        new cloud()
    ]

    constructor(canvas){
        this.canvas =  canvas; //übergibt der canvas; variable den parameter canvas
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    
    draw() {
        let self = this;
        this.ctx.clearRect (0, 0, this.canvas.width,this.canvas.height) // Canvas wird entleert
        
        this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width ,this.character.height)
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img,enemy.x,enemy.y,enemy.width ,enemy.height)
        });
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img,cloud.x,cloud.y,cloud.width ,cloud.height)
        });
        requestAnimationFrame(function(){
            self.draw();
        })
    }
}