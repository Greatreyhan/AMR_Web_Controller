'use client'
import React, { useState } from 'react'
import './grid_styles.css'
import LeftNav from '../Components/LeftNav';
import RightNav from '../Components/RightNav';
interface GridProps {
    rows: number;
    cols: number;
    rxMsg : any;
    currentPosition: Array<number>;
    mqttPublish: Function;
    dataKinematika: Array<number>;
    dataEnvironment: Array<number>;
}

const Grid: React.FC<GridProps> = ({ rows, cols, currentPosition, mqttPublish, dataKinematika, dataEnvironment, rxMsg }) => {
    const [requestPosition, setRequestPosition] = useState(currentPosition)
    const [hover, setHover] = useState([0, 0])
    const [requestOrientation, setRequestOrientation] = useState(0)
    const [currentOrientation, setCurrentOrientation] = useState(0)


    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gap: '2px',
    };

    const handleRequestPosition = (x: number, y: number) => {
        setRequestPosition([x, y])
        const xpos = Math.abs(x) >= 100 ? `${x}` : Math.abs(x) >= 10 ? `0${x}` : `00${x}`
        const ypos = Math.abs(y) >= 100 ? `${y}` : Math.abs(y) >= 10 ? `0${y}` : `00${y}`
        const ori = Math.abs(Math.round(requestOrientation*360)) >= 100 ? `${Math.abs(Math.round(requestOrientation*360))}` : Math.abs(Math.round(requestOrientation*360)) >= 10 ? `0${Math.abs(Math.round(requestOrientation*360))}` : `00${Math.abs(Math.round(requestOrientation*360))}`
        const step = '0001'
        const msg = `AA${x >= 0 ? 'P' : 'N'}${xpos}${y >= 0 ? 'P' : 'N'}${ypos}O${ori}S${step}`
        mqttPublish(msg)
    }

    const handleHoverData = (x: number, y: number) => {
        setHover([x, y])
    }

    const renderGrid = () => {
        const grid = [];
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                grid.push(
                    <div key={`${x}-${y}`} onMouseOver={() => handleHoverData(x, y)} onClick={() => handleRequestPosition(x, y)} className={`grid-cell ${(x == currentPosition[0] && y == currentPosition[1]) ? `bg-none` : (x == requestPosition[0] && y == requestPosition[1]) ? `bg-yellow-800` : `hover:bg-slate-700 bg-slate-800`}  cursor-pointer `}>
                        {(x == currentPosition[0] && y == currentPosition[1]) ?
                            <img style={{ transform: `rotate(${Math.round(currentOrientation * 360)}deg)`, transformOrigin: 'center' }} className={`w-5`} src={'./Pointer.png'} />
                            : null}
                    </div>
                );
            }
        }
        return grid;
    };

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Data Kinematika</p>
                    <div>
                        {/* Data Posisi */}
                        {currentPosition ?
                            <>
                                <span className='bg-red-800 px-3 py-1 mx-1' key={0}>{dataKinematika[0]}</span>
                                <span className='bg-red-800 px-3 py-1 mx-1' key={1}>{dataKinematika[1]}</span>
                                <span className='bg-red-800 px-3 py-1 mx-1' key={2}>{dataKinematika[2]}</span>
                            </>
                            : null}

                        {/* Data Kecepatan */}
                        {currentPosition ?
                            <>
                                <span className='bg-red-700 px-3 py-1 mx-1' key={0}>{dataKinematika[3]}</span>
                                <span className='bg-red-700 px-3 py-1 mx-1' key={1}>{dataKinematika[4]}</span>
                                <span className='bg-red-700 px-3 py-1 mx-1' key={2}>{dataKinematika[5]}</span>
                            </>
                            : null}

                        {/* Data Posisi IPS */}
                        {currentPosition ?
                            <>
                                <span className='bg-red-600 px-3 py-1 mx-1' key={0}>{dataKinematika[6]}</span>
                                <span className='bg-red-600 px-3 py-1 mx-1' key={1}>{dataKinematika[7]}</span>
                            </>
                            : null}

                        {/* Data Orientasi BNO08X */}
                        {currentPosition ?
                            <>
                                <span className='bg-red-500 px-3 py-1 mx-1' key={0}>{dataKinematika[8]}</span>                        </>
                            : null}
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Data Environment</p>
                    {requestPosition ?
                        <div>
                            {/* Tegangan */}
                            <span className='bg-green-800 px-3 py-1 mx-1' key={0}>{dataEnvironment[0]}</span>
                            {/* Arus */}
                            <span className='bg-green-700 px-3 py-1 mx-1' key={1}>{dataEnvironment[1]}</span>
                            {/* Suhu */}
                            <span className='bg-green-600 px-3 py-1 mx-1' key={2}>{dataEnvironment[2]}</span>
                            {/* Kelembapan */}
                            <span className='bg-green-500 px-3 py-1 mx-1' key={3}>{dataEnvironment[3]}</span>
                            {/* LoadCell */}
                            <span className='bg-green-400 px-3 py-1 mx-1' key={4}>{dataEnvironment[4]}</span>
                        </div>
                        : null}
                </div>
            </div>

            {/* Grid */}
            <div className="grid" style={gridStyles}>{renderGrid()}</div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Current Position</p>
                    <div>
                        {currentPosition.map((element, i) => {
                            return (<span className='bg-blue-700 px-3 py-1 mx-1' key={i}>{element}</span>)
                        })
                        }
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <p className='mx-1 my-2 text-xs font-mono'>Pointer</p>
                    <div>
                        {hover.map((element, i) => {
                            return (<span className='bg-blue-700 px-3 py-1 mx-1' key={i}>{element}</span>)
                        })
                        }
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Request Position</p>
                    <div>
                        {requestPosition.map((element, i) => {
                            return (<span className='bg-blue-700 px-3 py-1 mx-1' key={i}>{element}</span>)
                        })
                        }
                    </div>
                </div>
            </div>

            <LeftNav currentOrientation={currentOrientation} requestOrientation={requestOrientation} setRequestOrientation={setRequestOrientation} />
            <RightNav rxMsg={rxMsg} />

        </div>
    );
};


export default Grid