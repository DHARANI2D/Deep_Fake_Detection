// DeepFakeAnalyzer.js

import React, { useState } from 'react';
import './DeepFakeAnalyzer.css';
import Navbar from './Nav';

const AudioAnalyzer = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };
  const [confidence, setConfidence] = useState(null);
  const analyzeDeepFake = () => {
    // Perform deep fake analysis using audioFile
    // Example: Replace this logic with your actual analysis
    const fakeConfidence = Math.random() * (60 - 20) + 20; // Range from 20 to 60
    setConfidence(fakeConfidence);
  };

  return (
    <>
        <Navbar/>
    <div className="container">
      <div className="header">
        <h1>Deep Fake Audio Analyzer</h1>
      </div>

      <div className="upload-section">
        <label className="label">Upload Audio:</label>
        <input type="file" accept="audio/*" className="file-input" onChange={handleAudioUpload} />

        <center>
          <button className="analyze-button" onClick={analyzeDeepFake}>
            Analyze
          </button></center>
      </div>

      <div className="result-section">
          <div className="result-label">
            <h2>Result</h2>
          </div>
          {confidence !== null && (
            <p className="result"><span style={{marginRight :"20px",fontWeight:"500"}}>Confidence Percentage : </span>{` ${confidence.toFixed(2)}%         `}<span style={{color:"Red", marginLeft :"20px", fontWeight:"500"}}>Fake</span></p>
          )}
        </div>
    </div></>
  );
};

export default AudioAnalyzer;
