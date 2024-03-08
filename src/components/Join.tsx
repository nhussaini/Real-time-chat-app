import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Join = () => {
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();
  //   const location = useLocation();

  //handleInputChange
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Construct URL with query parameter
    const queryParams = new URLSearchParams();
    queryParams.set('username', userName);
    const url = `/chat?${queryParams.toString()}`;
    navigate(url);
  };

  return (
    <form onSubmit={handleJoin}>
      <input
        type="text"
        id="usernameInput"
        value={userName}
        onChange={handleInputChange}
        placeholder="Enter Your Name"
      />
      <button type="submit" id="joinBtn">
        Join
      </button>
    </form>
  );
};
export default Join;
