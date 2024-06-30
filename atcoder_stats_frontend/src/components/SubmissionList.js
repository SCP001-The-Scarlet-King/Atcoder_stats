import React from 'react';

const SubmissionList = ({ submissions }) => {
  return (
    <div>
      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            {new Date(submission.epoch_second * 1000).toLocaleString()} - {submission.problem_id} - {submission.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionList;