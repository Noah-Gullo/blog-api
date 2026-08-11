import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import PostPage from "./pages/PostPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:postID" element={<PostPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;