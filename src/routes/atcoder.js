const express = require('express');
const axios = require('axios');
const router = express.Router();

const submissionsApiUrl = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=';
const problemModelsUrl = 'https://kenkoooo.com/atcoder/resources/problem-models.json';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchAllSubmissions = async (userId) => {
  let fromSecond = 0;
  let allSubmissions = [];
  let hasMoreSubmissions = true;
  while (hasMoreSubmissions) {
    try {
      const response = await axios.get(`${submissionsApiUrl}${userId}&from_second=${fromSecond}`);
      const submissions = response.data;

      if (submissions.length > 0) {
        allSubmissions = allSubmissions.concat(submissions);
        fromSecond = submissions[submissions.length - 1].epoch_second + 1;
        await sleep(1000); 
      } else {
        hasMoreSubmissions = false;
      }
    } catch (error) {
      hasMoreSubmissions = false;
    }
  }

  return allSubmissions;
};

const fetchProblemModels = async () => {
  try {
    const response = await axios.get(problemModelsUrl);
    const problemModels = response.data;

    // Map the problem ID to its difficulty
    const problemDifficultyMap = {};
    for (const [problemId, model] of Object.entries(problemModels)) {
      problemDifficultyMap[problemId] = model.difficulty;
    }
   
    return problemDifficultyMap;
  } catch (error) {
    console.error('Error fetching problem models:', error);
    return {};
  }
};

const processSubmissions = (submissions, problemModels) => {
  const acceptedProblems = new Set();
  const attemptedProblems = new Set();
  const problemsByDifficulty = Array(51).fill(0);
  const unsolvedProblemsByDifficulty = Array(51).fill(0);
  const unsolvedProblems = new Set();
  console.log('HI');
  submissions.forEach(sub => {
    attemptedProblems.add(sub.problem_id);
    if (sub.result === 'AC') {
      acceptedProblems.add(sub.problem_id);
    }
  });

  attemptedProblems.forEach(problemId => {
    if (!acceptedProblems.has(problemId)) {
      unsolvedProblems.add(problemId);
    }
    
    if (problemModels[problemId] !== undefined) {
      let difficulty = problemModels[problemId];
      if (difficulty < 0) difficulty = 0;
      if (difficulty > 5000) difficulty = 5000;
      difficulty = Math.round(difficulty / 100);
      
      if (acceptedProblems.has(problemId)) {
        problemsByDifficulty[difficulty]++;
      } else {
        unsolvedProblemsByDifficulty[difficulty]++;
      }
    }
  });
  // console.log(userInfo);
  // console.log(unsolvedProblems);
  // console.log(problemsByDifficulty);

  return {
    userInfo: {
      user_id: submissions[0]?.user_id || 'Not available',
      accepted_count: acceptedProblems.size,
      attempted_count: attemptedProblems.size,
      unsolved_count: unsolvedProblems.size
    },
    userSubmissions: submissions,
    problemsByDifficulty,
    unsolvedProblemsByDifficulty,
    unsolvedProblems: Array.from(unsolvedProblems)
  };
};

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [allSubmissions, problemModels] = await Promise.all([
      fetchAllSubmissions(userId),
      fetchProblemModels()
    ]);
    const processedData = processSubmissions(allSubmissions, problemModels);
    res.json(processedData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from AtCoder' });
  }
});

module.exports = router;
