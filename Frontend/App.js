// Main.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoAnalyzer from './VideoAnalyzer.js';
import AudioAnalyzer from './AudioAnalyzer';
import TextAnalyzer from './TextAnalyzer';

const Main = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<VideoAnalyzer/>}/>
      <Route path="/audio" element={<AudioAnalyzer/>}/>
      <Route path="/text" element={<TextAnalyzer/>} />
      </Routes>
      </BrowserRouter>
      </div>
      
  );
};

export default Main;
