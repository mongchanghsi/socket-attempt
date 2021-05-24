import React, { useState, useEffect } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';

const api_endpoint = 'http://localhost:3001';

const App = () => {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    // const socket = socketIOClient(api_endpoint);
    setSocket(socketIOClient(api_endpoint));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('FromAPI', (data: string) => {
      setResponse(data);
    });

    socket.emit('someEventName', 'somevalue');
  }, [socket]);

  return (
    <div className='App'>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
};

export default App;
