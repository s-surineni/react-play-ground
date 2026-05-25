import React, { useState } from 'react';
import './PollApp.css'; // See CSS below

const INITIAL_DATA = [
  { id: 1, label: 'JavaScript', votes: 2 },
  { id: 2, label: 'Python', votes: 5 },
  { id: 3, label: 'Rust', votes: 3 },
];

const PollApp = () => {
  const [options, setOptions] = useState(INITIAL_DATA);

  // Derived state: Total votes across all options
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
  };

  return (
    <div className="poll-card">
      <h2>What is your preferred language?</h2>
      <p className="total-label">Total Votes: {totalVotes}</p>
      
      <div className="options-list">
        {options.map((opt) => {
          // Calculate percentage safely
          const percentage = totalVotes > 0 
            ? ((opt.votes / totalVotes) * 100).toFixed(1) 
            : 0;

          return (
            <div key={opt.id} className="option-row" onClick={() => handleVote(opt.id)}>
              <div className="label-group">
                <span className="label-text">{opt.label}</span>
                <span className="percentage-text">{percentage}%</span>
              </div>
              
              <div className="progress-container">
                {/* The "Smooth" Bar */}
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <span className="vote-count">{opt.votes} votes</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollApp;

/*
Interviewer: "What if we had 10,000 options in this poll? How would your React code change?"

Your Answer: > "At that scale, re-rendering the whole list on every vote would cause performance lag. 
I would use Virtualization (like react-window) to only render the items currently visible on the screen, 
and I'd likely use React.memo on the child components to prevent unnecessary re-renders of bars whose percentages haven't changed."
*/