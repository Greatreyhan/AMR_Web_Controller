import React from 'react';

const Connection = ({ connect, disconnect, connectBtn }) => {
  const record = {
    host: 'broker.emqx.io',
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
  };
  const onFinish = () => {
    const host = "broker.emqx.io"
    const port = 8083
    const clientId = `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`
    const username ='mamangracing'
    const password = 'mamangracing'
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false,
      clientId : clientId,
      username : username,
      password : password
    };
    connect(url, options);
  };

  const handleConnect = () => {
    onFinish()
    console.log('connect')
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div>
        <button onClick={handleConnect}>Connect</button>,
        <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
}

export default Connection;