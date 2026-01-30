import React, { useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import "./ProgressBarDemo.css";

function ProgressBarDemo() {
  const [value, setValue] = useState(65);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <div className="progress-bar-demo">
      <h1>Progress Bar Component</h1>
      <p className="progress-bar-demo__intro">
        Reusable progress bar with variants and optional label. Use the
        controls below to try different values and options.
      </p>

      <section className="progress-bar-demo__section">
        <h2>Interactive example</h2>
        <label className="progress-bar-demo__control">
          <span>Value: {value}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <label className="progress-bar-demo__control progress-bar-demo__control--checkbox">
          <input
            type="checkbox"
            checked={showLabel}
            onChange={(e) => setShowLabel(e.target.checked)}
          />
          <span>Show label</span>
        </label>
        <div className="progress-bar-demo__preview">
          <ProgressBar value={value} showLabel={showLabel} />
        </div>
      </section>

      <section className="progress-bar-demo__section">
        <h2>Variants</h2>
        <div className="progress-bar-demo__grid">
          <div>
            <span className="progress-bar-demo__variant-label">Default</span>
            <ProgressBar value={45} variant="default" />
          </div>
          <div>
            <span className="progress-bar-demo__variant-label">Success</span>
            <ProgressBar value={80} variant="success" />
          </div>
          <div>
            <span className="progress-bar-demo__variant-label">Warning</span>
            <ProgressBar value={60} variant="warning" />
          </div>
          <div>
            <span className="progress-bar-demo__variant-label">Danger</span>
            <ProgressBar value={25} variant="danger" />
          </div>
        </div>
      </section>

      <section className="progress-bar-demo__section">
        <h2>Sizes &amp; no label</h2>
        <div className="progress-bar-demo__grid progress-bar-demo__grid--vertical">
          <div>
            <span className="progress-bar-demo__variant-label">Thin (8px)</span>
            <ProgressBar value={70} height="8px" showLabel={false} />
          </div>
          <div>
            <span className="progress-bar-demo__variant-label">Default</span>
            <ProgressBar value={50} showLabel={false} />
          </div>
          <div>
            <span className="progress-bar-demo__variant-label">Thick (2rem)</span>
            <ProgressBar value={90} height="2rem" showLabel={false} variant="success" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgressBarDemo;
