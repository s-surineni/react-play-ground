import { useState } from "react";

const UseStateFunctionalUpdate = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementDirect = () => {
    setCountA(countA + 1);
    setCountA(countA + 1);
    setCountA(countA + 1);
  };

  const incrementFunctional = () => {
    setCountB(prev => prev + 1);
    setCountB(prev => prev + 1);
    setCountB(prev => prev + 1);
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "20px" }}>
      <h1>useState: Direct vs Functional Update</h1>
      <p>
        When you call a setter multiple times in one event handler, React may batch
        those updates. With a direct value, each call reads the same stale closure
        value. With a function updater, each call receives the latest state from the
        previous update.
      </p>

      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        <div style={{ flex: 1, padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Direct value: setCountA(countA + 1)</h3>
          <p style={{ fontSize: "32px", textAlign: "center" }}>{countA}</p>
          <button
            onClick={incrementDirect}
            style={{ width: "100%", padding: "10px", marginTop: "8px" }}
          >
            Increment 3x
          </button>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
            Expected: +3. Actual: {countA === 1 ? "+1 (stale closure)" : countA === 3 ? "+3" : `+${countA}`}
          </p>
        </div>

        <div style={{ flex: 1, padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Functional: setCountB(prev =&gt; prev + 1)</h3>
          <p style={{ fontSize: "32px", textAlign: "center" }}>{countB}</p>
          <button
            onClick={incrementFunctional}
            style={{ width: "100%", padding: "10px", marginTop: "8px" }}
          >
            Increment 3x
          </button>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
            Expected: +3. Actual: {countB === 3 ? "+3 (correct)" : `+${countB}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseStateFunctionalUpdate;
