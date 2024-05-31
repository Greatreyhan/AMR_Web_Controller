import { useState, useEffect } from 'react';
import {
  doCalculations,
  removeUndefined,
  evaluateTilesFromOpen,
  removeCurrentPositionFromOpen,
  removeBlockerTilesFromOpen,
} from '../utils/evaluateCalculations';
import { getMinCostTiles, getMinHCostTile, getMinCostTile } from '../utils/calculateDistance';

interface Tile {
  x: number;
  y: number;
  parent?: Tile | null;
}

interface Goal {
  x: number;
  y: number;
}

interface Player {
  x: number;
  y: number;
}

interface Blocker {
  x: number;
  y: number;
}

type MoveFunction = (tile: Tile) => void;

export const useRoad = (
  goal: Goal,
  player: Player,
  blockers: Blocker[],
  count: number,
  move: MoveFunction,
  withNeighbourEvaluation: boolean
) => {
  const [road, setRoad] = useState<Tile[]>([player]);
  const [path, setPath] = useState<Tile[]>([]);

  const {
    leftTile,
    rightTile,
    topTile,
    bottomTile,
    topLeftTile,
    topRightTile,
    bottomLeftTile,
    bottomRightTile,
  } = doCalculations(player, [], goal);

  const uniques = removeUndefined([
    leftTile,
    rightTile,
    topTile,
    bottomTile,
    topLeftTile,
    topRightTile,
    bottomLeftTile,
    bottomRightTile,
  ]);

  const [neighbours, setCurrentNeighbours] = useState<Tile[]>(evaluateTilesFromOpen(uniques, road));
  const [open, setOpen] = useState<Tile[]>(evaluateTilesFromOpen(uniques, road));

  const isGoalReached = (position: Tile | undefined) => position && position.x === goal.x && position.y === goal.y;

  useEffect(() => {
    const {
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
      neighbours,
    } = doCalculations(player, open, goal);

    const newUniques = removeUndefined([
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    ]);

    const newNeighbours = removeUndefined([
      neighbours.leftTile,
      neighbours.rightTile,
      neighbours.bottomTile,
      neighbours.topTile,
      neighbours.topLeftTile,
      neighbours.topRightTile,
      neighbours.bottomLeftTile,
      neighbours.bottomRightTile,
    ]);

    const parseData = (uniques: Tile[], prevState: Tile[] = []) => {
      const uniquesWithoutRoadTiles = evaluateTilesFromOpen(uniques, road.concat(player));
      const withoutBlocker = removeBlockerTilesFromOpen(uniquesWithoutRoadTiles, blockers);
      const withoutCurrentPlace = removeCurrentPositionFromOpen(prevState.concat(withoutBlocker), player);
      return withoutCurrentPlace;
    };

    setCurrentNeighbours(parseData(newNeighbours));
    setOpen((prevState) => parseData(newUniques, prevState));
  }, [player.x, player.y]);

  const findLowestCostTile = () => {
    const { minArray, min } = getMinCostTiles(open);

    if (withNeighbourEvaluation) {
      const neighboursCosts = getMinCostTiles(neighbours);

      if (neighboursCosts.min < min) {
        if (neighboursCosts.minArray.length > 1) {
          return getMinHCostTile(neighboursCosts.minArray);
        }
        return getMinCostTile(neighbours, neighboursCosts.min);
      }
    }

    if (minArray.length > 1) {
      return getMinHCostTile(minArray);
    }
    return getMinCostTile(open, min);
  };

  useEffect(() => {
    if (count > 0 && !isGoalReached(road[road.length - 1])) {
      const nextTile: any= findLowestCostTile();
      move(nextTile);
      setRoad((prevState) => prevState.concat(nextTile));
    }
  }, [count]);

  const resolvePath = (start: Tile) => {
    let tempPath: Tile[] = [];
    const getParent = (tile: Tile) => {
      if (!tile.parent) return;
      tempPath.push(tile.parent);
      getParent(tile.parent);
    };
    getParent(start);
    setPath(tempPath);
  };

  const setFinalPath = () => {
    resolvePath(road[road.length - 1]);
  };

  const clearRoad = (newPlayerPosition: Player) => setRoad([newPlayerPosition]);

  const clearOpen = (newPlayerPosition: Player) => {
    const {
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    } = doCalculations(newPlayerPosition, [], goal);

    const uniques = removeUndefined([
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    ]);

    setOpen(evaluateTilesFromOpen(uniques, [newPlayerPosition]));
  };

  const clearNeighbours = (newPlayerPosition: Player) => {
    const {
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    } = doCalculations(newPlayerPosition, [], goal);

    const uniques = removeUndefined([
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    ]);

    setCurrentNeighbours(evaluateTilesFromOpen(uniques, [newPlayerPosition]));
  };

  const clearAll = (newPlayerPosition: Player) => {
    clearRoad(newPlayerPosition);
    clearOpen(newPlayerPosition);
    clearNeighbours(newPlayerPosition);
  };

  return {
    open,
    road,
    path,
    setFinalPath,
    isGoalReached,
    clearAll,
  };
};
