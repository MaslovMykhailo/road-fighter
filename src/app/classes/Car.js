class Car {
  constructor(width, height, img) {
    this.img = img;
    this.width = width;
    this.height = height;
  }
  
  draw(ctx, x, y) {
    ctx.beginPath();
    
    ctx.drawImage(this.img, x, y, this.width, this.height);
    
    ctx.closePath();
  }
}

export default Car;