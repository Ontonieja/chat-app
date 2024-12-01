import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function RightLoginPanel() {
  const [showSignUp, setShowSignUp] = useState(false);
  gsap.registerPlugin(useGSAP);

  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { y: "-100%" },
        {
          y: "-0%",
          duration: 1,
          ease: "power2.inOut",
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="flex w-full flex-wrap h-full lg:w-[50%] px-4 overflow-y-auto"
    >
      <div ref={content} className="flex flex-col items-center py-8">
        <img
          src="/logo.webp"
          className="size-16 xl:mt-8  border-2 rounded-full"
        />
        <div className="mt-4 flex px-4 md:px-8 flex-1 2xl:px-24 justify-between flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-medium">Hello Again!</h1>
          <p className="text-slate-gray text-sm md:text-base mt-2 mx-auto text-center">
            Surf the waves of conversation and dive into meaningful connections.
            With waveTalk, let every message feel like a breeze, every
            interaction a journey.
          </p>
          <div className="mt-6 w-full">
            <LoginForm showSignUp={showSignUp} />
          </div>
          <div className="mt-auto text-sm md:text-base">
            <p className="text-[0.925rem] text-slate-gray font-medium mt-6">
              {showSignUp
                ? "Already have an account?"
                : "Dont have an account yet?"}
              <span
                className="ml-1 text-primary-blue hover:text-primary-hover ease-out duration-300 cursor-pointer font-bold"
                onClick={() => setShowSignUp((prev) => !prev)}
              >
                {showSignUp ? "Sign In!" : "Sign Up!"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
