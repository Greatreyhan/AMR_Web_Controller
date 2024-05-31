import { addCosts } from './calculateDistance';
import { DIMENSION } from "../constants";

interface Position {
  x: number;
  y: number;
  status?: string;
}

export const letCalculateLowerPosition = (coordinate: number): number => {
  if (coordinate <= 0) {
    return -1;
  }
  return coordinate - 1;
};

export const letCalculateHigherPosition = (coordinate: number): number => {
  if (coordinate >= DIMENSION - 1) {
    return -1;
  }
  return coordinate + 1;
};

export const evaluateTilesFromOpen = (open: Position[], road: Position[]): Position[] => {
  let array = open;
  road.forEach((roadTile) => {
    array = array.filter((openTile) => openTile.x !== roadTile.x || openTile.y !== roadTile.y);
  });
  return array.map((item) => ({ ...item, status: 'waiting' }));
};

export const removeBlockerTilesFromOpen = (open: Position[], blockers: Position[]): Position[] => {
  let array = open;
  blockers.forEach((blockerTile) => {
    array = array.filter((openTile) => openTile.x !== blockerTile.x || openTile.y !== blockerTile.y);
  });
  return array;
};

export const removeCurrentPositionFromOpen = (open: Position[], currentPosition: Position): Position[] => {
  return open.filter((openTile) => openTile.x !== currentPosition.x || openTile.y !== currentPosition.y);
};

const checkIfCanReturn = (item: Position): any => {
  if (item.x === -1 || item.y === -1) {
    return undefined;
  }
  return item;
};

const checkIfAlreadyAddedToOpen = (item: Position | undefined, open: Position[]): Position | undefined => {
  if (!item) return;
  if (open.find((openItem) => openItem.x === item.x && openItem.y === item.y)) {
    return undefined;
  }
  return item;
};

export const evaluateRestTiles = (open: Position[]): Position[] => {
  return open.map((item) => {
    if (item.status === 'waiting') {
      return {
        ...item,
        status: 'skipped',
      };
    }
    return item;
  });
};

export const removeUndefined = (array: (Position | undefined)[]): Position[] => {
  return array.filter((item): item is Position => !!item);
};

interface DoCalculationsResult {
  leftTile: Position | undefined;
  rightTile: Position | undefined;
  topTile: Position | undefined;
  bottomTile: Position | undefined;
  topLeftTile: Position | undefined;
  topRightTile: Position | undefined;
  bottomLeftTile: Position | undefined;
  bottomRightTile: Position | undefined;
  neighbours: {
    leftTile: Position | undefined;
    rightTile: Position | undefined;
    topTile: Position | undefined;
    bottomTile: Position | undefined;
    topLeftTile: Position | undefined;
    topRightTile: Position | undefined;
    bottomLeftTile: Position | undefined;
    bottomRightTile: Position | undefined;
  };
}

export const doCalculations = (player: any, open: Position[], goal: Position): DoCalculationsResult => {
  const check = (tile: Position | undefined) => checkIfAlreadyAddedToOpen(tile, open);

  const leftTile = addCosts(
    checkIfCanReturn({ x: letCalculateLowerPosition(player.x), y: player.y }),
    goal,
    player
  );
  const rightTile = addCosts(
    checkIfCanReturn({ x: letCalculateHigherPosition(player.x), y: player.y }),
    goal,
    player
  );
  const topTile = addCosts(
    checkIfCanReturn({ x: player.x, y: letCalculateHigherPosition(player.y) }),
    goal,
    player
  );
  const bottomTile = addCosts(
    checkIfCanReturn({ x: player.x, y: letCalculateLowerPosition(player.y) }),
    goal,
    player
  );
  const topLeftTile = addCosts(
    checkIfCanReturn({ x: letCalculateLowerPosition(player.x), y: letCalculateHigherPosition(player.y) }),
    goal,
    player
  );
  const topRightTile = addCosts(
    checkIfCanReturn({ x: letCalculateHigherPosition(player.x), y: letCalculateHigherPosition(player.y) }),
    goal,
    player
  );
  const bottomLeftTile = addCosts(
    checkIfCanReturn({ x: letCalculateLowerPosition(player.x), y: letCalculateLowerPosition(player.y) }),
    goal,
    player
  );
  const bottomRightTile = addCosts(
    checkIfCanReturn({ x: letCalculateHigherPosition(player.x), y: letCalculateLowerPosition(player.y) }),
    goal,
    player
  );

  return {
    leftTile: leftTile && check(leftTile),
    rightTile: rightTile && check(rightTile),
    topTile: topTile && check(topTile),
    bottomTile: bottomTile && check(bottomTile),
    topLeftTile: topLeftTile && check(topLeftTile),
    topRightTile: topRightTile && check(topRightTile),
    bottomLeftTile: bottomLeftTile && check(bottomLeftTile),
    bottomRightTile: bottomRightTile && check(bottomRightTile),
    neighbours: {
      leftTile,
      rightTile,
      topTile,
      bottomTile,
      topLeftTile,
      topRightTile,
      bottomLeftTile,
      bottomRightTile,
    },
  };
};
