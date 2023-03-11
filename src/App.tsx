import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import EditorContainer from "./containers/editor/EditorContainer";
import IndexContainer from "./containers/index/IndexContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexContainer />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/editor/:id" element={<EditorContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
