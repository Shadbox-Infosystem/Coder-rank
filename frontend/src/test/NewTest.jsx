import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const NewTest = () => {
  const [formData, setFormData] = useState({
    testType: '',
    instruction: '',
    description: '',
    duration: '',
    testLanguage: '',
  });

  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before attempting to submit
    setErrors([]);
    setIsSubmitting(true);

    try {
      const response = await fetch('/tests/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', result);
        // Optionally, reset form fields after successful submission
        setFormData({
          testType: '',
          instruction: '',
          description: '',
          duration: '',
          testLanguage: '',
        });
      } else {
        setErrors(result.errors || ['An error occurred']);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setErrors(['An error occurred during submission']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl">
        {errors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <h2 className="font-bold">Errors:</h2>
            <ul>
              {errors.map((message, index) => (
                <li key={index} className="list-disc pl-5">{message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="testType" className="block text-lg font-medium text-gray-700">Test Type</label>
            <input
              type="text"
              id="testType"
              name="testType"
              value={formData.testType}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instruction" className="block text-lg font-medium text-gray-700">Instruction</label>
            <textarea
              id="instruction"
              name="instruction"
              value={formData.instruction}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="block text-lg font-medium text-gray-700">Duration (in minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testLanguage" className="block text-lg font-medium text-gray-700">Test Language</label>
            <input
              type="text"
              id="testLanguage"
              name="testLanguage"
              value={formData.testLanguage}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewTest;
