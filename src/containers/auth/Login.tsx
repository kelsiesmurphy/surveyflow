import { Link } from "react-router-dom";
import { fluidBackground } from "../../assets/index.js"

const Login = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-1 flex-col px-4">
        <div className="flex flex-1 items-center justify-center my-20">
          <form className="flex max-w-sm flex-1 flex-col gap-5">
            <Link to="/">
              <img src="/favicon.png" width="60" />
            </Link>
            <h1 className="text-4xl font-medium text-slate-800">Login</h1>
            <p className="text-slate-500">Welcome back!</p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                placeholder="••••••••••••"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
              />
            </div>
            <button className="rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700">
              Log in
            </button>
            <p className="text-slate-500 text-sm text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-sky-600 hover:text-sky-700 hover:underline transition-colors"
              >
                Sign up
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
  )
}

export default Login