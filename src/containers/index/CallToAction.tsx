import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="flex max-w-screen-xl flex-1 flex-wrap justify-between gap-8 rounded-2xl bg-sky-800 py-16 px-4 shadow-sm transition-all md:p-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-medium text-white">
            Start on our free plan today.
          </h2>
          <p className="text-lg text-sky-200">
            Find out more about your customers today and start building your
            first survey.
          </p>
        </div>
        <div className="justify-left flex items-center gap-3">
          <a
            href="#pricing"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 align-middle font-medium  text-slate-800 shadow-sm transition hover:bg-slate-200"
          >
            Pricing
          </a>
          <Link
            to="/signup"
            className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
