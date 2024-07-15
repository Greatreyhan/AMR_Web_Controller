'use client'
import React, { useState, useEffect } from 'react'
import mqtt, { MqttClient } from 'mqtt'

const MqttComponent = () => {
  const [currentPosition, setCurrentPosition] = useState([10, 25])
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
    const mqttClient = mqtt.connect(url, options)
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
        } else {
          console.log('Publish to: ', topic)
        }
      })
      setTxMsg(payloadMsg)
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

  return (
    <div>
    </div>
  )
}

export default MqttComponent
