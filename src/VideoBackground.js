// src/VideoBackground.js

import React from 'react';
import './App.css'; // Use App.css for styling

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline className="video-bg">
        <source src={`${process.env.PUBLIC_URL}/bg.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;