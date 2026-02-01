import React, { useState, useEffect, useRef } from "react";
import "./ApiPolling.css";

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
    <div className="api-polling">
      <h1 className="api-polling__title">API Polling (every 5s)</h1>
      <p className="api-polling__intro">
        Polls every 5 seconds and shows a random quote (local mock to avoid CORS).
      </p>

      {lastFetchedAt && !loading && (
        <p className="api-polling__last-updated">
          Last updated: {lastFetchedAt.toLocaleTimeString()}
        </p>
      )}

      <div className="api-polling__card">
        {loading && !data && (
          <p className="api-polling__loading">Loading…</p>
        )}
        {error && (
          <p className="api-polling__error">Error: {error}</p>
        )}
        {data && !error && (
          <>
            <p className="api-polling__quote">"{data.content}"</p>
            <p className="api-polling__author">— {data.author}</p>
            {loading && (
              <p className="api-polling__refreshing">Refreshing…</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApiPolling;
