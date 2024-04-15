'use client'
import React, { useState } from 'react'
import './grid_styles.css'
interface GridProps {
    rows: number;
    cols: number;
    currentPosition: Array<number>;
}

const Grid: React.FC<GridProps> = ({ rows, cols, currentPosition }) => {
    const [requestPosition, setRequestPosition] = useState(currentPosition)
    const [hover, setHover] = useState([0, 0])

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
        gap: '2px',
    };

    const handleRequestPosition = (x: number, y: number) => {
        setRequestPosition([x, y])
    }

    const handleHoverData = (x: number, y: number) => {
        setHover([x, y])
    }

    const renderGrid = () => {
        const grid = [];
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                grid.push(
                    <div key={`${x}-${y}`} onMouseOver={() => handleHoverData(x, y)} onClick={() => handleRequestPosition(x, y)} className={`grid-cell ${(x == currentPosition[0] && y == currentPosition[1]) ? `bg-yellow-600` : (x == requestPosition[0] && y == requestPosition[1]) ? `bg-yellow-800` : `hover:bg-slate-700 bg-slate-800`}  cursor-pointer `}>
                    </div>
                );
            }
        }
        return grid;
    };

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Data Kinematika</p>
                    <div>
                    {/* Data Posisi */}
                    {currentPosition ?
                        <>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={0}>{32}</span>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={1}>{15}</span>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={2}>{20}</span>
                        </>
                        : null}

                    {/* Data Kecepatan */}
                    {currentPosition ?
                        <>
                            <span className='bg-red-600 px-3 py-1 mx-1' key={0}>{32}</span>
                            <span className='bg-red-600 px-3 py-1 mx-1' key={1}>{15}</span>
                            <span className='bg-red-600 px-3 py-1 mx-1' key={2}>{20}</span>
                        </>
                        : null}

                    {/* Data Posisi IPS */}
                    {currentPosition ?
                        <>
                            <span className='bg-blue-600 px-3 py-1 mx-1' key={0}>{32}</span>
                            <span className='bg-blue-600 px-3 py-1 mx-1' key={1}>{15}</span>
                        </>
                        : null}

                    {/* Data Orientasi BNO08X */}
                    {currentPosition ?
                        <>
                            <span className='bg-purple-600 px-3 py-1 mx-1' key={0}>{32}</span>                        </>
                        : null}
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Data Environment</p>
                    {requestPosition ?
                        <div>
                            <span className='bg-green-800 px-3 py-1 mx-1' key={0}>{15}</span>
                            <span className='bg-green-700 px-3 py-1 mx-1' key={1}>{15}</span>
                            <span className='bg-green-600 px-3 py-1 mx-1' key={2}>{20}</span>
                            <span className='bg-green-500 px-3 py-1 mx-1' key={3}>{27}</span>
                            <span className='bg-green-400 px-3 py-1 mx-1' key={4}>{27}</span>
                        </div>
                        : null}
                </div>
            </div>
            <div className="grid" style={gridStyles}>{renderGrid()}</div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Current Position</p>
                    {currentPosition ?
                        <div>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={currentPosition[0]}>{currentPosition[0]}</span>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={currentPosition[1]}>{currentPosition[1]}</span>
                        </div>
                        : null}
                </div>

                <div className='flex flex-col'>
                    {hover ?
                        <div>
                            <span className='bg-slate-800 px-3 py-1 mx-1' key={hover[0]}>{hover[0]}</span>
                            <span className='bg-slate-800 px-3 py-1 mx-1' key={hover[1]}>{hover[1]}</span>
                        </div>
                        : null}
                </div>

                <div className='flex flex-col'>
                    <p className='mx-1 my-2 text-xs font-mono'>Request Position</p>
                    {requestPosition ?
                        <div>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={requestPosition[0]}>{requestPosition[0]}</span>
                            <span className='bg-yellow-600 px-3 py-1 mx-1' key={requestPosition[1]}>{requestPosition[1]}</span>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );
};


export default Grid