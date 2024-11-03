import React, { useContext, useState } from "react";
import Button from "./ui/Button";
import { MdAlternateEmail } from "react-icons/md";
import FormInput from "./ui/FormInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAxios } from "../hooks/useAxios";
import AuthContext from "../context/AuthContext";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ showSignUp }: { showSignUp: boolean }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { response, error, isLoading, fetchData } = useAxios();
  const { login } = useContext(AuthContext);

  const validateSignup = () => {
    if (!credentials.email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!credentials.password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignup()) {
      await fetchData({
        method: "POST",
        url: showSignUp ? SIGNUP_ROUTE : LOGIN_ROUTE,
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      });
      if (!isLoading && !error && response) {
        login(response);
        navigate("/profile");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-xs md:text-base flex flex-col gap-4 w-full"
    >
      <div className="relative group">
        <FormInput
          type="email"
          value={credentials.email}
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        {error && "message" in error && (
          <p className="pl-1 mt-1 text-red-500">{error.message}</p>
        )}
        <MdAlternateEmail className="absolute size-6 right-4 group-hover:text-primary-blue  group-focus-within:text-primary-blue top-1/2 -translate-y-1/2" />
      </div>
      <div className="relative group">
        <FormInput
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          name="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        {showPassword ? (
          <AiOutlineEyeInvisible
            className="absolute hover:cursor-pointer hover:text-primary-blue group-hover:text-primary-blue size-6 right-4  group-focus-within:text-primary-blue top-1/2 -translate-y-1/2"
            onClick={(e: React.MouseEvent<SVGElement>) => {
              e.stopPropagation();
              setShowPassword((prev) => !prev);
            }}
          />
        ) : (
          <AiOutlineEye
            className="absolute hover:cursor-pointer hover:text-primary-blue group-hover:text-primary-blue size-6 right-4  group-focus-within:text-primary-blue top-1/2 -translate-y-1/2"
            onClick={(e: React.MouseEvent<SVGElement>) => {
              e.stopPropagation();
              setShowPassword((prev) => !prev);
            }}
          />
        )}
      </div>
      <Button className="mt-2 lg:mt-4" type="submit">
        {showSignUp ? "Sign Up" : "Login"}
      </Button>
    </form>
  );
}
