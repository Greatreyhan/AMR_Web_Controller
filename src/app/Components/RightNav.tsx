import React, { useEffect, useState } from 'react'
import { CircularInput, CircularProgress, CircularThumb, CircularTrack } from 'react-circular-input';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdBattery90 } from "react-icons/md";


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
    
    //------------------------------------------------- PARSING DATA --------------------------------------------------------------------//
    const checksum_pc_generator = (packet:any) => {
        const sum = packet.reduce((acc:any, byte:any) => acc + byte, 0);
        return sum & 0xFF;
    };

    const parseSensorPacket = (hexString:string) => {
        // Convert the hex string to a byte array
        const packet = [];
        for (let i = 0; i < hexString.length; i += 2) {
            packet.push(parseInt(hexString.substr(i, 2), 16));
        }
    
        // Extract and parse sensor values
        const sensor = {
            temperature: (packet[3] << 8) | packet[4],
            humidity: (packet[5] << 8) | packet[6],
            current: (packet[7] << 8) | packet[8],
            voltage: (packet[9] << 8) | packet[10],
            loadcell: (packet[11] << 8) | packet[12],
        };
        setBatteryTemperature(sensor.temperature)
        setLoadWeight(sensor.loadcell)
        setBatteryCapacity(voltageToSoC((sensor.voltage)/100))
        // console.log(sensor);
        return sensor;
    };

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
        return BNO08x;
    };

    const parseKinematicPacket = (hexString:string) => {
        // Convert the hex string to a byte array
        const packet = [];
        for (let i = 0; i < hexString.length; i += 2) {
            packet.push(parseInt(hexString.substr(i, 2), 16));
        }
    
        // Extract and parse kinematic values
        let Sx = ((packet[3] << 8) | packet[4]);
        Sx = (packet[3] & 0x80) ? (Sx - 65536) : Sx;
        let Sy = ((packet[5] << 8) | packet[6]);
        Sy = (packet[5] & 0x80) ? (Sy - 65536) : Sy;
        let St = ((packet[7] << 8) | packet[8]);
        St = (packet[7] & 0x80) ? (St - 65536) : St;
        let Vx = ((packet[9] << 8) | packet[10]);
        Vx = (packet[9] & 0x80) ? (Vx - 65536) : Vx;
        let Vy = ((packet[11] << 8) | packet[12]);
        Vy = (packet[11] & 0x80) ? (Vy - 65536) : Vy;
        let Vt = ((packet[13] << 8) | packet[14]);
        Vt = (packet[13] & 0x80) ? (Vt - 65536) : Vt;
    
        const KinematicData = {
            Sx,
            Sy,
            St,
            Vx,
            Vy,
            Vt
        };
        setCoordinate([Math.round(KinematicData.Sx/100),Math.round(KinematicData.Sy/100),Math.round(KinematicData.St/100)])
        // console.log(KinematicData);
        return KinematicData;
    }

    const voltageToSoC = (voltage:number) => {
        // This function should be based on the specific battery's voltage-SOC curve
        // Here we assume a linear relationship for simplicity
        if (voltage >= 4.2*6) return 100;
        if (voltage <= 3.0*6) return 0;
        return parseFloat((((voltage - 3.0*6) / (4.2*6 - 3.0*6)) * 100).toFixed(2));
    };

    useEffect(()=>{
        if(rxMsg[4] == '0' && rxMsg[5] == '4'){
            parseSensorPacket(rxMsg)
        }
        else if(rxMsg[4] == '0' && rxMsg[5] == '2'){
            parseBNO08XPacket(rxMsg)
        }
        else if(rxMsg[4] == '1' && rxMsg[5] == '5'){
            parseKinematicPacket(rxMsg)
        }
    },[rxMsg])
    return (
        <div className='fixed flex items-center right-0 top-0 h-screen z-50'>
            {/* Orientation */}
            <div className='flex flex-col justify-center items-center px-6 py-8 bg-slate-900 rounded-l-2xl relative'>

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Battery Temperature</p>
                        <p className='text-3xl font-bold mt-1'>{batteryTemperature/100 ? batteryTemperature/100 : 0} <span className='text-xs'>deg</span></p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs flex items-center'><span>Battery Capacity</span></p>
                        <p className='text-3xl font-bold mt-1'>{batteryCapacity ? batteryCapacity : 0} <span className='text-xs'>%</span></p>
                    </div>
                    :
                    null
                }

                {RightNav ?
                    <div className='text-center my-4'>
                        <p className='text-xs'>Load Weight</p>
                        <p className='text-3xl font-bold mt-1'>{loadWeight/100 ? loadWeight/100 : 0} <span className='text-xs'>kg</span></p>
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