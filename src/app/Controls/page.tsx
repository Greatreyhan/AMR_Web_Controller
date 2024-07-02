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
    //-------------------------------------------------- PARSING DATA FUNCTION ---------------------------------------------------------------------//
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
            x:Math.round(Sy/100),
            y:Math.round(Sx/100)
        }
        clearAll({ ...pos_data, ...extendUserData });
        setStart(pos_data)
        setIsStartSetting(false)
        console.log(KinematicData);
        return KinematicData;
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
                // ---------------------------------------------------- HANDLE COORDINATE ------------------------------------------------------------------------//
                console.log(`received message: ${message} from topic: ${topic}`)
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
            mqttPublish(msg)
            console.log(msg)
            setIsStartSequence(false)
        }

    }, [positionRef.current])
    /* eslint-enable */

    const handleLift = () =>{
        setIsLift(!isLift)
            let msg = `AA5501000000${isLift ? 1:2}0000FF`
            mqttPublish(msg)
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
        setBlockersBasedOnGeneratedMap('blank')
    }, [])

    // useEffect(()=>{
    //     // Connect to MQTT
    //     mqttConnect();

    //     // Subscribe to topic
    //     mqttSub();
    // },[])

    return (
        <div className="Astar pt-32 flex flex-col justify-center items-center w-full">
            <LeftNav rxMsg={rxMsg} currentOrientation={currentOrientation} requestOrientation={requestOrientation} setRequestOrientation={setRequestOrientation} />
            <RightNav rxMsg={rxMsg} />
            <div className="Astar-header flex justify-center w-full">

                <div className="Astar-content flex justify-center w-full">
 
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
                    <div className="flex flex-row gap-5 justify-center fixed bottom-0 z-30 w-10/12 rounded-t-lg bg-slate-900 py-4">
                        <button className={`px-6 py-1.5 ${connectStatus == 'Connected' ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttConnect}><PiPlugsConnectedFill /><span className='ml-1'>{connectStatus}</span></button>
                        <button className={`px-6 py-1.5 ${isSubed ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttSub}><MdGetApp/><span className='ml-1'>{isSubed ? 'Subscribed':'Subscribe'}</span></button>
                        <button className={`px-6 py-1.5 ${isStartSequence ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={moveToLowestCost}><IoMdMove /><span className='ml-1'>move</span></button>
                        {/* <button className='px-6 py-1.5 bg-amber-500 uppercase font-semibold rounded' onClick={() => window.location.reload()}>reload</button> */}
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
