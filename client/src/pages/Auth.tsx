import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="bg-white overflow-y-auto text-text-gray rounded-[32px] h-[80vh] w-[90vw] md:w-[90vw] md:h-[90vh] lg:w-[80vw] xl:w-[80vw] flex shadow-2xl">
        <div className=" hidden md:flex md:w-[50%] overflow-y-auto h-full bg-secondary-blue"></div>
        <div className="flex w-full flex-wrap h-full md:w-[50%] px-4">
          <div className="flex flex-col items-center py-8">
            <img
              src="/logo.webp"
              className="size-16 xl:mt-8  border-2 rounded-full"
            />
            <div className="mt-4 flex px-4 md:px-8 flex-1 2xl:px-24 justify-between flex-col items-center">
              <h1 className="text-2xl md:text-3xl font-medium">Hello Again!</h1>
              <p className="text-slate-gray text-sm md:text-base mt-2 mx-auto text-center">
                Surf the waves of conversation and dive into meaningful
                connections and bdsadasdas.{" "}
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
      </section>
    </main>
  );
}
