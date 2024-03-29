import Lottie from "react-lottie-player";
import { animation } from "../../assets";

const About = () => {
  return (
    <section id="about" className="flex flex-col gap-16 items-center px-4 py-20">
      <div className="flex max-w-3xl flex-col gap-6 text-center">
        <h2 className="text-2xl font-medium text-slate-800 md:text-4xl">
          Find out more from your customers
        </h2>
        <p className="text-xl font-light text-slate-500">
          Surveyflow creates beautiful surveys for all screen sizes in a matter
          of minutes. Simply create a free account to try it out!
        </p>
        <div className="m-auto mt-4 flex gap-3">
          <a
            href="#pricing"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 align-middle font-medium  text-slate-800 shadow-sm transition hover:bg-slate-200"
          >
            Pricing
          </a>
          <a
            href="/signup"
            className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
          >
            Get started
          </a>
        </div>
      </div>
      <Lottie loop animationData={animation} play className="max-w-7xl" />
    </section>
  );
};

export default About;
