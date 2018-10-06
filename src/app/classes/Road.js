class Road {
  constructor(width, height) {
    this.width = width;
    this.height = 10 * height;
    
    this.shift = 0;
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
    ctx.fillStyle = '#6d6d6d';
    ctx.fillRect(0, -(0.9) * this.height, this.width, this.height);
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(0, this.shift);
    
    ctx.beginPath();
    this.drawPavement(ctx);
    this.drawMarking(ctx, -(0.9) * this.height, 0.1 * this.height, 4, 30, 35);
    ctx.closePath();
    
    ctx.restore();
  }
  
  
}

export default Road;