import { useState } from "react";
import { logomark } from "../../assets";
import { Home, Menu, X } from "react-feather";
import { supabase } from "../../supabaseClient";
import { Link, useLocation } from "react-router-dom";

const EditorNavigation = ({ navigate }: any) => {
  const location = useLocation();
  const [toggle, openMobileMenu] = useState(false);

  return (
    <nav className="z-10 flex justify-between px-4 py-5 shadow-sm transition-all md:px-24">
      <div className="flex gap-8 items-center">
        <Link
          to="/dashboard"
          className="flex max-w-6xl flex-1 items-center gap-6"
        >
          <img src={logomark} className="aspect-square w-[34px]" />
        </Link>
        <div className="flex gap-4">
          <Link
            to="create"
            className={`cursor-pointer rounded-lg px-4 py-2 align-middle font-medium transition-colors ${
              location.pathname.includes("/create")
                ? "bg-sky-50 text-sky-700"
                : "bg-transparent text-slate-500 hover:bg-sky-50"
            }`}
          >
            Create
          </Link>
          {/* <Link
            to="share"
            className={`cursor-pointer rounded-lg px-4 py-2 align-middle font-medium transition-colors ${location.pathname.includes("/share") ? "bg-sky-50 text-sky-700" : "bg-transparent hover:bg-sky-50 text-slate-500"}`}
          >
            Share
          </Link> */}
          <Link
            to="results"
            className={`cursor-pointer rounded-lg px-4 py-2 align-middle font-medium transition-colors ${
              location.pathname.includes("/results")
                ? "bg-sky-50 text-sky-700"
                : "bg-transparent text-slate-500 hover:bg-sky-50"
            }`}
          >
            Results
          </Link>
        </div>
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        <button onClick={() => navigate("/dashboard")} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-slate-700 font-medium shadow-sm outline-slate-900 transition-colors hover:bg-slate-50">
          <Home size={20}/> Dashboard
        </button>
        <button
          onClick={() => supabase.auth.signOut().then(() => navigate("/"))}
          className="cursor-pointer rounded-lg bg-transparent px-4 py-2 align-middle font-medium text-slate-500 transition hover:bg-slate-100"
        >
          Log out
        </button>
      </div>
      <div
        onClick={() => openMobileMenu(!toggle)}
        className="flex items-center p-2 sm:hidden"
      >
        {toggle ? <Menu /> : <X />}
      </div>
    </nav>
  );
};

export default EditorNavigation;
