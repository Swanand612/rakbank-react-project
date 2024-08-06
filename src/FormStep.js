import React from 'react';

const FormStep = ({ title, options, onSelect }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold mb-8">{title}</h2>
      <div className="flex space-x-8">
        {options.map(option => (
          <button
            key={option.label}
            className="p-4 bg-gray-100 hover:bg-gray-300 rounded-full text-4xl transition-all"
            onClick={() => onSelect(option.value)}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormStep;
