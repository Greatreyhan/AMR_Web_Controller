'use client'
import React, { useEffect, useState, useRef } from 'react';
import './page.css';
import { Map } from '../Components/Map';
import { useBlockers } from '../hooks/useBlockers';
import { usePlayer } from '../hooks/useUser';
import { useRoad } from '../hooks/useRoad';
import { useGoalAndStart } from '../hooks/useGoalAndStart';
import { DIMENSION } from '../constants';
import LeftNav from '../Components/LeftNav';
import RightNav from '../Components/RightNav';

interface AstarProps {
    rows: number;
    cols: number;
    rxMsg : any;
    currentPosition: Array<number>;
    mqttPublish: Function;
    dataKinematika: Array<number>;
    dataEnvironment: Array<number>;
}

const Astar: React.FC<AstarProps> = ({ rows, cols, currentPosition, mqttPublish, dataKinematika, dataEnvironment, rxMsg }) => {
    const [count, setCount] = useState(0); // frames

    const [currentOrientation, setCurrentOrientation] = useState(0)
    const [requestOrientation, setRequestOrientation] = useState(0)

    const [withNeighbourEvaluation, setWithNeighbourEvaluation] = useState(true);

    const { start, goal, setStart, setGoal, isStartSetting, isGoalSetting, setIsGoalSetting, setIsStartSetting } = useGoalAndStart();
    const { player, move, extendUserData } = usePlayer(start);
    const {
        blockers,
        setBlockersOnMap,
        setTileAsBlocker,
        setBlockersBasedOnGeneratedMap,
    } = useBlockers({ dimension: DIMENSION });
    const {
        open,
        road,
        path,
        setFinalPath,
        isGoalReached,
        clearAll
    } = useRoad(
        goal,
        player,
        blockers,
        count,
        move,
        withNeighbourEvaluation
    );
    const [isSetting, setIsSetting] = useState(false);
    const positionRef = useRef(player)

    // updating position based on frame (count)
    /* eslint-disable */
    useEffect(() => {
        positionRef.current = player;
        setFinalPath()

        //////////////////////////////////////////////// Inference to send the path //////////////////////////////////
        if(isGoalReached(positionRef.current)){
            console.log(path)
        }

    }, [count])
    /* eslint-enable */

    const moveByOneTile = () => setCount((prevState) => prevState + 1);

    const moveToLowestCost = () => {
        
        //////////////////////////////////////////////// Inference per-Step //////////////////////////////////
        const handler = setInterval(() => {
            if (isGoalReached(positionRef.current)) {
                clearInterval(handler);
                return
            }

            moveByOneTile()
        }, 1);
    }

    const onSetStart = (position: any) => {
        clearAll({ ...position, ...extendUserData });
        setStart(position)
        setIsStartSetting(false)
    }
    const onSetGoal = (position: any) => {
        setGoal(position)
        setIsGoalSetting(false);
    }

    const editStartPosition = () => {
        setIsStartSetting(true);
        setIsSetting(false);
        setIsGoalSetting(false);
    }

    const editGoalPosition = () => {
        setIsStartSetting(false);
        setIsSetting(false);
        setIsGoalSetting(true);
    }


    return (
        <div className="Astar pt-32 flex flex-col justify-center items-center w-full">

            <div className='my-6 flex gap-x-5'>
                <button className='px-6 py-1.5 bg-amber-500 uppercase font-semibold rounded' onClick={moveToLowestCost}>move</button>
                <button className='px-6 py-1.5 bg-amber-500 uppercase font-semibold rounded' onClick={() => window.location.reload()}>reload</button>
            </div>
            <div className="Astar-header flex justify-center w-full">

                <div className="Astar-content flex justify-center w-full">
                    <div className="flex flex-col fixed items-start left-0">
                        <button className='bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' onClick={setBlockersOnMap}>set blockers</button>
                        <button className='bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' onClick={() => setIsSetting(true)}>set blockers individually</button>
                        <button className={withNeighbourEvaluation ? 'with-condition bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' : 'bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm'} onClick={() => setWithNeighbourEvaluation((prevState) => !prevState)}>with neighbours evaluation</button>
                    </div>
                    <div className='flex-1 flex justify-center'>
                        <Map
                            columns={DIMENSION}
                            rows={DIMENSION}
                            blockers={blockers}
                            open={open}
                            road={road}
                            path={path}
                            goal={goal}
                            userPosition={player}
                            setTileAsBlocker={setTileAsBlocker}
                            isSetting={isSetting}
                            isStartSetting={isStartSetting}
                            isGoalSetting={isGoalSetting}
                            onSetStart={onSetStart}
                            onSetGoal={onSetGoal}
                        />
                    </div>
                    <div className="flex flex-col items-end fixed right-0">
                        <button className='bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' onClick={() => setBlockersBasedOnGeneratedMap('wall')}>wall</button>
                        <button className='bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' onClick={() => setBlockersBasedOnGeneratedMap('mrmap')}>MR map</button>
                        <button className='bg-amber-500 hover:bg-amber-600 font-semibold px-6 py-1.5 my-1 rounded uppercase text-sm' onClick={() => setBlockersBasedOnGeneratedMap('something')}>labyrinth</button>
                    </div>
                </div>

            </div>
            <div className='flex gap-5'>
                <button className='px-6 py-1.5 bg-amber-500 uppercase font-semibold rounded' disabled={isStartSetting} onClick={editStartPosition}>set start</button>
                <button className='px-6 py-1.5 bg-amber-500 uppercase font-semibold rounded' disabled={isGoalSetting} onClick={editGoalPosition}>set goal</button>
            </div>

            {/* <LeftNav currentOrientation={currentOrientation} requestOrientation={requestOrientation} setRequestOrientation={setRequestOrientation} />
            <RightNav rxMsg={rxMsg} /> */}
        </div>
    );
}

export default Astar;
