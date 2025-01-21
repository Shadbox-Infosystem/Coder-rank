import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../components/Navbar';

const Step2Form = () => {
  const [formData, setFormData] = useState({
    accessType: '',
    leavingPage: '',
    respondents: [],
  });

  const fields = [
    { field_name: "age", field_type: "integer" },
    { field_name: "city", field_type: "string" },
    { field_name: "first_name", field_type: "string" },
    { field_name: "last_name", field_type: "string" },
    { field_name: "id_number", field_type: "string" },
    { field_name: "organization_name", field_type: "string" },
    { field_name: "postal_code", field_type: "string" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRespondentChange = (e) => {
    const { options } = e.target;
    const selectedRespondents = Array.from(options)
      .filter(option => option.selected)
      .map(option => JSON.parse(option.value)); // Parse the selected options as JSON

    setFormData((prev) => ({ ...prev, respondents: selectedRespondents }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { test: formData };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tests/step2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Step 2 data submitted successfully');
        // Redirect to the next step (Step 3)
        window.location.href = '/tests/step3';
      } else {
        console.error('Error submitting form data');
        window.location.href = '/tests/step2';
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="accessType" className="block text-lg font-medium">Access Type</label>
              <select
                id="accessType"
                name="accessType"
                value={formData.accessType}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label htmlFor="leavingPage" className="block text-lg font-medium">Leaving Page</label>
              <select
                id="leavingPage"
                name="leavingPage"
                value={formData.leavingPage}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="disable">Disable</option>
                <option value="enable">Enable</option>
              </select>
            </div>

            <div>
              <label htmlFor="respondents" className="block text-lg font-medium">Respondents</label>
              <select
                name="respondents"
                multiple
                value={formData.respondents.map(r => JSON.stringify(r))} // Ensure it maps back to selected objects
                onChange={handleRespondentChange}
                className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fields.map((field, index) => (
                  <option key={index} value={JSON.stringify(field)}>
                    {field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Step2Form;