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
import Card from './Card';

const Astar = () => {
    const [currentMap, setCurrentMap] = useState([
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ])
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

    //////////////////////////////////////////////// Inference Params //////////////////////////////////
    const [isAuto, setIsAuto] = useState(false)
    const [coordinateSet, setCoordinateSet] = useState({
        x: 0,
        y: 0
    })
    const [listMsg, setListMsg] = useState<string[]>([])
    const [listGoal, setListGoal] = useState<any[]>([[0, 0]])
    const [listActuator, setListActuator] = useState<any[]>([])
    const [isMoving, setIsMoving] = useState(false)
    const [currentMove, setCurrentMove] = useState(0)
    const [showCard, setShowCard] = useState(false)
    const [isDistracted, setIsDistracted] = useState(false)


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
    const [isFirst, setIsFirst] = useState(false)
    const [isNewGenerated, setIsNewGenerated] = useState(false)
    const [roboPos, setRoboPos] = useState({x:0,y:0})
    const [isStartSetted, setIsStartSetted] = useState(false)
    const [msgDisctracted, setMsgDistracted] = useState('')
    const [moveDelay,setMoveDelay] = useState(0)
    const [isActuatorPlay, setIsActuatorPlay] = useState(false)
    const [blockerNew, setBlockerNew] = useState('')
    //-------------------------------------------------- PARSING DATA FUNCTION ---------------------------------------------------------------------//
    const parseValue = (highByte: any, lowByte: any) => {
        const value = (highByte << 8) | lowByte;
        return highByte & 0x80 ? value - 65536 : value;
    };

    const parseKinematicPacket = (hexString: string) => {
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
            x: Math.round(Sy / 500),
            y: Math.round(Sx / 500)
        }
        // clearAll({ ...pos_data, ...extendUserData });
        // console.log('kinematic data :',pos_data)
        setRoboPos(pos_data)
        // setStart(pos_data)
        // setIsStartSetting(false)
        return KinematicData;
    }

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

    useEffect(() => {
        positionRef.current = player;
        setFinalPath()

    }, [count])

    useEffect(() => {
        if(moveDelay != 0 && isActuatorPlay){
            const timer = setTimeout(() => {
            setIsMoving(true)
            setIsActuatorPlay(false)
            }, 20000);
            return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts or delay changes
        }   
      }, [moveDelay,isActuatorPlay]);

    useEffect(() => {
        if (listGoal[currentMove] != undefined && currentMove != 0) {
            if (roboPos.x == listGoal[currentMove][0] && roboPos.y == listGoal[currentMove][1]) {
                console.log(listActuator)

                if (listActuator[currentMove-1] != (currentMove == 0 ? 0 : listActuator[currentMove - 2])) {
                    
                    if (listActuator[currentMove-1] == 1 && !isActuatorPlay) {
                        console.log('mengirim data aktuator keatas')
                        let idcmd = decimalToHex(cmdId)
                        let msg = `AA55${idcmd}000000${isLift ? 2 : 1}0000FF`
                        mqttPublish(msg)
                        setCmdId(cmdId + 1);
                        setIsActuatorPlay(true)
                        setMoveDelay(20000);
                    }
                    else if (listActuator[currentMove-1] == 0 && !isActuatorPlay) {
                        console.log('mengirim data aktuator kebawah')
                        let idcmd = decimalToHex(cmdId)
                        let msg = `AA55${idcmd}000000${isLift ? 2 : 1}0000FF`
                        mqttPublish(msg)
                        setCmdId(cmdId + 1);
                        setIsActuatorPlay(true)
                        setMoveDelay(20000);
                    }
                }
                else{
                    setIsMoving(true)
                    setIsActuatorPlay(false)
                }
            }
        }

    }, [roboPos])

    useEffect(() => {
        if(isMoving){
            // Send Data in Sequence
            mqttPublish(listMsg[currentMove + 1])
            setCurrentMove(currentMove + 1)
            setIsMoving(false)
        }

    }, [isMoving])


    useEffect(() => {
        if (isNewGenerated && !isStartSetted) {
                console.log(roboPos)    
                const n = parseInt(blockerNew[6] + blockerNew[7])
                const command = parseInt(blockerNew[8])
                for (let i = 0; i < n * 6; i += 6) {
                    let posx = 0
                    if (blockerNew[9 + i] == 'N') posx =  roboPos.y- parseInt(blockerNew[10 + i] + blockerNew[11 + i])
                    else if (blockerNew[9 + i] == 'P') posx =  roboPos.y+parseInt(blockerNew[10 + i] + blockerNew[11 + i])
                    let posy = 0
                    if (blockerNew[12 + i] == 'N') posy =roboPos.x- parseInt(blockerNew[13 + i] + blockerNew[14 + i])
                    else if (blockerNew[12 + i] == 'P') posy =roboPos.x + parseInt(blockerNew[13 + i] + blockerNew[14 + i])
                    console.log('coordinate relative:', posx, posy, i)
                    handleAddBlock(posy, posx)
                }

                // Menggunakan goal saat ini
                let newCoordinate = {
                    x: listGoal[currentMove][0],
                    y: listGoal[currentMove][1],
                }
                console.log('set pos',roboPos)
                console.log('set goal',newCoordinate)
                clearAll(roboPos);
                setStart(roboPos)
                setGoal(newCoordinate)
                moveToLowestCost();
                setIsNewGenerated(false);
                setIsStartSetted(true)
        }

    }, [isNewGenerated,isStartSetted])


    useEffect(() => {
        if (isGoalReached(positionRef.current)) {
            if (!isFirst) {
                console.log('first')
                clearAll(start);
                setIsFirst(true)
            }
            else if (isFirst && !isDistracted && !isNewGenerated) {
                console.log('generate msg')
                let msg = `A55A${path.length + 1}|${goal.x}:${goal.y}|`
                path.map((step, i) => {
                    if ((path.length - i) > 1) msg += `${step.x}:${step.y}|`
                    else msg += `${step.x}:${step.y}FF`
                })
                setListMsg([...listMsg, msg])
                setStart(positionRef.current)
                setIsStartSequence(false)
            }
            else if(isDistracted){
                let msg = `A55A${path.length + 1}|${goal.x}:${goal.y}|`
                path.map((step, i) => {
                    if ((path.length - i) > 1) msg += `${step.x}:${step.y}|`
                    else msg += `${step.x}:${step.y}FF`
                })
                setMsgDistracted(msg)
                setIsNewGenerated(false);
                setIsStartSetted(false);
            }

        }
 

    }, [positionRef.current])
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//
    // -------------------------------------------------------- HANDLE CLICKER ---------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//

    useEffect(() => {
        if (isAuto && !isNewGenerated && !isDistracted) {
            console.log(listMsg)
            console.log(listActuator)
            setGoal(coordinateSet)
            setListGoal([...listGoal, [coordinateSet.x, coordinateSet.y]])
            // setListActuator([...listActuator, 1])
            setIsStartSetting(false);
            setIsSetting(false);
            setIsGoalSetting(true);
            moveToLowestCost();
            clearAll(start);
            setShowCard(true)
        }
        setIsAuto(false)

    }, [isAuto])

    // ---------------------------------------------------------------------------------------------------------------------------------------------------//
    // ---------------------------------------------------- HANDLE MQTT SUBSCRIBE ------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//
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
                // console.log(`received message: ${message} from topic: ${topic}`)
                if (msg[4] == '1' && msg[5] == '5') {
                    parseKinematicPacket(msg)
                }
                else if (msg[4] == '2' && msg[5] == '1') {
                    parseBlockerByCurrentCoordinate(msg)
                    setIsDistracted(true)

                }
                else if (msg[4] == '2' && msg[5] == '2') {
                    parseFreeBlockByCurrentCoordinate(msg)
                    setIsDistracted(true)
                }

                

            })
        }
    }, [client])
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//
    // ---------------------------------------------------- PARSE INTERRUPTER MSG ------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//


    const parseBlockerByCurrentCoordinate = (hexString: string) => {

        setBlockerNew(hexString)

        setIsNewGenerated(true)
            
    }

    const parseFreeBlockByCurrentCoordinate = (hexString: string) => {

        const n = parseInt(hexString[6] + hexString[7])
        const command = parseInt(hexString[8])
        for (let i = 0; i < n * 6; i += 6) {

            let posx = 0
            if (hexString[9 + i] == 'N') posx = roboPos.y - parseInt(hexString[10 + i] + hexString[11 + i])
            else if (hexString[9 + i] == 'P') posx = roboPos.y + parseInt(hexString[10 + i] + hexString[11 + i])
            let posy = 0
            if (hexString[12 + i] == 'N') posy = roboPos.x - parseInt(hexString[13 + i] + hexString[14 + i])
            else if (hexString[12 + i] == 'P') posy = roboPos.x + parseInt(hexString[13 + i] + hexString[14 + i])
            console.log('coordinate :', posx, posy, i)
            handleRemoveBlock(posy, posx)
        }

        if (command == 1) {
            setIsNewGenerated(true)
        }
        else{
            setIsNewGenerated(false)
        }
        console.log('blocking coordinate : ', n);
        console.log('Current position : ', positionRef.current);
    }

    const decimalToHex = (n: number) => {
        return ('0' + n.toString(16)).slice(-2).toUpperCase();
    }

    const handleLift = () => {
        // setIsLift(!isLift)
        let idcmd = decimalToHex(cmdId)
        let msg = `AA55${idcmd}000000${isLift ? 2 : 1}0000FF`
        mqttPublish(msg)
        setCmdId(cmdId + 1);
        // console.log(msg)
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

    const handleAddBlock = (x: number, y: number) => {
        let newMap = currentMap
        newMap[x][y] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleRemoveBlock = (x: number, y: number) => {
        let newMap = currentMap
        newMap[x][y] = "-"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleSetRackFull = (xcenter: number, ycenter: number) => {
        let newMap = currentMap
        newMap[xcenter - 1][ycenter + 1] = "#"
        newMap[xcenter][ycenter + 1] = "#"
        newMap[xcenter + 1][ycenter + 1] = "#"
        newMap[xcenter - 1][ycenter] = "#"
        newMap[xcenter][ycenter] = "#"
        newMap[xcenter + 1][ycenter] = "#"
        newMap[xcenter - 1][ycenter - 1] = "#"
        newMap[xcenter][ycenter - 1] = "#"
        newMap[xcenter + 1][ycenter - 1] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    const handleSetRackFree = (xcenter: number, ycenter: number) => {
        let newMap = currentMap
        newMap[xcenter - 1][ycenter + 1] = "#"
        newMap[xcenter][ycenter + 1] = "-"
        newMap[xcenter + 1][ycenter + 1] = "#"
        newMap[xcenter - 1][ycenter] = "-"
        newMap[xcenter][ycenter] = "-"
        newMap[xcenter + 1][ycenter] = "-"
        newMap[xcenter - 1][ycenter - 1] = "#"
        newMap[xcenter][ycenter - 1] = "-"
        newMap[xcenter + 1][ycenter - 1] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
    }

    return (
        <div className="Astar pt-32 flex flex-col justify-center items-center w-full">
            {showCard ?
                <Card listActuator={listActuator} setListActuator={setListActuator} setShowCard={setShowCard} />
                : null}
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
                                roboPos={roboPos}
                                userPosition={player}
                                setTileAsBlocker={setTileAsBlocker}
                                isSetting={isSetting}
                                isStartSetting={isStartSetting}
                                isGoalSetting={isGoalSetting}
                                setIsAuto={setIsAuto}
                                setCoordinateSet={setCoordinateSet}
                                onSetStart={onSetStart}
                                onSetGoal={onSetGoal}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 justify-center fixed bottom-0 z-30 w-10/12 rounded-t-lg bg-slate-900 py-4">
                        <button className={`px-6 py-1.5 ${connectStatus == 'Connected' ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttConnect}><PiPlugsConnectedFill /><span className='ml-1'>{connectStatus}</span></button>
                        <button className={`px-6 py-1.5 ${isSubed ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttSub}><MdGetApp /><span className='ml-1'>{isSubed ? 'Subscribed' : 'Subscribe'}</span></button>
                        <button className={`px-6 py-1.5 ${isMoving ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={() => setIsMoving(true)}><IoMdMove /><span className='ml-1'>move</span></button>
                        <button className={`px-6 py-1.5 ${isStartSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isStartSetting} onClick={editStartPosition}><HiCursorArrowRays /><span className='ml-1'>set start</span></button>
                        <button className={`px-6 py-1.5 ${isGoalSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isGoalSetting} onClick={editGoalPosition}><HiCursorArrowRays /><span className='ml-1'>set goal</span></button>
                        <button className={`px-6 py-1.5 ${isLift ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={handleLift}><MdForklift /><span className='ml-1'>Lift Load</span></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Astar;
