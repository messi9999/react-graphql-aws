
import React, { useState } from 'react';


const LoadingButton = ({ onClick, children }) => {
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
  
    const handleClick = async () => {
      setLoading(true);
      await onClick();
      setLoading(false);
      setCompleted(true);
    };
  
    return (
      <button className="btn-submit" onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : completed ? 'Submit' : children}
      </button>
    );
  };

export default LoadingButton;

            