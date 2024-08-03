import React, { useMemo, FC } from 'react';

interface MemoTileProps {
  item: { x: number, y: number };
  isBlocker: boolean;
  isOpen: boolean;
  isRoad: boolean;
  isGoal: boolean;
  isPath: boolean;
  isUserPosition: boolean;
  setTileAsBlocker: any;
  isSetting: boolean;
  isGoalSetting: boolean;
  isStartSetting: boolean;
  setIsAuto: any;
  setCoordinateSet: any;
  setOffsetData : any;
  isOffset: any,
  isRackSetting: any;
  setRackCenter: any;
  onSetStart: any;
  onSetGoal: any;
  isRoboPos: boolean;
}

export const MemoTile: FC<MemoTileProps> = ({
  item,
  isBlocker,
  isOpen,
  isRoad,
  isGoal,
  isPath,
  isUserPosition,
  isRoboPos,
  setTileAsBlocker,
  isSetting,
  isGoalSetting,
  isRackSetting,
  setRackCenter,
  isStartSetting,
  setIsAuto,
  setCoordinateSet,
  setOffsetData,
  isOffset,
  onSetStart,
  onSetGoal
}) => {
  const classes = isBlocker ? 'block_tile' : 'tile';
  const isVisitedClass = isOpen ? 'is_open' : '';
  const isRoadClass = isRoad ? 'is_road' : '';
  const isGoalClass = isGoal ? 'is_goal' : '';
  const isUserPositionClass = isUserPosition ? 'is_user' : '';
  const isRoboPosClass = isRoboPos ? 'is_robopos' : '';
  const isPathClass = (isPath && !isRoboPos) ? 'is_path' : '';
  const isTentativeClass = isOpen && (isOpen as any).IS_TENTATIVE_BETTER ? 'is_tentative' : '';

  const memoIsRoadClass = useMemo(() => isRoadClass, [isRoadClass]);
  const memoIsGoalClass = useMemo(() => isGoalClass, [isGoalClass]);
  const memoIsVisitedClass = useMemo(() => isVisitedClass, [isVisitedClass]);

  const resolveClickBehaviour = () => {
    if (isStartSetting) {
      onSetStart({ x: item.x, y: item.y });
      console.log('start')
    }
    else if(isOffset){
      setOffsetData({ x: item.x, y: item.y })
      console.log('offset')
    }
    else if(isRackSetting){
      setRackCenter({ x: item.x, y: item.y })
      console.log('rack')
    }
    else if(isSetting) {
      setTileAsBlocker({ x: item.x, y: item.y });
    }

    else{
      setIsAuto(true)
      setCoordinateSet({ x: item.x, y: item.y });
    }
    
    return false;
  };

  return (
    <div
      onClick={resolveClickBehaviour}
      className={`size ${classes} ${memoIsVisitedClass} ${memoIsRoadClass} ${memoIsGoalClass} ${isUserPositionClass} ${isPathClass} ${isTentativeClass} ${isRoboPosClass}`}
    />
  );
};

export const Tile = React.memo(MemoTile);
