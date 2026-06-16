"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setDone(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* HERO */}
        <h1 style={styles.title}>
          You still matter in their life.
        </h1>

        <p style={styles.subtitle}>
          You just don’t see it anymore.
        </p>

        <p style={styles.desc}>
          3–5 close friends. Endless group chats. Still feeling out of the loop.
          <br />
          Not because people stopped caring — but because no one wants to be “the one who asks first.”
        </p>

        {/* EMAIL FORM */}
        <form onSubmit={submit} style={styles.form}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />

          <button disabled={loading} style={styles.button}>
            {loading ? "Joining..." : "Get early access"}
          </button>
        </form>

        {/* SUCCESS */}
        {done && (
          <p style={styles.success}>
            You’re in. We’ll reach out soon.
          </p>
        )}

        {/* SMALL NOTE */}
        <p style={styles.note}>
          Private beta. No spam. Just early access.
        </p>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #111, #000)",
    color: "white",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "24px",
  },

  container: {
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.8,
    marginBottom: "20px",
  },

  desc: {
    fontSize: "14px",
    opacity: 0.6,
    lineHeight: 1.6,
    marginBottom: "32px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "white",
    color: "black",
    fontWeight: 600,
    cursor: "pointer",
  },

  success: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#7CFFB2",
  },

  note: {
    marginTop: "24px",
    fontSize: "12px",
    opacity: 0.4,
  },
};