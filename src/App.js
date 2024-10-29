import React, { useState } from 'react';
import './App.css'

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState('0');

  const handleButtonClick = (value) => {
    if (input === 'Error') {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('0');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleCalculate = () => {
    try {
      const expression = input.replace(/×/g, '*').replace(/÷/g, '/');
      const calculatedResult = eval(expression);
      
      setHistory([
        { operation: input, result: calculatedResult },
        ...history
      ]);
      
      setResult(calculatedResult.toString());
      setInput('');
    } catch (error) {
      setResult('Error');
      setInput('Error');
    }
  };

  const buttons = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '÷', type: 'operator' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '×', type: 'operator' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '-', type: 'operator' },
    { value: 'C', type: 'clear' },
    { value: '0', type: 'number' },
    { value: '=', type: 'equals' },
    { value: '+', type: 'operator' }
  ];

  return (
    <div className="calculator-container">
      {/* Display */}
      <div className="calculator-display">
        <div className="display-current">
          {input || result}
        </div>
        <div className="display-result">
          {input ? input : result}
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="calculator-grid">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => {
              if (btn.value === 'C') handleClear();
              else if (btn.value === '=') handleCalculate();
              else handleButtonClick(btn.value);
            }}
            className={`calculator-btn ${
              btn.type === 'number' ? 'btn-number' :
              btn.type === 'operator' ? 'btn-operator' :
              btn.type === 'equals' ? 'btn-equals' :
              'btn-clear'
            }`}
          >
            {btn.value}
          </button>
        ))}
      </div>

      {/* History Section */}
      <div className="history-container">
        <div className="history-header">
          <h3 className="history-title">Historial</h3>
          <button
            onClick={clearHistory}
            className="history-clear-btn"
          >
            Borrar historial
          </button>
        </div>
        <div className="history-list">
          {history.map((entry, index) => (
            <div key={index} className="history-item">
              <div className="history-operation">{entry.operation}</div>
              <div className="history-result">{entry.result}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;