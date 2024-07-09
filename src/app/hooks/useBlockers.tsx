import { useState } from 'react';
import { maps } from '../constants/maps';
import '../Components/Tile.css';

interface DimensionProps {
  dimension: number;
}

interface Tile {
  x: number;
  y: number;
}

export const useBlockers = ({ dimension }: DimensionProps) => {
  const [blockers, setBlockers] = useState<Tile[]>([]);

  const calculateBlockers = (): Tile[] => {
    const calculate = (): number => {
      const coordinate = Math.round(Math.random() * dimension);
      if (coordinate !== 0) return coordinate - 1;
      return coordinate;
    };
    return new Array(dimension * 8)
      .fill(0)
      .map(() => ({
        x: calculate(),
        y: calculate(),
      }))
      .filter(({ x, y }) => x !== 0 && y !== 0)
      .filter(({ x, y }) => x !== dimension - 1 && y !== dimension - 1);
  };

  const setBlockersBasedOnMapState = (mapState: any) => {
    const blockersInMap: Tile[] = [];
    mapState.forEach((row: string[], yIndex: number) => {
      row.forEach((tile: string, xIndex: number) => {
        if (tile === '-') return;
        blockersInMap.push({ x: yIndex, y: xIndex });
      });
    });
    setBlockers(blockersInMap);
  };

  const setBlockersBasedOnGeneratedMap = (mapName: string) => {
    const blockersInMap: Tile[] = [];
    maps[mapName].reverse().forEach((row: string[], yIndex: number) => {
      row.forEach((tile: string, xIndex: number) => {
        if (tile === '-') return;
        blockersInMap.push({ x: yIndex, y: xIndex });
      });
    });
    setBlockers(blockersInMap);
  };

  const setBlockersOnMap = () => {
    setBlockers(calculateBlockers());
  };

  const setTileAsBlocker = (tile: Tile) => {
    setBlockers((prevState) => prevState.concat(tile));
  };

  return {
    setBlockersOnMap,
    blockers,
    setTileAsBlocker,
    setBlockersBasedOnGeneratedMap,
    setBlockersBasedOnMapState
  };
};
