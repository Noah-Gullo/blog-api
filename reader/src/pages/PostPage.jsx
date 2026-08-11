import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm" 

function PostPage() {
  const { postID } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  function handleCommentCreated(comment) {
    setPost((currentPost) => ({
      ...currentPost,
      comments: [
        ...(currentPost.comments || []),
        comment,
      ],
    }));
  }

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
      {isLoggedIn ? (
        <CommentForm
          postID={postID}
          onCommentCreated={handleCommentCreated}
        />
      ) : (
        <p>
          <Link to="/login">Log in</Link> to leave a comment.
        </p>
      )}
      
      <section>
      <h2>Comments</h2>

        {post.comments?.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.text}</p>

                <small>
                  {comment.user?.first_name} {comment.user?.last_name}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      <Link to="/">← Back to posts</Link>

      <article>
        <h1>{post.title}</h1>

        <p>{post.body}</p>
      </article>
    </main>
  );
}

export default PostPage;