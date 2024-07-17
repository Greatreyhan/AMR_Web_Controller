'use client'
import React, { useEffect, useState, useRef } from 'react';
import './page.css';
import { Map } from './Map';
import { useBlockers } from '../hooks/useBlockers';
import { usePlayer } from '../hooks/useUser';
import { useRoad } from '../hooks/useRoad';
import { useGoalAndStart } from '../hooks/useGoalAndStart';
import { DIMENSION } from '../constants';
import mqtt, { MqttClient } from 'mqtt'
import LeftNav from '../Components/LeftNav';
import RightNav from '../Components/RightNav';
import { PiPlugsConnectedFill } from "react-icons/pi";
import { MdGetApp } from "react-icons/md";
import { HiCursorArrowRays } from "react-icons/hi2";
import { IoMdMove } from "react-icons/io";
import { MdForklift } from "react-icons/md";

const Astar= () =>{
    const [currentMap, setCurrentMap] = useState([
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ])
    //-------------------------------------------------- PARSING DATA FUNCTION ---------------------------------------------------------------------//
    const parseValue = (highByte:any, lowByte:any) => {
        const value = (highByte << 8) | lowByte;
        return highByte & 0x80 ? value - 65536 : value;
    };
    
    const parseKinematicPacket = (hexString:string) => {
        // Convert the hex string to a byte array
        const packet = [];
        for (let i = 0; i < hexString.length; i += 2) {
            packet.push(parseInt(hexString.substr(i, 2), 16));
        }
    
        // Extract and parse kinematic values
        let Sx = ((packet[3] << 8) | packet[4]);
        Sx = (packet[3] & 0x80) ? 0 : Sx;
        let Sy = ((packet[5] << 8) | packet[6]);
        Sy = (packet[5] & 0x80) ? 0 : Sy;
        let St = ((packet[7] << 8) | packet[8]);
        St = (packet[7] & 0x80) ? 0 : St;
        let Vx = ((packet[9] << 8) | packet[10]);
        Vx = (packet[9] & 0x80) ? 0 : Vx;
        let Vy = ((packet[11] << 8) | packet[12]);
        Vy = (packet[11] & 0x80) ? 0 : Vy;
        let Vt = ((packet[13] << 8) | packet[14]);
        Vt = (packet[13] & 0x80) ? 0 : Vt;
    
        const KinematicData = {
            Sx,
            Sy,
            St,
            Vx,
            Vy,
            Vt
        };
        // setCoordinate([Math.round(KinematicData.Sx/100),Math.round(KinematicData.Sy/100),Math.round(KinematicData.St/100)])
        const pos_data = {
            x:Math.round(Sy/500),
            y:Math.round(Sx/500)
        }
        clearAll({ ...pos_data, ...extendUserData });
        setStart(pos_data)
        setIsStartSetting(false)
        return KinematicData;
    }
    const parseBlockerCoordinate = (hexString:string) => {

        const coordinate_to_block = {
            n: parseInt(hexString[6]),
            command: parseInt(hexString[7]),
            x1: parseValue(hexString[8], hexString[9]),
            y1: parseValue(hexString[10], hexString[11]),
            x2: parseValue(hexString[12], hexString[13]),
            y2: parseValue(hexString[14], hexString[15]),
        };
        if(coordinate_to_block.n >= 1) handleAddBlock(coordinate_to_block.y1,coordinate_to_block.x1)
        if(coordinate_to_block.n >= 2) handleAddBlock(coordinate_to_block.y2,coordinate_to_block.x2)
        if(coordinate_to_block.command == 1) moveToLowestCost();
        console.log('blocking coordinate : ',coordinate_to_block);
        console.log('Current position : ', positionRef.current);
    }

    const parseBlockerByCurrentCoordinate = (hexString:string) => {

        const n = parseInt(hexString[6]+hexString[7])
        const command = parseInt(hexString[8])
        for(let i = 0; i < n*6; i+=6){
            let posx = 0
            if(hexString[9+i] == 'N')  posx = start.y-parseInt(hexString[10+i]+hexString[11+i])
            else if(hexString[9+i] == 'P') posx = start.y+parseInt(hexString[10+i]+hexString[11+i])
            let posy = 0
            if(hexString[12+i] == 'N')  posy = start.x-parseInt(hexString[13+i]+hexString[14+i])
            else if(hexString[12+i] == 'P')  posy = start.x+parseInt(hexString[13+i]+hexString[14+i])
            console.log('coordinate :',posx,posy,i)
            handleAddBlock(posy,posx)
        }
        // Generate new Astar
        if(command == 1) {
            clearAll(start);
            setGoal(goal)
            setIsStartSetting(false);
            setIsSetting(false);
            setIsGoalSetting(true);
            moveToLowestCost();
        }
        console.log('blocking coordinate : ',n);
        console.log('Current position : ', start);
    }

    const parseFreeBlockByCurrentCoordinate = (hexString:string) => {

        const n = parseInt(hexString[6]+hexString[7])
        const command = parseInt(hexString[8])
        for(let i = 0; i < n*6; i+=6){
            
            let posx = 0
            if(hexString[9+i] == 'N')  posx = start.y-parseInt(hexString[10+i]+hexString[11+i])
            else if(hexString[9+i] == 'P') posx = start.y+parseInt(hexString[10+i]+hexString[11+i])
            let posy = 0
            if(hexString[12+i] == 'N')  posy = start.x-parseInt(hexString[13+i]+hexString[14+i])
            else if(hexString[12+i] == 'P')  posy = start.x+parseInt(hexString[13+i]+hexString[14+i])
            console.log('coordinate :',posx,posy,i)
            handleRemoveBlock(posy,posx)
        }
        // Generate new Astar
        if(command == 1) moveToLowestCost();
        console.log('blocking coordinate : ',n);
        console.log('Current position : ', positionRef.current);
    }

    //------------------------------------------------- SETTING MQTT CONNECTION --------------------------------------------------------------------//

    const [txMsg, setTxMsg] = useState('')
    const [rxMsg, setRxMsg] = useState('')

    const [client, setClient] = useState<MqttClient | null>(null)
    const [isSubed, setIsSub] = useState<any>(false)
    const [payload, setPayload] = useState<any>({})
    const [connectStatus, setConnectStatus] = useState('Connect')

    const [currentOrientation, setCurrentOrientation] = useState(0)
    const [requestOrientation, setRequestOrientation] = useState(0)

    const [isStartSequence, setIsStartSequence] = useState(false);
    const [isLift, setIsLift] = useState(false)


    const mqttConnect = () => {
        // Host Setting 
        const url = `wss://broker.emqx.io:8084/mqtt`
        const options = {
            clientId: "Greatreyhan", // ClientId
            username: "AdminAMR", // Username
            password: "AdminAMR", // Password
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        }
        setConnectStatus('Connecting')
        const mqttClient = mqtt.connect(url, options);
        setClient(mqttClient)
    }

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected')
                console.log('connection successful')
            })

            client.on('error', (err) => {
                console.error('Connection error: ', err)
                client.end()
            })

            client.on('reconnect', () => {
                setConnectStatus('Reconnecting')
            })

            client.on('message', (topic, message) => {
                const payload = { topic, message: message.toString() }
                setPayload(payload)
                setRxMsg(message.toString())
                const msg = message.toString()
                if(msg[4] == '1' && msg[5] == '5'){
                    parseKinematicPacket(msg)
                }
                else if(msg[4] == '2' && msg[5] == '1'){
                    parseBlockerByCurrentCoordinate(msg)
                    console.log(`received message: ${message} from topic: ${topic}`)
                }
                else if(msg[4] == '2' && msg[5] == '1'){
                    parseFreeBlockByCurrentCoordinate(msg)
                    console.log(`received message: ${message} from topic: ${topic}`)
                }
                
                // ---------------------------------------------------- HANDLE COORDINATE ------------------------------------------------------------------------//
                
            })
        }
    }, [client])

    const mqttDisconnect = () => {
        if (client) {
            try {
                client.end(false, () => {
                    setConnectStatus('Connect')
                    console.log('disconnected successfully')
                })
            } catch (error) {
                console.log('disconnect error:', error)
            }
        }
    }

    const mqttPublish = (payloadMsg: string) => {
        if (client) {
            // topic, QoS & payload for publishing message
            const topic = 'astar/amrcommands'
            const qosOption = 0
            client.publish(topic, payloadMsg, { qos: qosOption }, (error) => {
                if (error) {
                    console.log('Publish error: ', error)
                }
                else {
                    console.log('Publish to: ', topic)
                }
            })
            setTxMsg(payloadMsg);
        }
    }

    const mqttSub = () => {
        if (client) {

            client.subscribe('astar/amrparams', { qos: 0 }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                console.log(`Subscribe to topics: astar/amrparams`)
                setIsSub(true)
            })
        }
    }

    const mqttUnSub = () => {
        if (client) {
            client.unsubscribe('astar/amrparams', { qos: 0 }, (error) => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    return
                }
                console.log(`unsubscribed topic: astar/amrparams`)
                setIsSub(false)
            })
        }
    }
    

    //------------------------------------------------- SETTING ASTAR ALGORITHM --------------------------------------------------------------------//

    const [count, setCount] = useState(0); // frames
    const [withNeighbourEvaluation, setWithNeighbourEvaluation] = useState(true);
    const [cmdId, setCmdId] = useState(1);

    const { start, goal, setStart, setGoal, isStartSetting, isGoalSetting, setIsGoalSetting, setIsStartSetting } = useGoalAndStart();
    const { player, move, extendUserData } = usePlayer(start);
    const {
        blockers,
        setBlockersOnMap,
        setTileAsBlocker,
        setBlockersBasedOnGeneratedMap,
        setBlockersBasedOnMapState,
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


    useEffect(() => {
        positionRef.current = player;
        setFinalPath()

    }, [count])

    useEffect(() => {
        //////////////////////////////////////////////// Inference to send the path //////////////////////////////////
        if (isGoalReached(positionRef.current)) {
            let msg = `A55A${path.length+1}|${goal.x}:${goal.y}|`
            path.map((step,i)=>{
                if((path.length - i)>1) msg += `${step.x}:${step.y}|`
                else msg += `${step.x}:${step.y}FF`
            })
            console.log(msg)
            mqttPublish(msg)
            setIsStartSequence(false)
        }

    }, [positionRef.current])
    /* eslint-enable */

    const decimalToHex = (n:number) => {
        return ('0' + n.toString(16)).slice(-2).toUpperCase();
    }

    const handleLift = () =>{
        setIsLift(!isLift)
            let idcmd = decimalToHex(cmdId) 
            let msg = `AA55${idcmd}000000${isLift ? 2:1}0000FF`
            mqttPublish(msg)
            setCmdId(cmdId+1);
            console.log(msg)        
    }

    const moveByOneTile = () => setCount((prevState) => prevState + 1);

    const moveToLowestCost = () => {
        // Starting Point for Message
        if (!isStartSequence) {
            setIsStartSequence(true)
        }
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

    //////////////////////////////////////////////////////////// STARTING POINT ////////////////////////////////////////////////////////

    useEffect(() => {
        // update map
        setBlockersBasedOnMapState(currentMap)
    }, [])

    const handleAddBlock = (x:number,y:number) =>{
        let newMap = currentMap
        newMap[x][y] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleRemoveBlock = (x:number,y:number) =>{
        let newMap = currentMap
        newMap[x][y] = "-"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleSetRackFull = (xcenter:number, ycenter:number) =>{
        let newMap = currentMap
        newMap[xcenter-1][ycenter+1] = "#"
        newMap[xcenter][ycenter+1] = "#"
        newMap[xcenter+1][ycenter+1] = "#"
        newMap[xcenter-1][ycenter] = "#"
        newMap[xcenter][ycenter] = "#"
        newMap[xcenter+1][ycenter] = "#"
        newMap[xcenter-1][ycenter-1] = "#"
        newMap[xcenter][ycenter-1] = "#"
        newMap[xcenter+1][ycenter-1] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleSetRackFree = (xcenter:number, ycenter:number) =>{
        let newMap = currentMap
        newMap[xcenter-1][ycenter+1] = "#"
        newMap[xcenter][ycenter+1] = "-"
        newMap[xcenter+1][ycenter+1] = "#"
        newMap[xcenter-1][ycenter] = "-"
        newMap[xcenter][ycenter] = "-"
        newMap[xcenter+1][ycenter] = "-"
        newMap[xcenter-1][ycenter-1] = "#"
        newMap[xcenter][ycenter-1] = "-"
        newMap[xcenter+1][ycenter-1] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    return (
        <div className="Astar pt-32 flex flex-col justify-center items-center w-full">
            <LeftNav rxMsg={rxMsg} currentOrientation={currentOrientation} requestOrientation={requestOrientation} setRequestOrientation={setRequestOrientation} />
            <RightNav rxMsg={rxMsg} />
            <div className="Astar-header flex justify-center w-full">

                <div className="Astar-content flex justify-center w-full">
 
                    <div className='flex-1 flex justify-center'>
                        <div className='relative'>
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
                    </div>
                    <div className="flex flex-row gap-5 justify-center fixed bottom-0 z-30 w-10/12 rounded-t-lg bg-slate-900 py-4">
                        <button className={`px-6 py-1.5 ${connectStatus == 'Connected' ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttConnect}><PiPlugsConnectedFill /><span className='ml-1'>{connectStatus}</span></button>
                        <button className={`px-6 py-1.5 ${isSubed ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttSub}><MdGetApp/><span className='ml-1'>{isSubed ? 'Subscribed':'Subscribe'}</span></button>
                        <button className={`px-6 py-1.5 ${isStartSequence ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={moveToLowestCost}><IoMdMove /><span className='ml-1'>move</span></button>
                        <button className={`px-6 py-1.5 ${isStartSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isStartSetting} onClick={editStartPosition}><HiCursorArrowRays/><span className='ml-1'>set start</span></button>
                        <button className={`px-6 py-1.5 ${isGoalSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isGoalSetting} onClick={editGoalPosition}><HiCursorArrowRays/><span className='ml-1'>set goal</span></button>
                        <button className={`px-6 py-1.5 ${isLift ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`}  onClick={handleLift}><MdForklift/><span className='ml-1'>Lift Load</span></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Astar;
