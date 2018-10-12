import React from 'react';

import * as types from '../constants/windowTypes';
import Start from './Start';
import ChooseLevel from './ChooseLevel';
import Game from '../game/Game';
import ChooseCar from './ChooseCar';
import Instruction from './Instruction';
import Finish from './Finish';


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
          forwardClickHandler={changeWindow(types.INSTRUCTION)}
          playerCar={appState.playerCar}
        />
      );
    }
    case types.INSTRUCTION: {
      return (
        <Instruction
          backClickHandler={changeWindow(types.CHOOSE_CAR)}
          onClickHandler={changeWindow(types.GAME)}
        />
      )
    }
    case types.GAME: {
      const { playerFinishedHandler } = handlers;
      const { doc, playerCar } = appState;
      
      const playerFinished = (time, collisions) => {
        playerFinishedHandler(time, collisions);
        changeWindow(types.FINISH)();
      };
      
      return (
        <Game
          playerCar={playerCar}
          doc={doc}
          playerFinished={playerFinished}
        />)
    }
    case types.FINISH: {
      const { currentResult, bestResults, level } = appState;
      const { chooseLevelHandler } = handlers;
      const nextLevelHandler = () => {
        chooseLevelHandler(level+1);
        changeWindow(types.CHOOSE_CAR)();
      };
      
      return (
        <Finish
          level={level}
          currentResult={currentResult}
          bestResults={bestResults}
          chooseLevelHandler={changeWindow(types.CHOOSE_LEVEL)}
          nextLevelHandler={nextLevelHandler}
        />
      )
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