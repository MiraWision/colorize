import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

// Assume extractOpacity and parseNumbers are imported or defined here
// import { extractOpacity, parseNumbers } from './your-function-file';

const ColorDemo = () => {
  const [color, setColor] = useState('');
  const [result, setResult] = useState({});

  const handleExtractOpacity = () => {
    try {
      const result = extractOpacity(color);
      setResult(result);
    } catch (error) {
      console.error(error.message);
      setResult({ error: error.message });
    }
  };

  const handleParseNumbers = (format) => {
    try {
      const result = parseNumbers(color, format);
      setResult(result);
    } catch (error) {
      console.error(error.message);
      setResult({ error: error.message });
    }
  };

  return (
    <div>
      <h3>Color Functions Demo</h3>
      <div>
        <InputText value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter a color" />
      </div>
      <div>
        <Button label="Extract Opacity" onClick={handleExtractOpacity} />
        <Button label="Parse to RGB" onClick={() => handleParseNumbers('rgb')} />
        <Button label="Parse to RGBA" onClick={() => handleParseNumbers('rgba')} />
        <Button label="Parse to HSL" onClick={() => handleParseNumbers('hsl')} />
        <Button label="Parse to HSLA" onClick={() => handleParseNumbers('hsla')} />
      </div>
      <div>
        {result.error ? (
          <p>Error: {result.error}</p>
        ) : (
          <ul>
            {Object.entries(result).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ColorDemo;
