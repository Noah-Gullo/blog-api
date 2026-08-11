import { useState } from "react";

function CommentForm({ postID, onCommentCreated }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postID}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.errors?.[0]?.msg ||
          "Failed to post comment"
        );
      }

      setText("");

      if (onCommentCreated) {
        onCommentCreated(data);
      }
    } catch (error) {
      console.error("Comment error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment</label>

      <textarea
        id="comment"
        name="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

export default CommentForm;