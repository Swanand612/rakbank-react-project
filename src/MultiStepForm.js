import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'How was your week overall?',
    'How productive were you?',
    'Did you achieve your goals?',
  ];

  const options = [
    { icon: '👍', value: 'positive' },
    { icon: '🤔', value: 'neutral' },
    { icon: '👎', value: 'negative' },
  ];

  const handleSelect = (value) => {
    const response = {
      question: steps[currentStep],
      answer: value,
      id: Math.random().toString(36).substr(2, 9),
    };

    const apiEndpoint = 'http://localhost:3001/responses';

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    })
      .then((res) => res.json())
      .then(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setCurrentStep(0);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="form-container">
      <div className="question-panel">
        <TransitionGroup>
          <CSSTransition key={currentStep} timeout={500} classNames="slide">
            <div className="question">{steps[currentStep]}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className="options-panel">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => handleSelect(option.value)}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiStepForm;
