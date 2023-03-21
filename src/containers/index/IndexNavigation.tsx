import { useState } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { menu, close } from "../../assets/index.js";

const IndexNavigation = ({session}:any) => {
  const [toggle, openMobileMenu] = useState(false);

  return (
    <nav className="flex basis-full justify-between px-4 py-5 transition-all md:px-24">
      <div className="flex max-w-6xl flex-1 items-center gap-6">
        <Logo styles={"text-white sm:text-sky-700"} />
        <ul className="hidden gap-4 sm:flex">
          <li>
            <a href="#about" className="text-sky-700">
              About
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-sky-700">
              Pricing
            </a>
          </li>
        </ul>
      </div>
      {!session && <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="hidden sm:block rounded-lg bg-transparent px-4 py-2 align-middle font-medium text-slate-700 transition hover:bg-slate-100 lg:text-white lg:hover:bg-sky-700"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 align-middle font-medium  text-slate-800 shadow-sm transition hover:bg-slate-200"
        >
          Sign up
        </Link>
      </div>}
      {session && <Link
          to="/dashboard"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 align-middle font-medium  text-slate-800 shadow-sm transition hover:bg-slate-200"
        >
          Dashboard
        </Link>}
    </nav>
  );
};

export default IndexNavigation;
