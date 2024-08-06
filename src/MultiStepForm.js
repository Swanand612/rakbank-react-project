import React, { useState } from 'react';
import FormStep from './FormStep';

const steps = [
  { title: 'How was your week overall?', options: [{ icon: '👍', label: 'Good', value: 'good' }, { icon: '🤔', label: 'Average', value: 'average' }, { icon: '👎', label: 'Bad', value: 'bad' }] },
  { title: 'How productive were you?', options: [{ icon: '👍', label: 'Very Productive', value: 'very_productive' }, { icon: '🤔', label: 'Somewhat Productive', value: 'somewhat_productive' }, { icon: '👎', label: 'Not Productive', value: 'not_productive' }] },
  { title: 'Did you achieve your goals?', options: [{ icon: '👍', label: 'Yes', value: 'yes' }, { icon: '🤔', label: 'Partially', value: 'partially' }, { icon: '👎', label: 'No', value: 'no' }] },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (value) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
    if (currentStep >= steps.length - 1) {
      handleSubmit(answers);
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    try {
    const response = await fetch('http://localhost:3001/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalAnswers)
    });
    // Handle submission success/failure here
    if (response.ok) {
        console.log('Submission successful');
    } else {
        console.log('Submission failed');
    }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-purple-200 h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        <div className="relative h-64">
          <div className="absolute inset-0 transition-transform transform" style={{ transform: `translateY(-${currentStep * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
            {steps.map((step, index) => (
              <div key={index} className="h-64 flex items-center justify-center bg-purple-500 text-white">
                <FormStep
                  title={step.title}
                  options={step.options}
                  onSelect={handleSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
