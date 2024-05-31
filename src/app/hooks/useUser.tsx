import { useState, useEffect } from 'react';
import { letCalculateLowerPosition, letCalculateHigherPosition } from '../utils/evaluateCalculations';

interface Position {
  x: number;
  y: number;
  gCost?: number;
  parent?: Position | null;
}

interface UsePlayerReturn {
  player: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  move: (position: Position) => void;
  extendUserData: {
    gCost: number;
    parent: null;
  };
}

export const usePlayer = (startingPoint: Position): UsePlayerReturn => {
  const extendUserData = {
    gCost: 0,
    parent: null,
  };

  const [player, setPosition] = useState<Position>({
    ...startingPoint,
    ...extendUserData,
  });

  useEffect(() => {
    setPosition((prevValue:any) => ({
      ...prevValue,
      x: startingPoint.x,
      y: startingPoint.y,
    }));
  }, [startingPoint.x, startingPoint.y]);

  function setListenToArrows() {
    document.addEventListener('keyup', function(event) {
      const up = 'ArrowUp';
      const down = 'ArrowDown';
      const left = 'ArrowLeft';
      const right = 'ArrowRight';
      switch (event.code) {
        case up: {
          setPosition((prevValue:any) => ({
            ...prevValue,
            x: letCalculateHigherPosition(prevValue),
          }));
          break;
        }
        case down: {
          setPosition((prevValue:any) => ({
            ...prevValue,
            x: letCalculateLowerPosition(prevValue),
          }));
          break;
        }
        case left: {
          setPosition((prevValue:any) => ({
            ...prevValue,
            y: letCalculateLowerPosition(prevValue),
          }));
          break;
        }
        case right: {
          setPosition((prevValue:any) => ({
            ...prevValue,
            y: letCalculateHigherPosition(prevValue),
          }));
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  const move = (position: Position) => {
    setPosition(position);
  };

  useEffect(() => {
    setListenToArrows();
  }, []);

  return {
    player,
    setPosition,
    move,
    extendUserData,
  };
};
