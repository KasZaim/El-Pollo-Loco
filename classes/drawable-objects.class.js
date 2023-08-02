class DrawableObjects {
    img;
    imageCache = {};
    currrentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the object.
     */
    draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}
/**
     * Loads an image from the given path and sets it as the object's image.
     * @param {string} path - The file path of the image to load.
     */
loadImg(path) {
    this.img = new Image();
    this.img.src = path;
}
/**
     * Loads multiple images into the image cache for later use.
     * @param {string[]} arr - An array of file paths of the images to load.
     */
loadImages(arr) {
    arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}
/**
     * Draws a frame around the drawable object to indicate its boundaries (for debugging purposes).
     * Only certain object types will have a frame drawn around them.
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the frame.
     */
drawFrame(ctx) {
    if (this instanceof Character || this instanceof chicken || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof Bottles || this instanceof Coins || this instanceof BabyChicken) {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + this.offset.x , this.y + this.offset.y,(this.x + this.width - this.offset.width) - (this.x + this.offset.x),(this.y + this.height - this.offset.height) - (this.y + this.offset.y));
        ctx.stroke();
    }
    
}
}
