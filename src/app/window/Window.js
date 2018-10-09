import React from 'react';

import * as types from '../constants/windowTypes';
import Start from './Start';
import ChooseLevel from './ChooseLevel';
import Game from '../game/Game';
import ChooseCar from './ChooseCar';


const Window = ({ appState, handlers }) => {
  const changeWindow = handlers.changeWindowHandler;
  
  switch (appState.currentWindow) {
    case types.CHOOSE_LEVEL: {
      const { chooseLevelHandler } = handlers;
      const onClick = i => () => {
        chooseLevelHandler(i);
        changeWindow(types.CHOOSE_CAR)();
      };
      return (
        <ChooseLevel
          onClickHandler={onClick}
          backClickHandler={changeWindow(types.START)}
        />
      );
    }
    case types.CHOOSE_CAR: {
      const { changePlayerCarHandler } = handlers;
      return (
        <ChooseCar
          changePlayerCarHandler={changePlayerCarHandler}
          backClickHandler={changeWindow(types.CHOOSE_LEVEL)}
          forwardClickHandler={changeWindow(types.GAME)}
        />
      );
    }
    case types.GAME: {
      const { doc, playerCar} = appState;
      return (
        <Game
          playerCar={playerCar}
          doc={doc}
        />)
    }
    case types.START:
    default: {
      return (
        <Start onClickHandler={changeWindow(types.CHOOSE_LEVEL)}/>
      )
    }
    
  }
};

export default Window;