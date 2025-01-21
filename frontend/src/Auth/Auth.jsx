import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const history = useNavigate();
  const apiURl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Check if the user is logged in by calling the Rails API
    axios
      .get(`${apiURl}/api/current_user`, { withCredentials: true })
      .then((response) => {
        // If user is logged in, proceed
        setIsAuthenticated(true);
      })
      .catch((error) => {
        // If user is not logged in, redirect to the Devise sign-in page
        setIsAuthenticated(false);
        history.push(`${apiURl}/users/sign_in`); // Redirect to Devise sign-in page
      });
  }, [history]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Show loading until the auth check is done
  }

  if (isAuthenticated === false) {
    return null; // Already redirected, no need to render page
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only accessible if logged in.</p>
    </div>
  );
};

export default ProtectedPage;
