import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";

import { createClient } from "@supabase/supabase-js";

import { useEffect, useState } from "react";

const supabaseUrl = "https://xfjgoeigkozgqhjronue.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Note! Currently at stage where showing logged in and out on screen in conditional above screen. Need to implement actual sign in/sign out/sign up, and fix the RLS policies so that the data only shows when logged in.

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
      <Routes>
        <Route path="/" element={<IndexContainer />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/editor/:id" element={<EditorContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
