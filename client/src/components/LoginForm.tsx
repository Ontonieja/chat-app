import React, { useContext, useEffect, useState } from "react";
import Button from "./ui/Button";
import { MdAlternateEmail } from "react-icons/md";
import FormInput from "./ui/FormInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAxios } from "../hooks/useAxios";
import AuthContext from "../context/AuthContext";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserResponse } from "../utils/types";

export default function LoginForm({ showSignUp }: { showSignUp: boolean }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { response, error, fetchData } = useAxios<UserResponse>();
  const { login } = useContext(AuthContext);

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formValues = Object.fromEntries(formData);

    const result = userSchema.safeParse(formValues);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    await fetchData({
      method: "POST",
      url: showSignUp ? SIGNUP_ROUTE : LOGIN_ROUTE,
      data: {
        email: result.data?.email,
        password: result.data?.password,
      },
    });
  };

  useEffect(() => {
    if (response) {
      login(response);
      if (response.user.profileSetup === true) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
    }
  }, [response, error, login, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="text-xs md:text-base flex flex-col gap-4 w-full"
    >
      <div className="relative group">
        <FormInput type="email" name="email" placeholder="Email" />
        <MdAlternateEmail className="absolute size-6 right-4 group-hover:text-primary-blue  group-focus-within:text-primary-blue top-1/2 -translate-y-1/2" />
      </div>
      {error && <p className=" text-red-500 -mt-2">{error}</p>}

      <div className="relative group">
        <FormInput
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
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
