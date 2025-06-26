import React, { useState } from 'react';

const beliefsList = [
  "I’m not good enough",
  "I don’t have time",
  "I’m too old to change",
  "I’m not smart enough",
  "I always fail at this",
];

export default function App() {
  const [selectedBelief, setSelectedBelief] = useState('');
  const [reframe, setReframe] = useState('');

  const reframeBelief = (belief: string) => {
    switch (belief) {
      case "I’m not good enough":
        return "Growth is possible — I can improve with effort and learning.";
      case "I don’t have time":
        return "I can prioritise what matters — small steps still count.";
      case "I’m too old to change":
        return "Experience is an asset — I can evolve at any stage of life.";
      case "I’m not smart enough":
        return "Ability grows with practice — I don’t need to know everything now.";
      case "I always fail at this":
        return "Past outcomes don’t define future ones — each try builds strength.";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const belief = e.target.value;
    setSelectedBelief(belief);
    setReframe(reframeBelief(belief));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>Self-Limiting Beliefs Tool</h1>
      <p>This little tool helps you reframe and soften unhelpful beliefs.</p>
      <label htmlFor="belief-select" style={{ display: "block", marginTop: "2rem" }}>
        Select a belief you're struggling with:
      </label>
      <select id="belief-select" value={selectedBelief} onChange={handleChange} style={{ marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}>
        <option value="">-- Choose a belief --</option>
        {beliefsList.map((belief) => (
          <option key={belief} value={belief}>
            {belief}
          </option>
        ))}
      </select>
      {reframe && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <h2>Try this reframe:</h2>
          <p>{reframe}</p>
        </div>
      )}
    </div>
  );
}
