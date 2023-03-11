import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContainer from "./containers/auth/AuthContainer";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/signup";
import IndexContainer from "./containers/index/IndexContainer";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
