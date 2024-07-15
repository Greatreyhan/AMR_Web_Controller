import React from 'react';
import { Tile } from './Tile';

interface TileProps {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface MemoRowProps {
  x: number;
  columns: number;
  blockers: TileProps[];
  open: TileProps[];
  road: TileProps[];
  goal: Position | any;
  path: TileProps[];
  userPosition: Position;
  setTileAsBlocker: (x: number, y: number) => void;
  isSetting: boolean;
  isGoalSetting: boolean;
  isStartSetting: boolean;
  setIsAuto: any;
  setCoordinateSet: (x: number, y: number) => void;
  onSetGoal: (x: number, y: number) => void;
  onSetStart: (x: number, y: number) => void;
}

const MemoRow: React.FC<MemoRowProps> = ({
  x,
  columns,
  blockers,
  open,
  road,
  goal,
  path,
  userPosition,
  setTileAsBlocker,
  isSetting,
  isGoalSetting,
  isStartSetting,
  setIsAuto,
  setCoordinateSet,
  onSetGoal,
  onSetStart,
}) => {
  const columnsToRender = new Array(columns).fill(x);

  const isOpen = (y: number): boolean => {
    return open.length > 0 && !!open.find((visitedTile) => visitedTile.y === y);
  };

  const isBlocker = (y: number): boolean => {
    return blockers.length > 0 && !!blockers.find((blocker) => blocker.y === y);
  };

  const isRoad = (y: number): boolean => {
    return road.length > 0 && !!road.find((roadTile) => roadTile.y === y);
  };

  const isGoal = (y: number): boolean => {
    return goal && goal.y === y;
  };

  const isPath = (y: number): boolean => {
    return path.length > 0 && !!path.find((pathTile) => pathTile.y === y);
  };

  const isUserPosition = (x: number, y: number): boolean => {
    return userPosition.x === x && userPosition.y === y;
  };

  return (
    <div className="flex">
      {columnsToRender
        .map((item, index) => ({ x: item, y: index }))
        .map((item, index) => {
          return (
            <Tile
              key={`${item.x}_${item.y}`}
              item={item}
              isBlocker={isBlocker(item.y)}
              isOpen={isOpen(item.y)}
              isRoad={isRoad(item.y)}
              isGoal={isGoal(item.y)}
              isPath={isPath(item.y)}
              isUserPosition={isUserPosition(item.x, item.y)}
              setTileAsBlocker={setTileAsBlocker}
              isSetting={isSetting}
              isStartSetting={isStartSetting}
              isGoalSetting={isGoalSetting}
              setIsAuto={setIsAuto}
              setCoordinateSet={setCoordinateSet}
              onSetStart={onSetStart}
              onSetGoal={onSetGoal}
            />
          );
        })}
    </div>
  );
};

export const Row = React.memo(MemoRow);
