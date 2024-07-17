import React from 'react';
import { Row } from "./Row";

interface Tile {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface MapProps {
  columns: number;
  rows: number;
  blockers: Tile[];
  open: Tile[];
  road: Tile[];
  goal: Position;
  path: Tile[];
  userPosition: Position;
  setTileAsBlocker: any;
  isSetting: boolean;
  isGoalSetting: boolean;
  isStartSetting: boolean;
  setIsAuto : any;
  onSetGoal: any;
  onSetStart: any;
  setCoordinateSet: any;
  roboPos: any
}

export const Map: React.FC<MapProps> = ({
  columns,
  rows,
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
  roboPos,
  onSetGoal,
  onSetStart
}) => {
  const rowsToRender = new Array(rows).fill(0);

  const getRowValue = (tiles: Tile[], index: number): Tile[] => {
    return tiles.filter((tile) => tile.x === index);
  };

  return (
    <div className="">
      {rowsToRender.map((_, index) => (
        <Row
        key={index}
          x={index}
          columns={columns}
          blockers={getRowValue(blockers, index)}
          open={getRowValue(open, index)}
          road={getRowValue(road, index)}
          path={getRowValue(path, index)}
          goal={goal.x === index ? goal : 0}
          userPosition={userPosition}
          setTileAsBlocker={setTileAsBlocker}
          isSetting={isSetting}
          isStartSetting={isStartSetting}
          isGoalSetting={isGoalSetting}
          // custom params
          roboPos={roboPos}
          setIsAuto={setIsAuto}
          setCoordinateSet={setCoordinateSet}
          onSetStart={onSetStart}
          onSetGoal={onSetGoal}
        />
      )).reverse()}
    </div>
  );
};
