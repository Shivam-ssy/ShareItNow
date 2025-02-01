import { useEffect, useState } from 'react';

const ProgressBar = ({ value = 0, max = 100, color = "rgb(17 24 39)" }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Ensure value is between 0 and max
    const clampedValue = Math.min(Math.max(value, 0), max);
    setProgress(clampedValue);
  }, [value, max]);

  const percentage = (progress / max) * 100;

  return (
    <div className="w-full">
      {/* Label showing percentage */}
      <div className="flex justify-between mb-1">
        {/* <span className="text-sm font-medium text-gray-700">/span> */}
        {/* <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span> */}
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        {/* Animated progress fill */}
        <div 
          className="h-4 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;