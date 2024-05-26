import React, { useState } from 'react'
import { CircularInput, CircularProgress, CircularThumb, CircularTrack } from 'react-circular-input';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";


interface RightNavProps {
    currentOrientation: number;
    requestOrientation: number;
    setRequestOrientation: any;
}

const RightNav: React.FC<RightNavProps> = ({ currentOrientation, requestOrientation, setRequestOrientation }) => {
    const [RightNav, setRightNav] = useState(false)
    return (
        <div className='fixed flex items-center right-0 top-0 h-screen'>
            {/* Orientation */}
            <div className='flex flex-col justify-center items-center px-6 py-8 bg-slate-900 rounded-r-lg relative'>
                {RightNav ?
                    <p className=' my-4 font-mono'>Update Orientation</p>
                    :
                    null
                }

                {RightNav ?
                    <div className='flex flex-col items-center justify-center'>
                        <img style={{ transform: `rotate(${Math.round(currentOrientation * 360)}deg)`, transformOrigin: 'center' }} className={`w-32`} src={'./Crank.png'} />
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='flex flex-col justify-center items-center'>
                        <CircularInput className='w-32' value={requestOrientation} onChange={setRequestOrientation}>
                            <CircularTrack strokeWidth={1} />
                            <CircularThumb r={10} />
                            <text x={100} y={100} fill='white' textAnchor="middle" dy="0.3em" fontWeight="bold">
                                {Math.round(requestOrientation * 360)}°
                            </text>
                        </CircularInput>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div>
                        <span className='bg-amber-500 px-6 py-1.5 rounded-md text-sm cursor-pointer shadow hover:bg-amber-600'>Update</span>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div onClick={()=>setRightNav(false)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -left-5 rounded-full'>
                        <FaAngleDoubleRight />
                    </div>
                    :
                    <div onClick={()=>setRightNav(true)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -left-5 rounded-full'>
                        <FaAngleDoubleLeft />
                    </div>
                }

            </div>
        </div>
    )
}

export default RightNav