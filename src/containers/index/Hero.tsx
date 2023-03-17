import { Link } from "react-router-dom";
import IndexNavigation from "./IndexNavigation";
import styles from "./styles.module.css";
import { phone } from "../../assets/index.js";

const Hero = ({session}:any) => {
  return (
    <header className={`${styles["hero-section"]} min-h-screen`}>
      <IndexNavigation session={session}/>
      <div className="min-h-screen flex items-center">
        <div className="mb-40 flex basis-full flex-wrap items-center justify-around gap-16 py-8 px-4">
          <div className="flex max-w-md flex-col gap-4 py-16">
            <h1 className="text-4xl font-medium tracking-wide text-white transition-all sm:text-sky-700 md:text-6xl">
              Surveys should be simple.
            </h1>
            <h2 className="text-lg md:text-xl font-light text-white sm:text-sky-700">
              Surveyflow creates beautiful surveys in minutes that helps you
              understand your customers on a deeper level.
            </h2>
            <form action="/signup" className="flex flex-col gap-2">
              <div className="md:flex-row flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
                />
                <Link
                  to="/signup"
                  className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
                >
                  Get started
                </Link>
              </div>
              <p className="text-sm font-light text-slate-300 sm:text-slate-500">
                We care about your data in our{" "}
                <a
                  href="/privacy"
                  className="underline transition-colors hover:text-slate-400"
                >
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
          <div className="max-w-[16rem]">
            <img src={phone} alt="Phone showing homescreen of survey" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
