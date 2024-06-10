// DeepFakeAnalyzer.js

import React, { useState } from 'react';
import './DeepFakeAnalyzer.css';
import Navbar from './Nav';

const TextAnalyzer = () => {
  const [textFile, setTextFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleTextFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ['text/plain', 'application/pdf', 'application/msword'];

    if (file && allowedFileTypes.includes(file.type)) {
      setTextFile(file);
    } else {
      alert('Please upload a valid text (TXT), PDF, or Word document (DOC) file.');
    }
  };

  const analyzeDeepFake = () => {
    // Perform deep fake analysis using textFile
    // Example: Replace this logic with your actual analysis
    const fakePercentage = Math.random() * 100; // Example: Random percentage
    setResult(fakePercentage);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1>Deep Fake Text Analyzer</h1>
        </div>

        <div className="upload-section">
          <label className="label">Upload Text File (TXT, PDF, DOC):</label>
          <input
            type="file"
            accept=".txt, .pdf, .doc, .docx"
            className="file-input"
            onChange={handleTextFileUpload}
          />
   <center>
          <button className="analyze-button" onClick={analyzeDeepFake}>
            Analyze
          </button></center>
        </div>

        <div className="result-section">
          <div className="result-label">
            <h2>Result</h2>
          </div>
          {result !== null && (
            <p className="result"><span style={{marginRight :"20px",fontWeight:"500"}}>Confidence Percentage : </span>{` ${result.toFixed(2)}%         `}<span style={{color:"green", marginLeft :"20px", fontWeight:"500"}}>Real</span></p>
          )}
        </div>
      </div>
    </>
  );
};

export default TextAnalyzer;
