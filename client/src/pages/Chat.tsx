import useAuth from "../hooks/useAuth";

export default function Chat() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Chat {user?.email}</h1>;
      <button onClick={() => logout()}>Wyloguj</button>
    </div>
  );
}
