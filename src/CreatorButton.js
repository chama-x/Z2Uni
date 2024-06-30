import React, { useState } from 'react';
import './CreatorButton.css';

const CreatorButton = () => {
  const [isTextChanged, setIsTextChanged] = useState(false);

  const handleClick = () => {
    setIsTextChanged(!isTextChanged);
  };

  return (
    <div className="creator-button-container">
      <div className={`creator-fancy-button ${isTextChanged ? 'flipped' : ''}`} onClick={handleClick}>
        <div className="creator-fancy-front">
          Show Creator
        </div>
        <div className="creator-fancy-back">
          Chamath Thiwanka <span className='bict'> BICT(Hons) USJP</span>
        </div>
      </div>
    </div>
  );
};

export default CreatorButton;