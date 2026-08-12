import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import Signup from "./pages/Signup"
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/posts/new" element={<NewPost />} />
    </Routes>
  );
}

export default App;