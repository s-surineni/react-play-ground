import styles from "./ProgressBar.module.css";
// features
// displays label
// variants
// custom height
/**
 * ProgressBar – reusable progress indicator
 * @param {number} percent - Progress percentage (0 to 100)
 * @param {boolean} showLabel - Whether to show percentage label (default true)
 * @param {string} variant - 'default' | 'success' | 'warning' | 'danger'
 * @param {string} height - CSS height (e.g. '0.5rem', '1rem')
 * @param {string} className - Additional CSS class
 */
function ProgressBar({
  percent = 0,
  showLabel = true,
  variant = "default",
  height,
  className = "",
}) {
  const clamped = Math.min(100, Math.max(0, Number(percent)));

  return (
    <div
      className={`${styles["progress-bar"]} ${styles[`progress-bar--${variant}`]} ${className}`.trim()}
      style={height ? { "--progress-bar-height": height } : undefined}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={showLabel ? `${clamped}%` : undefined}
    >
      <div
        className={styles["progress-bar__fill"]}
        style={{ width: `${clamped}%` }}
      />
      {showLabel && (
        <span className={styles["progress-bar__label"]}>{clamped}%</span>
      )}
    </div>
  );
}

export default ProgressBar;
