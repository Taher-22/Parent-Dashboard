import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/overview");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/overview");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label>Email</label>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
  }}
/>


        <label>Password</label>
       <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  style={{
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
  }}
/>


        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footer}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
  },
  card: {
    width: 350,
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
