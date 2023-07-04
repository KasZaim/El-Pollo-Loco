class DrawableObjects {
    img;
    imageCache = {};
    currrentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}

loadImg(path) {
    this.img = new Image();
    this.img.src = path;
}

loadImages(arr) {
    arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}

drawFrame(ctx) {
    if (this instanceof Character || this instanceof chicken || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof Bottles || this instanceof Coins) {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + this.offset.x , this.y + this.offset.y,(this.x + this.width - this.offset.width) - (this.x + this.offset.x),(this.y + this.height - this.offset.height) - (this.y + this.offset.y));
        ctx.stroke();
    }
    
}
}
