// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// // import WebSocket from 'ws';

// const Chat = () => {
//   const [userList, setUserList] = useState<string[]>([]);
//   const [message, setMessage] = useState<string>('');
//   //   const [username, setUsername] = useState<string>('');
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const username = queryParams.get('username');
//   const SERVER_ADDRESS = `ws://serve.skillreactor.io:8080/nasrullah?username=${username}`;
//   let ws: WebSocket;
//   useEffect(() => {
//     ws = new WebSocket(SERVER_ADDRESS);
//     ws.onopen = () => {
//       console.log('Connected to WebSocket server!');
//     };

//     ws.onmessage = function (event) {
//       const message = JSON.parse(event.data);
//       console.log('data from websocket=>', message);
//       if (message.type === 'users') {
//         const userList = message.data.map((user: string) =>
//           user.toLocaleLowerCase()
//         );
//         setUserList(userList);
//         console.log('userList =>', userList);
//       } else if (message.type === 'broadcast') {
//         console.log('Received message==>', message.data);
//       }
//     };

//     // Clean up WebSocket connection on unmount
//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(event.target.value);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Check if message is not empty
//     if (message.trim() !== '') {
//       //   const messageObject = { type: 'broadcast', data: message };
//       console.log('message=>', message);
//       const messageObject = { type: 'broadcast', data: message };
//       if (ws) {
//         ws.send(JSON.stringify(messageObject));
//       }

//       setMessage('');
//     }
//   };

//   //   const location = useLocation();
//   //   console.log('Current URL from chat comp:', location.pathname);
//   return (
//     <div>
//       <h1 id="username">{username}</h1>
//       <h1>Connected Users</h1>

//       {userList.map((user, index) => (
//         <p id={`user_${user}`} key={index}>
//           {user}
//         </p>
//       ))}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           id="messageInput"
//           value={message}
//           onChange={handleInputChange}
//         />
//         <button id="messageSubmitBtn">Submit</button>
//       </form>
//     </div>
//   );
// };
// export default Chat;

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

  useEffect(() => {
    const socket = new WebSocket(SERVER_ADDRESS);

    socket.onopen = () => {
      console.log('Connected to WebSocket server!');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Data from WebSocket:', message);
      if (message.type === 'users') {
        const userList = message.data.map((user: string) =>
          user.toLocaleLowerCase()
        );
        setUserList(userList);
        console.log('UserList:', userList);
      } else if (message.type === 'broadcast') {
        console.log('Received message:', message.data);
      }
    };

    // Clean up WebSocket connection on unmount
    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
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

      {userList.map((user, index) => (
        <p id={`user_${user}`} key={index}>
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
    </div>
  );
};

export default Chat;
