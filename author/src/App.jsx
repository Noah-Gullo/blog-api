import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/posts/new" element={<NewPost />} />
    </Routes>
  );
}

export default App;