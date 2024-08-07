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
import { MdOutlineSignalWifiOff ,MdOutlineSignalWifiStatusbar4Bar} from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";;

import Card from './Card';

const Astar = () => {
    const [currentMap, setCurrentMap] = useState([
        ['-', '-', '-', '-', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '#', '#', '#', '#', '#', '#', '#', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '#', '#', '#', '#', '#', '#', '#', '#', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '#', '#', '#', '#', '-', '#', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '#', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '#', '#', '#', '-', '-', '-', '-', '-', '-', '#', '#', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '#', '#', '-', '-', '-', '-', '-', '-', '#', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '#', '#', '-', '-', '-', '-', '-', '-', '-', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-', '-', '#', '#', '#', '#', '#', '#', '#', '#', '#', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
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

    const [isRackSetting, setIsRackSetting] = useState(false)
    const [rackCenter, setRackCenter] = useState({
        x: 0,
        y: 0
    })

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
    const [pathLength, setPathLength] = useState(0);
    const [mappingMsg, setMappingMsg] = useState('')

    // Offset Data
    const [offsetData, setOffsetData] = useState({x:0,y:0})
    const [isOffset, setIsOffset] = useState(false)

    const [isRobotConnected, setIsRobotConnected] = useState(false)
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
    
        // Function to handle signed 16-bit integers
        const parseSigned16Bit = (highByte:number, lowByte:number) => {
            let value = (highByte << 8) | lowByte;
            // If the highest bit (bit 15) is set, this is a negative number
            if (value & 0x8000) {
                value = value - 0x10000;
            }
            return value;
        }
    
        // Extract and parse kinematic values
        let Sx = parseSigned16Bit(packet[3], packet[4]);
        let Sy = parseSigned16Bit(packet[5], packet[6]);
        let St = parseSigned16Bit(packet[7], packet[8]);
        let Vx = parseSigned16Bit(packet[9], packet[10]);
        let Vy = parseSigned16Bit(packet[11], packet[12]);
        let Vt = parseSigned16Bit(packet[13], packet[14]);
    
        const KinematicData = {
            Sx,
            Sy,
            St,
            Vx,
            Vy,
            Vt
        };
    
        // Update position data
        const pos_data = {
            x: Math.round(Sy / 6) + offsetData.x,
            y: Math.round(Sx / 6) + offsetData.y
        }
        setRoboPos(pos_data)
    
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
                    console.log('Publish msg: ', payloadMsg)
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
                // console.log('current act',listActuator[currentMove-1])
                // console.log('last act',(currentMove == 0 ? 0 : listActuator[currentMove - 2]))
                // console.log('move', currentMove)

                if ((((currentMove == 0 ? 0 : listActuator[currentMove - 1]) != (currentMove == 0 ? 0 : listActuator[currentMove - 2]) && currentMove != 1) || (currentMove == 1 && listActuator[currentMove - 1] == 1))) {
                    if (listActuator[currentMove-1] == 1 && !isActuatorPlay) {
                        // console.log('mengirim data aktuator keatas')
                        let idcmd = decimalToHex(cmdId)
                        let msg = `AA55${idcmd}00000010000FF`
                        mqttPublish(msg)
                        handleFreeRack(roboPos.x, roboPos.y)
                        setCmdId(cmdId + 1);
                        setIsActuatorPlay(true)
                        setMoveDelay(20000);
                    }
                    else if (listActuator[currentMove-1] == 0 && !isActuatorPlay) {
                        // console.log('mengirim data aktuator kebawah')
                        let idcmd = decimalToHex(cmdId)
                        let msg = `AA55${idcmd}00000020000FF`
                        mqttPublish(msg)
                        handleSetRack(roboPos.x, roboPos.y)
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
            if(listMsg[currentMove] != undefined){
                mqttPublish(listMsg[currentMove])
                setCurrentMove(currentMove + 1)
            }
            else{
                console.log('msg undefined')
            }
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
                // console.log('first')
                clearAll(start);
                setIsFirst(true)
            }
            else if (isFirst && !isDistracted && !isNewGenerated) {
                // console.log('generate msg')
                let msg = `A55A${(path.length-pathLength) + 1}|${goal.x-offsetData.x}:${goal.y-offsetData.y}|`
                path.slice(0,(path.length-pathLength)).map((step, i) => {
                    if (((path.length-pathLength) - i) > 1) msg += `${step.x-offsetData.x}:${step.y-offsetData.y}|`
                    else msg += `${step.x-offsetData.x}:${step.y-offsetData.y}FF`
                })
                let lengthData = msg.split('|').length - 2
                // console.log(lengthData, (path.length-pathLength))
                if(msg.slice(-2) == 'FF' && (path.length-pathLength) == lengthData){
                    setPathLength(path.length);
                    setListMsg([...listMsg, msg]);
                    setStart(positionRef.current);
                    console.log(msg)
                }
                setIsStartSequence(false);
            }
            else if(isDistracted){
                let msg = `A55A${path.length + 1}|${goal.x-offsetData.x}:${goal.y-offsetData.y}|`
                path.map((step, i) => {
                    if ((path.length - i) > 1) msg += `${step.x-offsetData.x}:${step.y-offsetData.y}|`
                    else msg += `${step.x-offsetData.x}:${step.y-offsetData.y}FF`
                })
                console.log(msg)
                setMsgDistracted(msg)
                mqttPublish(msg)
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
            // console.log(listMsg)
            // console.log(listActuator)
            clearAll(start);
            setGoal(coordinateSet)
            setListGoal([...listGoal, [coordinateSet.x, coordinateSet.y]])
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
                else if (msg[4] == '2' && msg[5] == '3') {
                    setMappingMsg(msg)
                    // parseMappingCoordinate(msg)
                    // setIsDistracted(true)
                }
                if(!isRobotConnected){
                    setIsRobotConnected(true)
                }

                

            })
        }
    }, [client])
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//
    // ---------------------------------------------------- PARSE INTERRUPTER MSG ------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------------------------------------------------------------------------------//


    useEffect(()=>{
        parseMappingCoordinate(mappingMsg)
    },[mappingMsg])

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

    const parseMappingCoordinate = (hexString: string) => {

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
            handleAddBlock(posy, posx)
        }

        // if (command == 1) {
        //     setIsNewGenerated(true)
        // }
        // else{
        //     setIsNewGenerated(false)
        // }
        console.log('blocking coordinate : ', n);
        console.log('Current position : ', roboPos);
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
        setRoboPos({x:position.x,y:position.y})
        setIsStartSetting(true);
        setStart({x:position.x,y:position.y});
        setIsStartSetting(false);
        clearAll({ x:position.x,y:position.y, ...extendUserData })
    }
    const onSetGoal = (position: any) => {
        setGoal(position)
        setIsGoalSetting(false);
    }

    const editOffsetPosition= () => {
        setIsStartSetting(false);
        setIsSetting(false);
        setIsGoalSetting(false);
        setIsRackSetting(false);
        setIsOffset(true)
    }

    const editStartPosition = () => {
        setIsStartSetting(true);
        setIsSetting(false);
        setIsGoalSetting(false);
        setIsRackSetting(false);
        setIsOffset(false)
    }

    const editRackPosition = () => {
        setIsStartSetting(false);
        setIsSetting(false);
        setIsGoalSetting(false);
        setIsRackSetting(true);
        setIsOffset(false)
    }

    const editGoalPosition = () => {
        setIsStartSetting(false);
        setIsSetting(false);
        setIsGoalSetting(true);
        setIsRackSetting(false);
        setIsOffset(false)
    }


    //////////////////////////////////////////////////////////// STARTING POINT ////////////////////////////////////////////////////////

    useEffect(() => {
        // update map
        setBlockersBasedOnMapState(currentMap)
    }, [])

    useEffect(() => {
        if(isOffset){
            setRoboPos({x:offsetData.x,y:offsetData.y})
            setIsStartSetting(true);
            setStart({x:offsetData.x,y:offsetData.y});
            setIsStartSetting(false);
            clearAll({ x:offsetData.x,y:offsetData.y, ...extendUserData })
            setIsOffset(false)
        }
    }, [offsetData])

    useEffect(() => {
        // update map
        if(isRackSetting){
        handleSetRack(rackCenter.x,rackCenter.y)
        setIsRackSetting(false);
        }
    }, [rackCenter])

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

    const handleSetRack= (xcenter: number, ycenter: number) => {
        if(xcenter && ycenter){
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
        // newMap[xcenter-2][ycenter-1] = "#"
        // newMap[xcenter-2][ycenter+1] = "#"
        setCurrentMap(newMap)
        setBlockersBasedOnMapState(currentMap)
        }
    }

    const handleFreeRack= (xcenter: number, ycenter: number) => {
        if(xcenter && ycenter ){
            let newMap = currentMap
            newMap[xcenter - 1][ycenter + 1] = "-"
            newMap[xcenter][ycenter + 1] = "-"
            newMap[xcenter + 1][ycenter + 1] = "-"
            newMap[xcenter - 1][ycenter] = "-"
            newMap[xcenter][ycenter] = "-"
            newMap[xcenter + 1][ycenter] = "-"
            newMap[xcenter - 1][ycenter - 1] = "-"
            newMap[xcenter][ycenter - 1] = "-"
            newMap[xcenter + 1][ycenter - 1] = "-"
            setCurrentMap(newMap)
            setBlockersBasedOnMapState(currentMap)
        }
    }

    const handleSaveMap = ()=>{
        console.log(currentMap)
    }

    return (
        <div className="Astar pt-32 flex flex-col justify-center items-center w-full">
            {showCard ?
                <Card listActuator={listActuator} setListActuator={setListActuator} setShowCard={setShowCard} />
                : null}
            <LeftNav rxMsg={rxMsg} currentOrientation={currentOrientation} requestOrientation={requestOrientation} setRequestOrientation={setRequestOrientation} />
            <RightNav rxMsg={rxMsg} listActuator={listActuator} currentMove={currentMove} />
            {/* Legend */}
            <div className='fixed w-64 bg-slate-700 bg-opacity-40 top-20 left-8 round rounded-lg'>
                <div className='flex flex-col py-4 px-6'>
                    <div className='flex my-2 items-center'>
                    <span className='bg-red-500 h-5 w-5'></span><p className='ml-2 text-sm font-semibold '>Robot Position</p>
                    </div>
                    <div className='flex my-2 items-center'>
                    <span className='bg-blue-500 h-5 w-5'></span><p className='ml-2 text-sm font-semibold '>Target Position</p>
                    </div>
                    <div className='flex my-2 items-center'>
                    <span className='bg-amber-500 h-5 w-5'></span><p className='ml-2 text-sm font-semibold '>Finish Position</p>
                    </div>
                    <div className='flex my-2 items-center'>
                    <span className='bg-amber-300 h-5 w-5'></span><p className='ml-2 text-sm font-semibold '>Path Plan</p>
                    </div>
                    <div className='flex my-2 items-center'>
                    <span className='bg-sky-300 h-5 w-5'></span><p className='ml-2 text-sm font-semibold '>Path Calculation</p>
                    </div>
                </div>
            </div>  
            <div className='fixed w-64 bg-slate-700 bg-opacity-40 top-20 right-8 round rounded-lg'>
                <div className='flex flex-col py-2 px-6'>
                    {isRobotConnected ? 
                    <div className='flex my-2 items-center'>
                    <span className='text-green-500 h-5 w-5'><MdOutlineSignalWifiStatusbar4Bar /></span><p className='ml-2 text-sm font-semibold '>Robot Connected</p>
                    </div>
                    :
                    <div className='flex my-2 items-center'>
                    <span className='text-red-500 h-5 w-5'><MdOutlineSignalWifiOff /></span><p className='ml-2 text-sm font-semibold '>Robot Disconnected</p>
                    </div>
                    }
                    
                </div>
            </div>    
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
                                isRackSetting={isRackSetting}
                                setRackCenter={setRackCenter}
                                setIsAuto={setIsAuto}
                                setCoordinateSet={setCoordinateSet}
                                setOffsetData={setOffsetData}
                                isOffset={isOffset}
                                onSetStart={onSetStart}
                                onSetGoal={onSetGoal}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 justify-center fixed bottom-0 z-30 w-11/12 rounded-t-lg bg-slate-900 py-4">
                        <button className={`px-6 py-1.5 ${connectStatus == 'Connected' ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttConnect}><PiPlugsConnectedFill /><span className='ml-1'>{connectStatus}</span></button>
                        <button className={`px-6 py-1.5 ${isSubed ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={mqttSub}><MdGetApp /><span className='ml-1'>{isSubed ? 'Subscribed' : 'Subscribe'}</span></button>
                        <button className={`px-6 py-1.5 ${isMoving ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={() => setIsMoving(true)}><IoMdMove /><span className='ml-1'>move</span></button>
                        <button className={`px-6 py-1.5 ${isOffset ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isOffset} onClick={editOffsetPosition}><HiCursorArrowRays /><span className='ml-1'>set start</span></button>
                        <button className={`px-6 py-1.5 ${isRackSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isRackSetting} onClick={editRackPosition}><HiCursorArrowRays /><span className='ml-1'>set Rack</span></button>
                        {/* <button className={`px-6 py-1.5 ${isGoalSetting ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} disabled={isGoalSetting} onClick={editGoalPosition}><HiCursorArrowRays /><span className='ml-1'>set goal</span></button> */}
                        <button className={`px-6 py-1.5 ${isLift ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={handleLift}><MdForklift /><span className='ml-1'>Lift Load</span></button>
                        <button className={`px-6 py-1.5 ${isLift ? 'bg-teal-500' : 'bg-amber-800'} uppercase font-semibold rounded flex items-center`} onClick={handleSaveMap}><MdSaveAlt /><span className='ml-1'>Save Map</span></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Astar;
