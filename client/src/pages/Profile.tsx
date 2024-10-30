import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, isLoggedIn } = useAuth();
  return <h1>Profile hello fdfd {`${user?.email} ${isLoggedIn}`}</h1>;
}
