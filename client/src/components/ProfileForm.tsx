import { z } from "zod";
import Button from "./ui/Button";
import FormInput from "./ui/FormInput";
import { toast } from "sonner";
import { useAxios } from "../hooks/useAxios";
import { SETUP_PROFILE, TOAST_DURATION } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { UserResponse } from "../utils/types";

const userSchema = z.object({
  userName: z.string().min(1, { message: "Username is required" }),
  firstName: z.string().min(1, { message: "Full Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
});
export default function ProfileForm({
  selectedAvatar,
}: {
  selectedAvatar: string | null;
}) {
  const { response, error, isLoading, fetchData } = useAxios<UserResponse>();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    const result = userSchema.safeParse(formValues);

    if (!selectedAvatar) {
      toast.error("Please select an avatar", { duration: TOAST_DURATION });
    }

    if (result.error) {
      result.error.errors.forEach((error) => {
        toast.error(error.message, { duration: TOAST_DURATION });
      });
      return;
    } else {
      await fetchData({
        method: "POST",
        url: SETUP_PROFILE,
        data: {
          ...result.data,
          avatar: selectedAvatar,
        },
      });
    }
  };
  useEffect(() => {
    if (!isLoading && !error && response) {
      toast.success("Profile setup successfully", {
        duration: TOAST_DURATION,
      });
      login(response);
      navigate("/chat");
    }
  }, [isLoading, error, response, navigate, login]);

  return (
    <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <FormInput
          name="userName"
          placeholder="Username"
          type="text"
          defaultValue={user?.userName}
        />
        <FormInput
          name="firstName"
          placeholder="First Name"
          type="text"
          defaultValue={user?.firstName}
        />
        <FormInput
          name="lastName"
          placeholder="Last Name"
          type="text"
          defaultValue={user?.lastName}
        />
      </div>
      <Button className="mt-4 xl:mt-6" type="submit" disabled={isLoading}>
        Finish Setup
      </Button>
    </form>
  );
}
