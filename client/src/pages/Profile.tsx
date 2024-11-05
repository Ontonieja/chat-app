import { useState } from "react";
import Avatar from "../components/ui/Avatar";
import { avatars } from "../data/avatars";
import useAuth from "../hooks/useAuth";
import ProfileForm from "../components/ProfileForm";

export default function Profile() {
  const { user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || null);
  return (
    <main className="h-screen w-screen flex justify-center items-center p-6">
      <div className="w-full max-w-2xl flex flex-col rounded-xl bg-white p-6 shadow-lg">
        <section className="w-full flex flex-col items-center mb-6">
          <h1 className="text-xl font-normal mb-4 xl:mb-6">
            Select your avatar
          </h1>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                src={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                selectedAvatar={selectedAvatar}
              />
            ))}
          </div>
        </section>

        <section className="w-full mt-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-normal mb-4 xl:mb-6">
              Complete Your Profile
            </h1>
          </div>
          <ProfileForm selectedAvatar={selectedAvatar} />
        </section>
      </div>
    </main>
  );
}
