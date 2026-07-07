"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setDone(true);
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
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

        {/* EMAIL FORM & SUCCESS STATE */}
        {!done ? (
          <form onSubmit={submit} style={styles.form}>
            <input
              type="email" // 🌟 浏览器原生邮箱校验
              required     // 🌟 必填项
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              disabled={loading}
            />

            <button disabled={loading} style={{...styles.button, opacity: loading ? 0.7 : 1}}>
              {loading ? "Joining..." : "Get early access"}
            </button>
          </form>
        ) : (
          /* SUCCESS */
          <div style={styles.successContainer}>
            <p style={styles.success}>You’re in. We’ll reach out soon. 🎉</p>
          </div>
        )}

        {/* NOTE */}
        <p style={styles.note}>Private beta. No spam. Just early access.</p>

        {/* DISCORD CTA */}
        <a
          href="https://discord.gg/zzTGZbXF"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.discord}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249 19.736 19.736 0 0 0-4.885 1.515C1.207 9.046.35 13.58.77 18.057a19.9 19.9 0 0 0 5.993 3.03c.462-.63.873-1.295 1.226-1.994a13.107 13.107 0 0 1-1.872-.892c.126-.094.252-.192.372-.291 3.927 1.793 8.18 1.793 12.061 0 .12.1.246.198.372.292a12.299 12.299 0 0 1-1.873.892c.36.698.772 1.362 1.225 1.993a19.86 19.86 0 0 0 6.002-3.03c.5-5.177-.838-9.674-3.549-13.661z" />
          </svg>
          <span style={styles.discordText}>Join Discord</span>
        </a>
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
    fontSize: "72px",
    marginBottom: "8px",
    filter: "drop-shadow(0 0 18px rgba(255,255,255,0.10))",
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
    transition: "background 0.2s ease",
  },
  successContainer: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(124, 255, 178, 0.05)",
    border: "1px solid rgba(124, 255, 178, 0.15)",
  },
  success: {
    fontSize: "14px",
    color: "#7CFFB2",
    margin: 0,
  },
  note: {
    marginTop: "24px",
    fontSize: "12px",
    opacity: 0.35,
  },
  discord: {
    marginTop: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
  discordText: {
    fontSize: "13px",
    opacity: 0.7,
  },
};
