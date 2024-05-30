'use client'
import React, { useState, useEffect } from 'react'
import Grid from './Grid'
import mqtt, { MqttClient } from 'mqtt'


const Calibration = () => {
  const [currentPosition, setCurrentPosition] = useState([10, 25])
  const [hoverData, setHoverData] = useState([0, 0])
  const [reqPosition, setReqPosition] = useState([0, 0])
  const [dataKinematika, setDataKinematika] = useState([0,0,0,0,0,0,0,0,0])
  const [dataEnvironment, setDataEnvironment] = useState([0,0,0,0,0])
  const [txMsg, setTxMsg] = useState('')
  const [rxMsg, setRxMsg] = useState('')

  const [client, setClient] = useState<MqttClient | null>(null)
  const [isSubed, setIsSub] = useState<any>(false)
  const [payload, setPayload] = useState<any>({})
  const [connectStatus, setConnectStatus] = useState('Connect')

  //------------------------------------------------- SETTING MQTT CONNECTION --------------------------------------------------------------------//

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

  const mqttPublish = (payloadMsg:string) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const topic = 'astar/amrcommands'
      const qosOption = 0
      client.publish(topic, payloadMsg, { qos: qosOption }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
        else{
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

  // useEffect(() => {
  //   const resetState = () => {
  //     setTxMsg(''); 
  //     setRxMsg('');
  //   };
  //   const timeoutId = setTimeout(resetState, 3000);
  //   return () => clearTimeout(timeoutId);
  // }, [txMsg,rxMsg]); 

  return (
    <div className='w-full'>
      {/* Tx Alert */}
      {txMsg == '' ?
      null
      :
      <div onClick={()=>setTxMsg('')} className='fixed flex justify-between items-center top-16 left-5 z-50 bg-yellow-200 rounded-full text-yellow-600 px-8 py-2 cursor-pointer'>
        <p className='text-yellow-700 rounded-full mr-2'>🔥</p>
        <p className='text-sm'>Send {txMsg}</p>
      </div>
      }

      {/* Rx Alert */}
      {txMsg == '' ?
      null
      :
      <div onClick={()=>setRxMsg('')} className='fixed flex justify-between items-center top-16 right-5 z-50 bg-green-200 rounded-full text-green-600 px-8 py-2 cursor-pointer'>
        <p className='text-green-700 rounded-full mr-2'>🔥</p>
        <p className='text-sm'>Get {rxMsg}</p>
      </div>
      }
      
      <h2 className='pt-24 text-center text-2xl uppercase font-semibold text-slate-200'>AMR Positioning</h2>
      <div className='mx-auto w-full flex gap-x-5 justify-center my-8'>
        <button disabled={connectStatus == 'Connect' ? false : true} className={`px-6 py-1.5 ${connectStatus == 'Connect' ? 'bg-yellow-600 rounded hover:bg-yellow-700' : 'bg-slate-600 rounded cursor-not-allowed'}`} onClick={mqttConnect}>{connectStatus}</button>
        <button disabled={connectStatus == 'Connect' ? true : false} className={`px-6 py-1.5 ${connectStatus == 'Connect' ? 'bg-slate-600 rounded cursor-not-allowed' : 'bg-yellow-600 rounded hover:bg-yellow-700'}`} onClick={mqttDisconnect}>Disconnect</button>
        {!isSubed ?
          <button disabled={connectStatus == 'Connect' ? true : false} className={`px-6 py-1.5 ${connectStatus == 'Connect' ? 'bg-slate-600 rounded cursor-not-allowed' : 'bg-yellow-600 rounded hover:bg-yellow-700'}`} onClick={mqttSub}>Subscribe</button>
          :
          <button disabled={connectStatus == 'Connect' ? true : false} className={`px-6 py-1.5 ${connectStatus == 'Connect' ? 'bg-slate-600 rounded cursor-not-allowed' : 'bg-yellow-600 rounded hover:bg-yellow-700'}`} onClick={mqttUnSub}>Unsubscribe</button>
        }
      </div>
      <div className='w-full flex justify-center py-4'>
        <Grid rows={20} cols={50} currentPosition={currentPosition} mqttPublish={mqttPublish} dataKinematika={dataKinematika} dataEnvironment={dataEnvironment} rxMsg={rxMsg} />
      </div>
    </div>
  )
}

export default Calibration