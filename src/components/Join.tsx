const Join = () => {
  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleJoin}>
      <input type="text" id="usernameInput" />
      <button type="submit" id="joinBtn">
        Join
      </button>
    </form>
  );
};
export default Join;
