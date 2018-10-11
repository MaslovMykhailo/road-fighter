import playerCar1 from '../../img/playerCars/playerCar1.png';
import playerCar2 from '../../img/playerCars/playerCar2.png';
import playerCar3 from '../../img/playerCars/playerCar3.png';

import botCar1 from '../../img/botCars/car1.png';
import botCar2 from '../../img/botCars/car2.png';
import botCar3 from '../../img/botCars/car3.png';
import botCar4 from '../../img/botCars/car7.png';
import botCar5 from '../../img/botCars/car5.png';
import botCar6 from '../../img/botCars/car6.png';
import botCar7 from '../../img/botCars/car4.png';
import botCar8 from '../../img/botCars/car8.png';

import tree1 from '../../img/trees/tree1.png';
import tree2 from '../../img/trees/tree2.png';

import building1 from '../../img/buildings/house1.png';
import building2 from '../../img/buildings/house2.png';
import building3 from '../../img/buildings/house3.png';
import building4 from '../../img/buildings/house4.png';

import start from '../../img/progress/start.png';
import finish from '../../img/progress/finish.png';

const createImages = srcArray => srcArray.map(imgSrc => {
  const newImg = new Image();
  newImg.src = imgSrc;
  return newImg;
});

export const playerCars = createImages([playerCar1, playerCar2, playerCar3]);

export const botCars = createImages([botCar1, botCar3, botCar2, botCar4, botCar5, botCar6, botCar7, botCar8]);

export const trees = createImages([tree1, tree2]);

export const buildings = createImages([building1, building2, building3, building4]);

export const progressImg = createImages([start, finish]);

export const onLoad = Promise.all(playerCars.concat(botCars, trees, buildings, progressImg)
  .map(img => new Promise(resolve => img.onload = () => resolve()))
);

