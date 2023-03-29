import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";
import SurveyWrapper from "./containers/survey/SurveyWrapper";
import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import SurveyCompletionScreen from "./containers/survey/SurveyCompletionScreen";

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
          element={<SurveyWrapper />}
        />
        <Route
          path="/complete"
          element={<SurveyCompletionScreen />}
        />
      </Routes>
    </>
  );
}

export default App;
