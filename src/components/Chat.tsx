import { useLocation } from 'react-router-dom';
const Chat = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  //   const location = useLocation();
  console.log('Current URL from chat comp:', location.pathname);
  return (
    <div>
      <h1 id="username">{username}</h1>
    </div>
  );
};
export default Chat;
