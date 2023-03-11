import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="px-4 pb-16 transition-all md:px-24">
      <div className="flex flex-wrap justify-between gap-8">
        <Logo styles={"text-sky-700"} />
        <form
          action="/newsletter-signup"
          className="flex max-w-sm flex-1 flex-col gap-2 "
        >
          <h5>Stay up to date</h5>
          <div className="xs:flex-row flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
            />
            <a
              href="/auth"
              className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
            >
              Subscribe
            </a>
          </div>
        </form>
      </div>
      <hr className="mt-12 mb-8" />
      <div className="flex flex-wrap justify-center gap-6 text-slate-500 sm:justify-between">
        <p className="text-center sm:text-left">
          © 2023 Surveyflow. All rights reserved. Built by{" "}
          <a
            href="https://github.com/kelsiesmurphy"
            className="underline hover:text-slate-700"
          >
            Kelsie Murphy
          </a>
          . 🏴󠁧󠁢󠁳󠁣󠁴󠁿
        </p>
        <ul className="flex gap-8">
          <li>
            <a
              href="/terms"
              className="cursor-pointer hover:text-slate-700 hover:underline"
            >
              Terms
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              className="cursor-pointer hover:text-slate-700 hover:underline"
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href="/cookies"
              className="cursor-pointer hover:text-slate-700 hover:underline"
            >
              Cookies
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
