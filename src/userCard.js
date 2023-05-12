import React from 'react'
import './userCard.css'

const userCard = (props) => {
    const { user, onAddToTeam } = props;
    return (
      <div className="user-card">
        <img src={user.avatar} alt={user.last_name} />
        <h2>{user.first_name}</h2><h2>{user.last_name}</h2>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        <p>Availability: {user.available ? "Available" : "Not available"}</p>
        {user.available && (
          <button onClick={() => onAddToTeam(user)}>Add to Team</button>
        )}
      </div>)
}

export default userCard
