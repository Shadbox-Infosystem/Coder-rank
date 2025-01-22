import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import ProtectedPage from './Auth/Auth'; // Example protected page
import Layout from './src/components/Layout';
// import SignIn from './Auth/SignIn';
// import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
// import NewTest from './test/NewTest';
import Step1Form from './src/test/Step1Form';
// import Step2Form from './test/Step2Form';
// import Step3Form from './test/Step3Form';
import TestForm from './src/test/TestForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* Route for the sign-in page */}
      {/* <Route path="/users/sign_in" element={<SignIn />} />

      <Route
        path="/new-test"
        element={<PrivateRoute element={<NewTest />} />}
      /> */}

      {/* Test form and step routes */}
      <Route path="/tests" element={<TestForm />} />
      <Route
        path="/tests/step1" element={<Step1Form /> }
        // element={<PrivateRoute element={<Step1Form />} />}
      />
      {/* <Route
        path="/tests/step2"
        element={<PrivateRoute element={<Step2Form />} />}
      />
      <Route
        path="/tests/step3"
        element={<PrivateRoute element={<Step3Form />} />}
      /> */}
    </Routes>
  );
};

export default App;