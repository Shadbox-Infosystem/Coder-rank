import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentStep = location.pathname.split('/')[1]; // Extract step from URL
  
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <ul className="space-y-4">
        <li className={`p-2 rounded-md cursor-pointer ${currentStep === 'step1' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <Link to="/tests/step1" className="block text-lg">Step 1: Basic Details</Link>
        </li>
        <li className={`p-2 rounded-md cursor-pointer ${currentStep === 'step2' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <Link to="/tests/step2" className="block text-lg">Step 2: Additional Info</Link>
        </li>
        <li className={`p-2 rounded-md cursor-pointer ${currentStep === 'step3' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <Link to="/tests/step3" className="block text-lg">Step 3: Review & Submit</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;