import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import bacgkroundShape1 from "../assets/background-shape1.svg";
import bacgkroundShape2 from "../assets/background-shape2.svg";
import bacgkroundShape3 from "../assets/background-shape3.svg";
import chatMessage from "../assets/chatmessage..png";
import contactImg from "../assets/contact.png";
import avatarSelection from "../assets/avatar-selection.png";

export default function LeftLoginPanel() {
  gsap.registerPlugin(useGSAP);

  const container = useRef<HTMLDivElement>(null);

  const img1 = useRef<HTMLImageElement>(null);
  const panelText = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ruch dla shapeTop z różnym czasem i przesunięciem
    gsap.to(".shapeTop", {
      y: (i) => (i % 2 === 0 ? 30 : 50), // Różne wartości Y na podstawie indeksu
      duration: (i) => 2 + i * 0.3, // Różna długość animacji
      delay: (i) => i * 0.2, // Opóźnienie na podstawie indeksu
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Ruch dla shapeBottom z większym zakresem i wolniejszym tempem
    gsap.to(".shapeBottom", {
      y: (i) => (i % 2 === 0 ? -40 : -20),
      duration: (i) => 3 + i * 0.5,
      delay: (i) => i * 0.4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      panelText.current,
      { opacity: 0 },
      { opacity: 100, duration: 2, delay: 0.75, ease: "power2.inOut" }
    );

    gsap.to(".elementsTop", {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      delay: (i) => (i % 2 === 0 ? 0.1 : 0.4),
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".elementsBottom", {
      y: 10,
      duration: 2,
      delay: 0.4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      container.current,
      { y: "100%" },
      {
        y: "0%",
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, [container]);
  return (
    <div
      ref={container}
      className="hidden lg:flex md:w-[50%] items-center overflow-hidden justify-center h-full bg-secondary-blue relative"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="h-[320px] flex items-center relative w-full z-20">
          <img
            src={chatMessage}
            className="elementsTop w-[240px] absolute top-24 -right-14"
            alt="Chat Message"
          />
          <img
            src={contactImg}
            className="elementsTop w-[220px]  z-50 absolute rounded-2xl left-20 bottom-0"
            alt="Chat Message"
          />
          <img
            src={avatarSelection}
            className="elementsBottom w-[220px] absolute top-4 -left-4 rounded-2xl"
            alt="Chat Message"
          />
        </div>
        <div
          className="flex flex-col justify-center items-center max-w-[400px] mt-10 text-center"
          ref={panelText}
        >
          <h3 className="text-2xl text-white font-semibold ">
            Your next great conversation is just a wave away.
          </h3>
          <p className=" text-[color:hsl(0,0%,80%)] mt-2">
            Join the flow of conversation and connect like never before.
          </p>
        </div>
      </div>
      {/* Top shapes  */}
      <img
        src={bacgkroundShape1}
        className="shapeTop absolute max-lg:h-[80px] -top-20 -left-8  opacity-20"
        ref={img1}
      ></img>
      <img
        src={bacgkroundShape2}
        className="shapeTop absolute top-20 left-56  opacity-20 h-[40px] "
      ></img>
      <img
        src={bacgkroundShape3}
        className="shapeTop absolute top-32 left-64  opacity-20 h-[40px] "
      ></img>
      <img
        src={bacgkroundShape1}
        className="shapeTop absolute -top-20 -right-8  opacity-20"
        ref={img1}
      ></img>
      <img
        src={bacgkroundShape3}
        className="shapeTop absolute top-20 right-48 scale-x-[-1]  opacity-20 h-[40px] "
      ></img>

      {/* Bottom  Shapes  */}

      <img
        src={bacgkroundShape1}
        className="shapeBottom absolute -bottom-20 -left-8  opacity-20"
        ref={img1}
      ></img>
      <img
        src={bacgkroundShape2}
        className="shapeBottom absolute bottom-20 left-56  opacity-20 h-[40px] "
      ></img>
      <img
        src={bacgkroundShape3}
        className="shapeBottom absolute bottom-28 right-64  opacity-20 h-[40px] "
      ></img>

      <img
        src={bacgkroundShape1}
        className="shapeBottom absolute -bottom-20 -right-8  opacity-20"
        ref={img1}
      ></img>
      <img
        src={bacgkroundShape3}
        className="shapeBottom absolute -bottom-20 right-48 scale-x-[-1]  opacity-20 h-[40px] "
      ></img>
    </div>
  );
}
