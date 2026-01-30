import React, { useState, useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 5000;

// Local quotes to avoid CORS; simulates polling without external API
const QUOTES = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
];

const fetchQuote = () => {
  return new Promise((resolve) => {
    const delay = 300 + Math.random() * 400;
    setTimeout(() => {
      const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      resolve(quote);
    }, delay);
  });
};

const ApiPolling = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchedAt, setLastFetchedAt] = useState(null);
  const intervalRef = useRef(null);

  const loadQuote = async () => {
    try {
      setError(null);
      const quote = await fetchQuote();
      setData(quote);
      setLastFetchedAt(new Date());
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();

    intervalRef.current = setInterval(() => {
      setLoading(true);
      loadQuote();
    }, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "560px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px", color: "#333" }}>API Polling (every 5s)</h1>
      <p style={{ marginBottom: "24px", color: "#666", fontSize: "14px" }}>
        Polls every 5 seconds and shows a random quote (local mock to avoid CORS).
      </p>

      {lastFetchedAt && !loading && (
        <p style={{ marginBottom: "16px", fontSize: "12px", color: "#6c757d" }}>
          Last updated: {lastFetchedAt.toLocaleTimeString()}
        </p>
      )}

      <div
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "120px",
        }}
      >
        {loading && !data && (
          <p style={{ margin: 0, color: "#6c757d" }}>Loading…</p>
        )}
        {error && (
          <p style={{ margin: 0, color: "#dc3545" }}>Error: {error}</p>
        )}
        {data && !error && (
          <>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "18px",
                fontStyle: "italic",
                color: "#333",
                lineHeight: 1.5,
              }}
            >
              "{data.content}"
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#6c757d" }}>
              — {data.author}
            </p>
            {loading && (
              <p style={{ marginTop: "12px", fontSize: "12px", color: "#6c757d" }}>
                Refreshing…
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApiPolling;
