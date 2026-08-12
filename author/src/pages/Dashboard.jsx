import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostList from "../../components/PostList";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem("token");
      
      const response = await fetch("http://localhost:3000/admin/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  async function togglePublished(postID) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/posts/${postID}/publish`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedPost = await response.json();

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  }

  return (
    <main>
      <h1>Author Dashboard</h1>

      <Link to="/posts/new">New Post</Link>

      <PostList
        posts={posts}
        onTogglePublished={togglePublished}
      />
    </main>
  );
}

export default Dashboard;