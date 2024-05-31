import { useState, useEffect } from 'react';
import {
    doCalculations,
    removeUndefined,
    evaluateTilesFromOpen,
    removeCurrentPositionFromOpen,
    removeBlockerTilesFromOpen,
} from '../utils/evaluateCalculations';
import { getMinCostTiles, getMinHCostTile, getMinCostTile } from '../utils/calculateDistance';


export const useRoad = (goal, player, blockers, count, move, withNeighbourEvaluation) => {
    const [road, setRoad] = useState([player]);
    const [path, setPath] = useState([]);
    // initial tiles
    const {
        leftTile,
        rightTile,
        topTile,
        bottomTile,
        topLeftTile,
        topRightTile,
        bottomLeftTile,
        bottomRightTile,
    } = doCalculations(player, [], goal)
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

    const [neighbours, setCurrentNeighbours] = useState(evaluateTilesFromOpen(uniques, road));
    const [open, setOpen] = useState(evaluateTilesFromOpen(uniques, road));
    const isGoalReached = (position) => position && position.x === goal.x && position.y === goal.y

    // update area based on new position
    /* eslint-disable */
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
        } = doCalculations(player, open, goal)
        const newUniques = removeUndefined([
            leftTile,
            rightTile,
            topTile,
            bottomTile,
            topLeftTile,
            topRightTile,
            bottomLeftTile,
            bottomRightTile,
        ])
        const newNeighbours = removeUndefined([
            neighbours.leftTile,
            neighbours.rightTile,
            neighbours.bottomTile,
            neighbours.topTile,
            neighbours.topLeftTile,
            neighbours.topRightTile,
            neighbours.bottomLeftTile,
            neighbours.bottomRightTile,
        ])
        const parseData = (uniques, prevState = []) => {
            const uniquesWithoutRoadTiles = evaluateTilesFromOpen(uniques, road.concat(player));
            const withoutBlocker = removeBlockerTilesFromOpen(uniquesWithoutRoadTiles, blockers);
            const withoutCurrentPlace = removeCurrentPositionFromOpen(prevState.concat(withoutBlocker), player);
            return withoutCurrentPlace
        }
        setCurrentNeighbours(parseData(newNeighbours));
        setOpen((prevState) => parseData(newUniques, prevState))
    }, [player.x, player.y])
    /* eslint-enable */


    const findLowestCostTile = () => {
        const { minArray, min } = getMinCostTiles(open);

        if(withNeighbourEvaluation) { // evaluating only neighbour tiles
            const neighboursCosts = getMinCostTiles(neighbours);

            if(neighboursCosts.min < min) {
                if(neighboursCosts.minArray.length > 1) {
                    return getMinHCostTile(neighboursCosts.minArray);
                }
                return getMinCostTile(neighbours, neighboursCosts.min);
            }
        }

        if(minArray.length > 1) {
            return getMinHCostTile(minArray);
        }
        return getMinCostTile(open, min);
    }

    /* eslint-disable */
    useEffect(() => {
        if(count > 0 && !isGoalReached(road[road.length - 1])) {
            const nextTile = findLowestCostTile();
            move(nextTile)
            setRoad((prevState) => prevState.concat(nextTile))
        }
    }, [count])
    /* eslint-enable */


    const resolvePath = (start) => {
        let tempPath = []
        const getParent = (tile) => {
            if (tile.parent === null) return;
            tempPath.push(tile.parent);
            getParent(tile.parent)
        }
        getParent(start);
        setPath(tempPath);
        // console.log(tempPath)
    }

    const setFinalPath = () => {
        resolvePath(road[road.length - 1]);
    }

    const clearRoad = (newPlayerPostition) => setRoad([newPlayerPostition])
    const clearOpen = (newPlayerPostition) => {
        const {
            leftTile,
            rightTile,
            topTile,
            bottomTile,
            topLeftTile,
            topRightTile,
            bottomLeftTile,
            bottomRightTile,
        } = doCalculations(newPlayerPostition, [], goal)
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
        setOpen(evaluateTilesFromOpen(uniques, [newPlayerPostition]))
    }
    const clearNeighbours = (newPlayerPostition) => {
        const {
            leftTile,
            rightTile,
            topTile,
            bottomTile,
            topLeftTile,
            topRightTile,
            bottomLeftTile,
            bottomRightTile,
        } = doCalculations(newPlayerPostition, [], goal)
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
        setCurrentNeighbours(evaluateTilesFromOpen(uniques, [newPlayerPostition]))
    }
    const clearAll = (newPlayerPostition) => {
        clearRoad(newPlayerPostition);
        clearOpen(newPlayerPostition);
        clearNeighbours(newPlayerPostition);
    }

    return {
        open,
        road,
        path,
        setFinalPath,
        isGoalReached,
        clearAll,
    }
}
