import React from 'react';

const ProblemDifficultyStats = ({ problemsByDifficulty }) => {
  return (
    <div className="problem-difficulty-stats">
      <h2>Problems Solved by Difficulty</h2>
      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {problemsByDifficulty.map((count, index) => (
            <tr key={index}>
              <td>{index * 100}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemDifficultyStats;