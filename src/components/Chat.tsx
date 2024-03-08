import { useLocation } from 'react-router-dom';
const Chat = () => {
  const location = useLocation();
  console.log('Current URL from chat comp:', location.pathname);
  return <div>Welcome to Chat component</div>;
};
export default Chat;
