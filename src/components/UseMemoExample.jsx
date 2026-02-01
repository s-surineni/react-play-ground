import { useState, useMemo } from 'react';
import './UseMemoExample.css';

function expensive(n) {
  console.log('expensive() ran for n =', n);
  if (n <= 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function expensive2(n) {
  console.log('expensive2() ran for n =', n);
  if (n <= 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

const UseMemoExample = () => {
  const [clicks, setClicks] = useState(0);
  const [n, setN] = useState(5);

  const value = useMemo(() => expensive(n), [n]);
  const value2 = expensive2(n);

  return (
    <div className="use-memo">
      <h2>useMemo</h2>
      <p>Clicks: {clicks}</p>
      <button className="use-memo__btn" onClick={() => setClicks((c) => c + 1)}>
        Click me
      </button>
      <p>
        factorial(<input type="number" min={1} max={20} value={n} onChange={(e) => setN(Number(e.target.value) || 1)} className="use-memo__input" />)
      </p>
      <p>with useMemo: <strong>{value}</strong></p>
      <p>without useMemo (expensive2): <strong>{value2}</strong></p>
      <p className="use-memo__hint">Check console: expensive() only when n changes; expensive2() on every render (every click).</p>
    </div>
  );
};

export default UseMemoExample;
