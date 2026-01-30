import React from "react";
import "./ProgressBar.css";

/**
 * ProgressBar – reusable progress indicator
 * @param {number} value - Progress value (0 to max, default max 100)
 * @param {number} max - Maximum value (default 100)
 * @param {boolean} showLabel - Whether to show percentage label (default true)
 * @param {string} variant - 'default' | 'success' | 'warning' | 'danger'
 * @param {string} height - CSS height (e.g. '8px', '1rem')
 * @param {string} className - Additional CSS class
 */
function ProgressBar({
  value = 0,
  max = 100,
  showLabel = true,
  variant = "default",
  height,
  className = "",
}) {
  const clamped = Math.min(max, Math.max(0, Number(value)));
  const percent = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div
      className={`progress-bar progress-bar--${variant} ${className}`.trim()}
      style={height ? { "--progress-bar-height": height } : undefined}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={showLabel ? `${percent}%` : undefined}
    >
      <div
        className="progress-bar__fill"
        style={{ width: `${percent}%` }}
      />
      {showLabel && (
        <span className="progress-bar__label">{percent}%</span>
      )}
    </div>
  );
}

export default ProgressBar;
