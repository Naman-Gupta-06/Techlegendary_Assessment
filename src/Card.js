
import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import usersData from "./users.json";
import TeamList from "./teamList"
import './Card.css'

function Card() {
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    available: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Get a list of all domains in the users' data
    const domains = usersData.reduce(
      (acc, curr) => {
        const domain = curr.email.split("@")[1];
        if (!acc.includes(domain)) {
          return [...acc, domain];
        }
        return acc;
      },
      [""] // add an empty domain option
    );
    setFilters((prevFilters) => ({
      ...prevFilters,
      domainOptions: domains.map((domain) => ({
        value: domain,
        label: domain === "" ? "All" : domain,
      })),
    }));
  }, []);

  const handleFilterChange = (event) => {
  const { name, value, type, checked } = event.target;
  const newValue = type === "checkbox" ? checked : value;
  console.log(value)
  
  setFilters((prevFilters) => ({ ...prevFilters, [name]: newValue }));
  setCurrentPage(1); // reset to first page
};

  const handleSearchQueryChange = (event) => {
    const { value } = event.target;
    console.log(searchQuery)
    setSearchQuery(value);
    
    setCurrentPage(1); // reset to first page
  };

  const handleAddToTeam = (user) => {
    setTeam((prevTeam) => {
      if (prevTeam.some((u) => u.email === user.email)) {
        return prevTeam;
      }
      return [...prevTeam, user];
    });
  };

  const filteredUsers = usersData.filter(
    (user) =>
   ( user.first_name.toLowerCase().includes(searchQuery) ||
    user.last_name.toLowerCase().includes(searchQuery)) &&
    (filters.domain === "" || user.email.toLowerCase().endsWith(filters.domain.toLowerCase())) &&
    (filters.gender === "" || user.gender.toLowerCase() === filters.gender.toLowerCase()) &&
    (filters.available === false || user.available === filters.available)
  );


  
  const pageSize = 20;
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalUsers);
  const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="userList">
        <h2>Filters</h2>
      <div className="filters">
        
        <label>
          Domain:
          <select
            name="domain"
            value={filters.domain}
            onChange={handleFilterChange}
          >
            {filters.domainOptions &&
              filters.domainOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </label>
        <label>
          Gender:
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={filters.available}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
        </label>
      </div>
      <div className="userCards">
        {usersToDisplay.map((user) => (
          <UserCard key={user.email} user={user} onAddToTeam={handleAddToTeam} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button id="pagebtn" key={index} onClick={() =>
            handlePageChange(index + 1)}>{index + 1}</button>
            ))}
          </div>
          <div className="team">
            <TeamList teamList={team}/>
          </div>
        </div>
);
}

export default Card;        