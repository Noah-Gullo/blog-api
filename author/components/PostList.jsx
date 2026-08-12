function PostList({ posts, onTogglePublished }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>

          <p>
            Status:{" "}
            {post.isPublished ? "Published" : "Unpublished"}
          </p>

          <button
            type="button"
            onClick={() => onTogglePublished(post.id)}
          >
            {post.isPublished ? "Unpublish" : "Publish"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;