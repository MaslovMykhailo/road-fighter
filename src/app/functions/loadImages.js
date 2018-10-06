import carImg from '../../img/car.png';

export const cars = [carImg].map(imgSrc => {
  const newImg = new Image();
  newImg.src = imgSrc;
  return newImg;
});

export const onLoad = Promise.all(cars
  .map(img => new Promise(resolve => img.onload = () => resolve()))
);

