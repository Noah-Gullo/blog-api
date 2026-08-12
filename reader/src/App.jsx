import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import { checkLogin } from "./auth/auth";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function restoreUser() {
      const currentUser = await checkLogin();

      setUser(currentUser);
      setCheckingAuth(false);
    }

    restoreUser();
  }, []);

  if (checkingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/new" element={<NewPost />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;