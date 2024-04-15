'use client'
import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';

interface Payload {
  topic: string;
  message: string;
}


interface ReceiverProps {
  payload: Payload;
}

const Receiver : React.FC<ReceiverProps> = ({ payload }) => {
  const [messages, setMessages] = useState<Payload[]>([])

  useEffect(() => {
    if (payload.topic) {
      setMessages(messages => [...messages, payload])
    }
  }, [payload])

  const renderListItem = (item:Payload) => (
    <List.Item>
      <List.Item.Meta
        title={item.topic}
        description={item.message}
      />
    </List.Item>
  )

  return (
    <Card
      title="Receiver"
    >
      <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  );
}

export default Receiver;