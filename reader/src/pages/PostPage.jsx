import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PostPage() {
  const { postID } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${postID}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postID]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <main>
      <Link to="/">← Back to posts</Link>

      <article>
        <h1>{post.title}</h1>

        <p>{post.body}</p>
      </article>
    </main>
  );
}

export default PostPage;