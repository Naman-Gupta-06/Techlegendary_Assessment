import React from 'react';
import TeamCard from './teamCard';
import "./teamCard.css"

const TeamList = (props) => {
  const { teamList } = props;

  return (
    <div className="team-list">
      <h1>Team Profiles</h1>
      <div className='teamList'>
      {teamList.length > 0 ? (
        teamList.map((team, index) => (
          <TeamCard key={index} teamProfile={team} />
        ))
      ) : (
        <p>No teams to display.</p>
      )}
      </div>
    </div>
  );
};

export default TeamList;
