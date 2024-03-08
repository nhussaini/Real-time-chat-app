import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import WebSocket from 'ws';

const Chat = () => {
  const [userList, setUserList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  //   const [username, setUsername] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const username = queryParams.get('username');

  useEffect(() => {
    const SERVER_ADDRESS = `ws://serve.skillreactor.io:8080/nasrullah?username=${username}`;
    const ws = new WebSocket(SERVER_ADDRESS);

    ws.onopen = () => {
      console.log('Connected to WebSocket server!');
    };

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log('data from websocket=>', message);
      if (message.type === 'users') {
        const userList = message.data.map((user: string) =>
          user.toLocaleLowerCase()
        );
        setUserList(userList);
        console.log('userList =>', userList);
      }
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Code to send message...
  };

  //   const location = useLocation();
  console.log('Current URL from chat comp:', location.pathname);
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
