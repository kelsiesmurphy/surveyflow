import { supabase } from "../../supabaseClient";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { fluidBackground } from "../../assets/index.js";

const Signup = ({ navigate }: any) => {
  const [loading, setLoading] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserProfile = async (data: any) => {
    console.log(data);
    try {
      await supabase.from("user_profile").insert([
        {
          id: data?.user?.id,
          fname: fname,
          lname: lname,
        },
      ]);
      const companyData = await supabase
        .from("company")
        .insert([{ name: company, owner_id: data?.user?.id }])
        .select();
      await supabase
        .from("user_profile")
        .update({ company_id: companyData?.data?.[0]?.id })
        .eq("id", data?.user?.id);
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "/dashboard",
        },
      });
      createUserProfile(data);
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setFName("");
      setLName("");
      setEmail("");
      setPassword("");
      setCompany("");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-1 flex-col px-4">
        <div className="my-20 flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSignup}
            className="flex max-w-md flex-1 flex-col gap-5"
          >
            <Link to="/">
              <img src="/favicon.png" width="60" />
            </Link>
            <h1 className="text-4xl font-medium text-slate-800">
              Create an account
            </h1>
            <p className="text-slate-500">
              Find out more about your customers today and start building your
              first survey.
            </p>
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-1 flex-col gap-1.5">
                <label htmlFor="fname-input">First name</label>
                <input
                  id="fname-input"
                  type="text"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  placeholder="Enter your first name"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <label htmlFor="lname-input">Last name</label>
                <input
                  id="lname-input"
                  type="text"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company-input">Company Name</label>
              <input
                id="company-input"
                type="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter the name of your company"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
              />
            </div>
            <button className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition-colors hover:border-sky-700 hover:bg-sky-700">
              Create account
            </button>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden px-4 py-11 md:flex">
          <p className="text-slate-400">© Surveyflow 2023</p>
        </div>
      </div>
      <div className="hidden h-screen flex-1 md:flex">
        <img className="h-full w-full object-cover" src={fluidBackground} />
      </div>
    </div>
  );
};

export default Signup;
