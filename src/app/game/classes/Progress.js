class Progress {
  constructor(width, height, long, imgs) {
    this.width = width;
    this.height = height;
    this.long = long;
    this.shift = 0;
    
    this.startImg = imgs.start;
    this.finishImg = imgs.finish;
    this.playerCarImg = imgs.playerCarImg;
  }
  
  setShift(newShift) {
    this.shift = newShift;
  }
  
  drawCar(ctx) {
    let y = 0.83 * this.height - 0.71 * this.shift / this.long;
    ctx.drawImage(this.playerCarImg, 12, y, 26, 45);
  }
  
  draw(ctx) {
    ctx.beginPath();
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 5, this.height);
    ctx.fillRect(this.width-5, 0, 5, this.height);
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(5, 0, this.width-10, this.height);
  
    this.drawCar(ctx);
    ctx.drawImage(this.startImg, 5, this.height*0.8, 40, 40);
    ctx.drawImage(this.finishImg, 5, this.height*0.1, 40, 40);
    
    ctx.closePath();
  }
}

export default Progress;