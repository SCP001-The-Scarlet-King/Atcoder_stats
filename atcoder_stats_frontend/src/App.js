import React, { useState } from 'react';
import InputForms from './components/InputForms';
import UserStats from './components/UserStats';
import ProblemDifficultyGraph from './components/ProblemDifficultyGraph';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [problemsByDifficulty, setProblemsByDifficulty] = useState([]);
  const [unsolvedProblemsByDifficulty, setUnsolvedProblemsByDifficulty] = useState([]);
  const [unsolvedProblems, setUnsolvedProblems] = useState([]);
  const [showUnsolved, setShowUnsolved] = useState(false);

  const fetchData = async (atcoderId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${atcoderId}`);
      const data = await response.json();
      // console.log("Fetched data:", data);  
      setUserData(data.userInfo);
      setProblemsByDifficulty(data.problemsByDifficulty);
      setUnsolvedProblemsByDifficulty(data.unsolvedProblemsByDifficulty);
      setUnsolvedProblems(data.unsolvedProblems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h1>AtCoder Stats</h1>
      <InputForms fetchData={fetchData} />
      {userData && <UserStats userInfo={userData} />}
      {userData && (
        <>
          <button className="toggle-button" onClick={() => setShowUnsolved(!showUnsolved)}>
            {showUnsolved ? 'Show Solved Problems' : 'Show Unsolved Problems'}
          </button>
          {showUnsolved ? (
            <ProblemDifficultyGraph 
              problemsByDifficulty={unsolvedProblemsByDifficulty} 
              title="Unsolved Problems by Difficulty"
            />
          ) : (
            <ProblemDifficultyGraph 
              problemsByDifficulty={problemsByDifficulty} 
              title="Solved Problems by Difficulty"
            />
          )}
          {showUnsolved && (
            <div className="unsolved-problems">
              <h3>Unsolved Problem IDs:</h3>
              <ul>
                {unsolvedProblems.map((problemId, index) => (
                  <li key={index}>{problemId}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;