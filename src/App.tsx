import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import { useEffect, useState } from "react";
import { supabase } from './supabaseClient'


function App() {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    const readAllUsers = async () => {
      let { data: user_profile, error } = await supabase
        .from("user_profile")
        .select("*");
      console.log(user_profile);
    };
    readAllUsers();
  }, []);

  return (
    <Router>
      {session ? "Logged In" : "Logged Out"}
      <button onClick={() => supabase.auth.signOut()}>log out</button>
      <Routes>
        <Route path="/" element={<IndexContainer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/editor/:id" element={<EditorContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
