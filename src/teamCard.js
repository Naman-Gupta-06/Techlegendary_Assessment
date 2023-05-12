import React from 'react';
import './teamCard.css';

const TeamCard = (props) => {
  const { teamProfile, onRemoveFromTeam } = props;

  return (
    <div className="team-card">
      <img src={teamProfile.avatar} alt={teamProfile.first_name} />
      <h2>{teamProfile.first_name} {teamProfile.last_name}</h2>
      <p>Domain: {teamProfile.domain}</p>
      <p>Email: {teamProfile.email}</p>
        <p>Gender: {teamProfile.gender}</p>
      {/* <p>{teamProfile.members.length} members</p> */}
      {onRemoveFromTeam && (
        <button onClick={() => onRemoveFromTeam(teamProfile)}>Remove</button>
      )}
    </div>
  );
};

export default TeamCard;
