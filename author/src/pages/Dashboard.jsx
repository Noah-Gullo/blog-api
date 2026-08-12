import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/PostList"

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/admin/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, [navigate]);

  async function togglePublished(postID) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postID}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update post");
      }

      const updatedPost = await response.json();

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === updatedPost.id
            ? updatedPost
            : post
        )
      );
    } catch (error) {
      console.error("Failed to toggle post:", error);
    }
  }

  return (
    <main>
      <h1>Author Dashboard</h1>
      <PostList
        posts={posts}
        onTogglePublished={togglePublished}
      />
    </main>
  );
}

export default Dashboard;