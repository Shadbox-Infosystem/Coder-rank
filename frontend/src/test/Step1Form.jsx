import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../components/Navbar';

const Step1Form = ({ formData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onNext({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="testType" className="block text-lg font-medium">Test Type</label>
              <input
                type="text"
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-lg font-medium">Duration (in minutes)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="testLanguage" className="block text-lg font-medium">Test Language</label>
              <input
                type="text"
                id="testLanguage"
                name="testLanguage"
                value={formData.testLanguage}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Step1Form;