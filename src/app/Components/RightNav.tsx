import React, { useState } from 'react'
import { CircularInput, CircularProgress, CircularThumb, CircularTrack } from 'react-circular-input';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";


interface RightNavProps {
    rxMsg : any
}

const RightNav: React.FC<RightNavProps> = ({ rxMsg }) => {
    const [RightNav, setRightNav] = useState(false)
    const [batteryTemperature, setBatteryTemperature] = useState(0)
    const [batteryCapacity, setBatteryCapacity] = useState(0)
    const [loadWeight, setLoadWeight] = useState(0)
    const [status, setStatus] = useState(0)
    const [coordinate, setCoordinate] = useState([0,0,0])
    return (
        <div className='fixed flex items-center right-0 top-0 h-screen'>
            {/* Orientation */}
            <div className='flex flex-col justify-center items-center px-6 py-8 bg-slate-900 rounded-l-2xl relative'>

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Battery Temperature</p>
                        <p className='text-3xl font-bold mt-1'>{batteryTemperature ? batteryTemperature : 0} <span className='text-xs'>C</span></p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Battery Capacity</p>
                        <p className='text-3xl font-bold mt-1'>{batteryCapacity ? batteryCapacity : 0} <span className='text-xs'>%</span></p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Load Weight</p>
                        <p className='text-3xl font-bold mt-1'>{loadWeight ? loadWeight : 0} <span className='text-xs'>kg</span></p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Status</p>
                        <p className='text-xl font-bold mt-1'>{status ? status : 0}</p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Position</p>
                        <p className='text-xl font-bold mt-1'>{coordinate ? `[${coordinate[0]}, ${coordinate[1]}, ${coordinate[2]}]` : 0}</p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div onClick={()=>setRightNav(false)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -left-5 rounded-full'>
                        <FaAngleDoubleRight />
                    </div>
                    :
                    <div onClick={()=>setRightNav(true)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -left-2 rounded-full'>
                        <FaAngleDoubleLeft />
                    </div>
                }

            </div>
        </div>
    )
}

export default RightNav