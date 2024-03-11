import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const [userList, setUserList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const SERVER_ADDRESS = `ws://serve.skillreactor.io:8080/nasrullah?username=${username}`;
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<
    { data: string; time: string }[]
  >([]);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket(SERVER_ADDRESS);

      socket.onopen = () => {
        console.log('Connected to WebSocket server!');
        setWs(socket);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'users') {
            const userList = message.data.map((user: string) =>
              user.toLocaleLowerCase()
            );
            setUserList(userList);
          } else if (message.type === 'message') {
            const newMessage = { data: message.data, time: message.time };
            setReceivedMessages((prevMessages) => [
              ...prevMessages,
              newMessage,
            ]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        socket.close();
      };
    };

    connectWebSocket();
  }, [SERVER_ADDRESS]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if message is not empty
    if (message.trim() !== '' && ws && ws.readyState === WebSocket.OPEN) {
      const messageObject = { type: 'broadcast', data: message };
      ws.send(JSON.stringify(messageObject));
      setMessage('');
    }
  };

  return (
    <div>
      <h1 id="username">{username}</h1>
      <h1>Connected Users</h1>

      {userList.map((user) => (
        <p id={`user_${user}`} key={user}>
          {user}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="messageInput"
          value={message}
          onChange={handleInputChange}
        />
        <button id="messageSubmitBtn">Submit</button>
      </form>
      <div>
        <ul id="messages">
          {receivedMessages?.map((msg, index) => {
            return (
              <li key={index}>
                <span className="time">{msg.time}</span>
                <span className="message">{msg.data}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
