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
        <h1 style={styles.title}>😬</h1>

        <p style={styles.subtitle}>No hello. Just vibe.</p>

        <p style={styles.desc}>
          Stay connected without the pressure of talking.
        </p>

        {/* HOW IT WORKS */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}>How it works</p>
          <p style={styles.sectionSubtitle}>3 seconds. That’s all.</p>

          <div style={styles.steps}>
            <div style={styles.step}>
              <span style={styles.number}>1</span>
              <span style={styles.stepText}>Pick your mood</span>
            </div>

            <div style={styles.step}>
              <span style={styles.number}>2</span>
              <span style={styles.stepText}>Your group sees it</span>
            </div>

            <div style={styles.step}>
              <span style={styles.number}>3</span>
              <span style={styles.stepText}>No explanation needed</span>
            </div>
          </div>
        </div>

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
          <p style={styles.success}>You’re in. We’ll reach out soon.</p>
        )}

        {/* NOTE */}
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
    background: "radial-gradient(circle at top, #0a0a0a, #000)",
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
    fontSize: "48px",
    marginBottom: "10px",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.08))",
  },

  subtitle: {
    fontSize: "20px",
    fontWeight: 500,
    marginBottom: "10px",
    opacity: 0.9,
  },

  desc: {
    fontSize: "14px",
    opacity: 0.55,
    marginBottom: "28px",
  },

  /* SECTION */
  section: {
    marginBottom: "28px",
  },

  sectionTitle: {
    fontSize: "13px",
    letterSpacing: "0.5px",
    opacity: 0.4,
    textTransform: "uppercase",
    marginBottom: "6px",
  },

  sectionSubtitle: {
    fontSize: "16px",
    opacity: 0.7,
    marginBottom: "14px",
  },

  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  step: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    textAlign: "left",
  },

  number: {
    width: "20px",
    height: "20px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    flexShrink: 0,
  },

  stepText: {
    fontSize: "13px",
    opacity: 0.75,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "12px",
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
    opacity: 0.35,
  },
};