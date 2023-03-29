import { Routes, Route } from "react-router-dom";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import SurveyContainer from "./containers/survey/SurveyContainer";
import CreateMain from "./containers/survey/SurveyWrapper";

function App() {
  const navigate = useNavigate();

  const [session, setSession] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const getUser = async (id: any) => {
    const { data, error } = await supabase
      .from("user_profile")
      .select()
      .eq("id", id);
    setUserProfile(data?.[0]);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      getUser(session?.user.id);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      getUser(session?.user.id);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexContainer session={session} />} />
        <Route path="/signup" element={<Signup navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route
          path="/dashboard"
          element={
            <DashboardContainer navigate={navigate} userProfile={userProfile} />
          }
        />
        <Route
          path="/editor/:id/*"
          element={<EditorContainer navigate={navigate} />}
        />
        <Route
          path="/survey/:id/*"
          element={<CreateMain />}
        />
      </Routes>
    </>
  );
}

export default App;
