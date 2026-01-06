import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../lib/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(email, password, name);
      localStorage.setItem("token", data.token);
      navigate("/overview");
    } catch (err) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}

        {/* NAME */}
        <label style={styles.label}>Name</label>
        <input
          placeholder="Parent name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        {/* EMAIL */}
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="parent@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        {/* PASSWORD */}
        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

/* ===== styles (SAME AS LOGIN) ===== */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
  },
  card: {
    width: 360,
    padding: 24,
    borderRadius: 12,
    background: "#020617",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    textAlign: "center",
  },
  label: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    outline: "none",
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
};
