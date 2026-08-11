import { useState } from "react";

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.errors?.[0]?.msg ||
          "Signup failed"
        );
      }

      if (onSignup) {
        onSignup(data);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="last_name">Last name</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}

export default SignupForm;