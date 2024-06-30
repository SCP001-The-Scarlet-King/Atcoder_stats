import React, { useState } from 'react';
import InputForms from './components/InputForms';
import UserStats from './components/UserStats';
import ProblemDifficultyGraph from './components/ProblemDifficultyGraph';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [problemsByDifficulty, setProblemsByDifficulty] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (atcoderId) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3001/api/user/${atcoderId}`);
      const data = await response.json();
      setUserData(data.userInfo);
      setProblemsByDifficulty(data.problemsByDifficulty);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data from server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AtCoder Stats</h1>
      <InputForms fetchData={fetchData} />
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {userData && <UserStats userInfo={userData} />}
      {<ProblemDifficultyGraph problemsByDifficulty={problemsByDifficulty} />}
    </div>
  );
};

export default App;