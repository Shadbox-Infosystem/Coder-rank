import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';

const TestForm = () => {
  const [formData, setFormData] = useState({
    testType: '',
    description: '',
    duration: '',
    testLanguage: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate(); // This is now the new navigation hook

  const handleNext = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData
    }));

    // If at the last step, submit the form
    if (currentStep === 3) {
      handleSubmit();
    } else {
      // Move to the next step
      setCurrentStep(currentStep + 1);
      navigate(`/tests/step${currentStep + 1}`); // Navigate to the next step
    }
  };

  const handleSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Test created successfully');
        navigate('/'); // Redirect to home after successful submission
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <div>
      {currentStep === 1 && <Step1Form formData={formData} onNext={handleNext} />}
      {currentStep === 2 && <Step2Form formData={formData} onNext={handleNext} />}
      {currentStep === 3 && <Step3Form formData={formData} onNext={handleSubmit} />}
    </div>
  );
};

export default TestForm;