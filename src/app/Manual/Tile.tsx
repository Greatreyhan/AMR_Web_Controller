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
  onSetStart: any;
  onSetGoal: any;
}

export const MemoTile: FC<MemoTileProps> = ({
  item,
  isBlocker,
  isOpen,
  isRoad,
  isGoal,
  isPath,
  isUserPosition,
  setTileAsBlocker,
  isSetting,
  isGoalSetting,
  isStartSetting,
  setIsAuto,
  setCoordinateSet,
  onSetStart,
  onSetGoal
}) => {
  const classes = isBlocker ? 'block_tile' : 'tile';
  const isVisitedClass = isOpen ? 'is_open' : '';
  const isRoadClass = isRoad ? 'is_road' : '';
  const isGoalClass = isGoal ? 'is_goal' : '';
  const isUserPositionClass = isUserPosition ? 'is_user' : '';
  const isPathClass = isPath ? 'is_path' : '';
  const isTentativeClass = isOpen && (isOpen as any).IS_TENTATIVE_BETTER ? 'is_tentative' : '';

  const memoIsRoadClass = useMemo(() => isRoadClass, [isRoadClass]);
  const memoIsGoalClass = useMemo(() => isGoalClass, [isGoalClass]);
  const memoIsVisitedClass = useMemo(() => isVisitedClass, [isVisitedClass]);

  const resolveClickBehaviour = () => {
    if (isStartSetting) {
      onSetStart({ x: item.x, y: item.y });
    }
    if (isGoalSetting) {
      onSetGoal({ x: item.x, y: item.y });
    }
    if (isSetting) {
      setTileAsBlocker({ x: item.x, y: item.y });
    }
    setIsAuto(true)
    setCoordinateSet({ x: item.x, y: item.y });
    
    return false;
  };

  return (
    <div
      onClick={resolveClickBehaviour}
      className={`size ${classes} ${memoIsVisitedClass} ${memoIsRoadClass} ${memoIsGoalClass} ${isUserPositionClass} ${isPathClass} ${isTentativeClass}`}
    />
  );
};

export const Tile = React.memo(MemoTile);
