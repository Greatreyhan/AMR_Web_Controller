import React, { useState, useEffect } from 'react'
import { CircularInput, CircularProgress, CircularThumb, CircularTrack } from 'react-circular-input';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";


interface LeftNavProps {
    currentOrientation: number;
    requestOrientation: number;
    setRequestOrientation: any;
    rxMsg: any;
}

const LeftNav: React.FC<LeftNavProps> = ({ currentOrientation, requestOrientation, setRequestOrientation, rxMsg }) => {
    const initialBNO08x = {
        yaw: 0,
        pitch: 0,
        roll: 0,
        x_acceleration: 0,
        y_acceleration: 0,
        z_acceleration: 0,
      };

    const [coordinate, setCoordinate] = useState([0,0,0])
    const [BNO08X, setBNO08X] = useState(initialBNO08x)

    const checksum_pc_generator = (packet:any) => {
        const sum = packet.reduce((acc:any, byte:any) => acc + byte, 0);
        return sum & 0xFF;
    };

    const parseKinematicPacket = (hexString:string) => {
        // Convert the hex string to a byte array
        const packet = [];
        for (let i = 0; i < hexString.length; i += 2) {
            packet.push(parseInt(hexString.substr(i, 2), 16));
        }

    
        // Extract and parse kinematic values
        const Sx = (packet[3] << 8) | packet[4];
        const Sy = (packet[5] << 8) | packet[6];
        const St = (packet[7] << 8) | packet[8];
        const T = (packet[9] << 8) | packet[10];
    
        const KinematicData = {
            Sx,
            Sy,
            St,
            T
        };
        setCoordinate([KinematicData.Sx,KinematicData.Sy,KinematicData.St])
        // console.log(KinematicData);
        return KinematicData;
    }

    const parseBNO08XPacket = (hexString:string) => {
        // Convert the hex string to a byte array
        const packet = [];
        for (let i = 0; i < hexString.length; i += 2) {
            packet.push(parseInt(hexString.substr(i, 2), 16));
        }
    
        // Extract and parse sensor values
        const parseValue = (highByte:any, lowByte:any) => {
            const value = (highByte << 8) | lowByte;
            return highByte & 0x80 ? value - 65536 : value;
        };
    
        const BNO08x = {
            yaw: parseValue(packet[3], packet[4]),
            pitch: parseValue(packet[5], packet[6]),
            roll: parseValue(packet[7], packet[8]),
            x_acceleration: parseValue(packet[9], packet[10]),
            y_acceleration: parseValue(packet[11], packet[12]),
            z_acceleration: parseValue(packet[13], packet[14]),
        };
    
        // console.log(BNO08x);
        setBNO08X(BNO08x)
        return BNO08x;
    };

    useEffect(()=>{
        if(rxMsg[4] == '0' && rxMsg[5] == '5'){
            parseKinematicPacket(rxMsg)
        }
        else if(rxMsg[4] == '0' && rxMsg[5] == '2'){
            parseBNO08XPacket(rxMsg)
        }
    },[rxMsg])

    const [leftNav, setLeftNav] = useState(false)
    return (
        <div className='fixed flex items-center left-0 top-0 h-screen z-50'>
            {/* Orientation */}
            <div className='flex flex-col justify-center items-center px-6 py-8 bg-slate-900 rounded-r-2xl relative'>
                {leftNav ?
                    <p className=' mb-4'>Update Orientation</p>
                    :
                    null
                }

                {leftNav ?
                    <div className='flex flex-col items-center justify-center'>
                        <img style={{ transform: `rotate(${Math.round(BNO08X.yaw/100)}deg)`, transformOrigin: 'center' }} className={`w-24`} src={'./Crank.png'} />
                        <p>{Math.round(BNO08X.yaw/100)}</p>
                    </div>
                    :
                    null
                }

                {leftNav ?
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

                {leftNav ?
                    <div className='text-center mb-4'>
                        <p className='text-xs'>IMU</p>
                        <p className='text-xl font-bold mt-1'>{BNO08X ? `[${Math.round(BNO08X.roll/100)}, ${Math.round(BNO08X.pitch/100)}, ${Math.round(BNO08X.yaw/100)}]` : 0}</p>
                    </div>
                    :
                    null
                }
                
                {leftNav ?
                    <div>
                        <span className='bg-amber-500 px-6 py-1.5 rounded-md text-sm cursor-pointer shadow hover:bg-amber-600'>Update</span>
                    </div>
                    :
                    null
                }


                {leftNav ?
                    <div onClick={()=>setLeftNav(false)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -right-5 rounded-full'>
                        <FaAngleDoubleLeft />
                    </div>
                    :
                    <div onClick={()=>setLeftNav(true)} className='bg-amber-500 cursor-pointer px-5 py-5 absolute -right-2 rounded-full'>
                        <FaAngleDoubleRight />
                    </div>
                }


            </div>
        </div>
    )
}

export default LeftNav