'use client'
import { useState, useRef } from "react";
import type { MqttClient } from "mqtt";
import useMqtt from "./useMQTT";

export default function Home() {
  const [incommingMessages, setIncommingMessages] = useState<any[]>([]);
  const addMessage = (message: any) => {
    setIncommingMessages((incommingMessages) => [
      ...incommingMessages,
      message,
    ]);
    console.log(message)
  };
  const clearMessages = () => {
    console.log('clear')
    setIncommingMessages(() => []);
  };

  const incommingMessageHandlers = useRef([
    {
      topic: "amrcontrol",
      handler: (msg: string) => {
        addMessage(msg);
      },
    },
  ]);

  const mqttClientRef = useRef<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    mqttClientRef.current = client;
  };
  useMqtt({
    uri: 'ws://broker.emqx.io:8083/mqtt',
    options: {
      username: 'mamangracing',
      password: 'mamangracing',
      clientId: 'mqttx_a7a2977b',
    },
    topicHandlers: incommingMessageHandlers.current,
    onConnectedHandler: (client) => setMqttClient(client),
  });

  const publishMessages = (client: any) => {
    if (!client) {
      console.log("(publishMessages) Cannot publish, mqttClient: ", client);
      return;
    }
    console.log('publish')
    client.publish("amrcontrol", "1st message from component");
  };

  return (
    <div className="pt-32">
      <h2>Subscribed Topics</h2>
      {incommingMessageHandlers.current.map((i) => (
        <p key={Math.random()}>{i.topic}</p>
      ))}
      <h2>Incomming Messages:</h2>
      {incommingMessages.map((m) => (
        <p key={Math.random()}>{m.payload.toString()}</p>
      ))}
      <button onClick={() => publishMessages(mqttClientRef.current)}>
        Publish Test Messages
      </button>
      <button onClick={() => clearMessages()}>Clear Test Messages</button>
    </div>
  );
}
