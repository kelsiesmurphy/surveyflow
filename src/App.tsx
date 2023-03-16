import { Routes, Route } from "react-router-dom";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session ? "Logged In" : "Logged Out"}
      <button onClick={() => supabase.auth.signOut().then(() => navigate("/"))} className="bg-green-500 p-2">log out</button>
      <Routes>
        <Route path="/" element={<IndexContainer />} />
        <Route path="/signup" element={<Signup navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/editor/:id" element={<EditorContainer />} />
      </Routes>
    </>
  );
}

export default App;
