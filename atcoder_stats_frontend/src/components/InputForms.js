import React, { useState } from 'react';

const InputForms = ({ fetchData }) => {
  const [atcoderId, setAtcoderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(atcoderId);
    if (atcoderId) {
      setIsLoading(true);
      setError(null);
      try {
        await fetchData(atcoderId);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="atcoderId">Enter AtCoder ID:</label>
      <input
        type="text"
        id="atcoderId"
        value={atcoderId}
        onChange={(e) => setAtcoderId(e.target.value)}
      />
      <button type="submit">Get Stats</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default InputForms;
