import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const apiURl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch data from Rails API endpoint (make sure it's correct)
    axios.get(`${apiURl}/`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div>
      <h1>Users</h1>
    </div>
    </>
  );
};

export default UsersList;
