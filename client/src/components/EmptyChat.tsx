import Lottie from "lottie-react";
import chatAnimation2 from "../assets/chat-animation2.json";
export default function EmptyChat() {
  return (
    <section className="w-full h-full rounded-2xl max-sm:hidden flex justify-center items-center">
      <div className="flex flex-col justify-center items-center ">
        <div className="mb-2 w-[180px] md:w-[240px] xl:w-[300px] 2xl:w-[400px]">
          <Lottie animationData={chatAnimation2} loop={true} />
        </div>
        <h4 className="text-xl max-lg:text-center lg:text-xl xl:text-2xl 2xl:text-4xl font-medium">
          Hello<span className="text-secondary-blue">!</span> Ready to start a
          conversation on{" "}
          <span className="text-secondary-blue">WaveTalk? </span>
        </h4>
      </div>
    </section>
  );
}
