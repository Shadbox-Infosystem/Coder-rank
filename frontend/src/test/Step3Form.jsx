import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';

const Step3Form = ({ testId }) => {
  const [formData, setFormData] = useState({
    instruction: '',
    consent: false,
    consentAccepted: false
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch the test details if testId is available (optional, for pre-filling data)
    if (testId) {
      fetch(`${apiUrl}/tests/${testId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            instruction: data.instruction || '',
            consent: data.consent || false,
            consentAccepted: data.consentAccepted || false
          });
        });
    }
  }, [testId, apiUrl]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/tests/step3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: testId,  // Pass the test ID
          ...formData
        })
      });

      if (response.ok) {
        console.log('Test updated successfully');
        window.location.href = '/';
      } else {
        console.error('Error updating test');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      window.location.href = '/step1';
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/8 bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Form Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Update Test</h3>

            <div className="mb-4">
              <label htmlFor="instruction" className="block text-lg font-medium">Instruction</label>
              <textarea
                id="instruction"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mr-2"
                />
                Consent
              </label>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="consentAccepted"
                  checked={formData.consentAccepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                Consent Accepted
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Step3Form;