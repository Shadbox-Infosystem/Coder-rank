import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Layout = () => {
  const [users, setUsers] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    
    axios.get(`${apiURL}/home/index.json`)
      .then(response => {
        console.log('API Response:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [apiURL]);

  const handleDelete = (id) => {
    axios.delete(`${apiURL}/tests/${id}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting test:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-4">
          {Array.isArray(users) && users.map(user => (
            <div key={user.id} className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.test_type}</h5>
                  <p className="card-text">{user.instruction}</p>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
