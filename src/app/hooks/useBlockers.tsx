import { useState } from 'react'
import { maps } from '../constants/maps';
import '../Components/Tile.css'

export const useBlockers = ({ dimension }:any) => {
    const [blockers, setBlockers] = useState([]);

    const calculateBlockers = () => {
        const calculate = () => {
            const coordinate = Math.round(Math.random() * dimension)
            if (coordinate !== 0)
                return coordinate - 1;
            return coordinate
        }
        return new Array(dimension * 8).fill(0).map(() => ({
            x: calculate(),
            y: calculate(),
        }))
            .filter(({ x, y }) => (x !== 0 && y !== 0))
            .filter(({ x, y }) => (x !== dimension - 1 && y !== dimension - 1))
    }

    const setBlockersBasedOnGeneratedMap = (mapName) => {
        const blockersInMap = [];
        maps[mapName].reverse().forEach((row, yIndex) => {
            row.forEach((tile, xIndex) => {
                if(tile === '-') return;
                blockersInMap.push({ x: yIndex, y: xIndex })
            })
        })
        setBlockers(blockersInMap)
    }

    const setBlockersOnMap = () => {
        setBlockers(calculateBlockers());
    }

    const setTileAsBlocker = (tile) => {
        setBlockers((prevState) => prevState.concat(tile));
    }

    return {
        setBlockersOnMap,
        blockers,
        setTileAsBlocker,
        setBlockersBasedOnGeneratedMap
    }
}
