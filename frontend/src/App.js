import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedPage from './Auth/Auth'; // Example protected page
import Layout from './components/Layout';
import SignIn from './Auth/SignIn';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import NewTest from './test/NewTest';
import Step1Form from './test/Step1Form';
import Step2Form from './test/Step2Form';
import Step3Form from './test/Step3Form';
import TestForm from './test/TestForm';

const App = () => {
  return (
    <Routes>
      {/* Route for the sign-in page */}
      <Route path="/users/sign_in" element={<SignIn />} />

      {/* Route for the home layout */}
      <Route path="/" element={<Layout />} />

      {/* Private route for NewTest */}
      <Route
        path="/new-test"
        element={<PrivateRoute element={<NewTest />} />}
      />

      {/* Test form and step routes */}
      <Route path="/tests" element={<TestForm />} />
      <Route
        path="/tests/step1"
        element={<PrivateRoute element={<Step1Form />} />}
      />
      <Route
        path="/tests/step2"
        element={<PrivateRoute element={<Step2Form />} />}
      />
      <Route
        path="/tests/step3"
        element={<PrivateRoute element={<Step3Form />} />}
      />
    </Routes>
  );
};

export default App;