const rectIntersection = (rect1, rect2) => {
  let x1min = rect1[0];
  let y1max = rect1[1];
  let x1max = x1min + rect1[2];
  let y1min = y1max - rect1[3];
  
  let x2min = rect2[0];
  let y2max = rect2[1];
  let x2max = x2min + rect2[2];
  let y2min = y2max - rect2[3];
  
  return !(x1max < x2min || x2max < x1min || y1max < y2min || y2max < y1min);
};

export default (playerCar, botCars) => {
  for (let i = 0; i < 4 ; i++) {
    const { positionX, positionY, width, height } = botCars[i];
    if (rectIntersection(
      [playerCar.positionX, playerCar.positionY, playerCar.width, playerCar.height],
      [positionX, positionY, width, height])
    ) {
      return i;
    }
  }
  
  return null;
};

