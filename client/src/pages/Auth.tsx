import LeftLoginPanel from "../components/LeftLoginPanel";
import RightLoginPanel from "../components/RightLoginPanel";

export default function Auth() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="bg-white overflow-hidden text-text-gray rounded-[32px] h-[80vh] w-[90vw] md:w-[90vw] md:h-[90vh] lg:w-[80vw] xl:w-[80vw] flex shadow-2xl">
        <LeftLoginPanel />
        <RightLoginPanel />
      </section>
    </main>
  );
}
