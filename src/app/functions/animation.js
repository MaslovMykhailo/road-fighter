export default (options) => {
  requestAnimationFrame(function animate() {
    options.animateFunc();
    
    if (options.conditionalFunc()) {
      requestAnimationFrame(animate);
    } else {
      options.endAnimateFunc && options.endAnimateFunc();
    }
  });
};