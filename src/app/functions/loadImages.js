import playerCar1 from '../../img/playerCars/playerCar1.png';
import playerCar2 from '../../img/playerCars/playerCar2.png';
import playerCar3 from '../../img/playerCars/playerCar3.png';

import botCar1 from '../../img/botCars/car1.png';
import botCar2 from '../../img/botCars/car2.png';
import botCar3 from '../../img/botCars/car3.png';
import botCar4 from '../../img/botCars/car4.png';

const createImages = srcArray => srcArray.map(imgSrc => {
  const newImg = new Image();
  newImg.src = imgSrc;
  return newImg;
});

export const playerCars = createImages([playerCar1, playerCar2, playerCar3]);

export const botCars = createImages([botCar1, botCar3, botCar2, botCar4]);

export const onLoad = Promise.all(playerCars.concat(botCars)
  .map(img => new Promise(resolve => img.onload = () => resolve()))
);

