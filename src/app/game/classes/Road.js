class Road {
  constructor(width, height, long) {
    this.width = width;
    this.height = long * height;
    this.long = long;
    this.canvasHeight = height;
    this.shift = 0;
  }
  
  drawText(ctx, text, fontSize, color, x, y) {
    ctx.fillStyle = color;
    ctx.font = fontSize + 'px serif';
    ctx.fillText(text, x, y);
  }
  
  addShift(diff) {
    this.shift += diff;
  }
  
  drawMarking(ctx, start, end, width, height, interval) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = width;
    ctx.setLineDash([height, interval]);
    
    let centerX = this.width / 2 - width/2;
    
    ctx.moveTo(centerX, start);
    ctx.lineTo(centerX, end);
    ctx.stroke();
  }
  
  drawPavement(ctx) {
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 0, this.width, this.canvasHeight);
  }
  
  draw(ctx) {
    ctx.save();
    
    ctx.beginPath();
    this.drawPavement(ctx);
    ctx.translate(0, this.shift);
    this.drawMarking(ctx, -this.height + 2*this.canvasHeight, 0.5 / this.long * this.height, 4, 30, 35);
    this.drawText(ctx, 'START', 48, '#ffffff', this.width/2 - 75, 0.6 / this.long * this.height);
    this.drawText(ctx, 'FINISH', 48, '#ffffff', this.width/2 - 80, -this.height + 1.8*this.canvasHeight);
    this.drawMarking(ctx, -this.height + 1.6*this.canvasHeight, -this.height - this.canvasHeight, 4, 30, 35);
    ctx.closePath();
    
    ctx.restore();
  }
}

export default Road;