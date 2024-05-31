import React from 'react';
import { Row } from "./Row";
import './Map.css';

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
  setTileAsBlocker: (x: number, y: number) => void;
  isSetting: boolean;
  isGoalSetting: boolean;
  isStartSetting: boolean;
  onSetGoal: (x: number, y: number) => void;
  onSetStart: (x: number, y: number) => void;
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
  onSetGoal,
  onSetStart
}) => {
  const rowsToRender = new Array(rows).fill(0);

  const getRowValue = (tiles: Tile[], index: number): Tile[] => {
    return tiles.filter((tile) => tile.x === index);
  };

  return (
    <div className="map">
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
          onSetStart={onSetStart}
          onSetGoal={onSetGoal}
        />
      )).reverse()}
    </div>
  );
};
