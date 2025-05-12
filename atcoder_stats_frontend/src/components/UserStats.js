import React from 'react';

const UserStats = ({ userInfo }) => {
  console.log("userInfo : ",userInfo);
  if (!userInfo) {
    return <div>User infof not available</div>;
  }

  return (
    <div className="user-stats">
      <h2>User Info</h2>
      <p>User ID: {userInfo.user_id}</p>
      <p>Accepted Count: {userInfo.accepted_count}</p>
    </div>
  );
};

export default UserStats;