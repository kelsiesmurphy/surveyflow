import { useState } from "react";
import { logomark } from "../assets";
import { Menu, X } from "react-feather";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Navigation = ({ navigate }:any) => {
  const [toggle, openMobileMenu] = useState(false);

  return (
    <nav className="flex basis-full justify-between px-4 py-5 transition-all md:px-24 shadow-md">
      <Link to="/" className="flex max-w-6xl flex-1 items-center gap-6">
        <img src={logomark} className="w-[34px] aspect-square"/>
      </Link>
      <div className="hidden items-center gap-4 sm:flex">
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

export default Navigation;
