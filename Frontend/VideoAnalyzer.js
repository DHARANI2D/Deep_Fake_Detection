import React, { useState } from 'react';
import './DeepFakeAnalyzer.css';
import Navbar from './Nav';
import ReactSpeedometer from 'react-d3-speedometer';
import Result from './ResultPage';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';

const VideoAnalyzer = () => {
  const [filepath, setfilepath] = useState(null);
  const [fakeConfidence,setfakeConfidence] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [vselectedFileName, setvSelectedFileName] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [analysisPerformed, setAnalysisPerformed] = useState(false);
  const [videoPlayerDisplayed, setVideoPlayerDisplayed] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
      const fileName = file.name;
      setvSelectedFileName(fileName);
    }
  };

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
    localStorage.setItem("rdfe",youtubeLink)
  };

  const downloadYoutubeVideo = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch('http://127.0.0.1:5000/download-youtube-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: youtubeLink }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message); // Download completed successfully
        const fileName = data.file_name;
        console.log(fileName);
        // Set the selected file name state
        setSelectedFileName(fileName);
        // Trigger the analysis and video player display
        const file_path = data.file_path;
        setfilepath(file_path);
        console.log(file_path);

        analyzeDeepFake();
      } else {
        console.error(data.message); // Log the error
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error or other issues
    } finally {
      setLoading(false); // Set loading state to false after completion (success or failure)
    }
  };

  const analyzeDeepFake = async () => {
    try {
      setLoading(true); // Set loading state to true
      const response = await fetch('http://127.0.0.1:5001/analyze');
      const data = await response.json();

      if (data.fake_confidence !== undefined) {
        setfakeConfidence(data.fake_confidence);
        console.log('Fake Confidence:', fakeConfidence);
        setAnalysisPerformed(true);
        setVideoPlayerDisplayed(true);
      } else {
        console.error('Error getting fake confidence:', data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false after completion (success or failure)
    }
  };
  const determineResult = () => {
    if (fakeConfidence < 0.9 && fakeConfidence == 1.0) {
      return 'Real';
    } else {
      return 'Fake';
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1>Deep Fake Video Analyzer</h1>
        </div>

        <div className="upload-section">
          <div className="half-section">
            <label className="label">Upload Video:</label>
            <input type="file" accept="video/*" className="file-input" onChange={handleFileChange} />
          </div>
          <div className="half-section">
            <center>
              <button className="analyze-button" onClick={analyzeDeepFake} disabled={videoPlayerDisplayed}>
                Analyze
              </button>
            </center>
            <div className="result-section">
              {loading && (
                <div className="loading-overlay" style={{ backgroundColor: 'white' }}>
                <p>Analzing...</p>
              </div>
              
              )}

              {analysisPerformed && confidence !== null && vselectedFileName && (
                <>
                  <Result videoName={vselectedFileName} />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="youtube-section">
          <div className="half-section">
            <label className="label">YouTube Link:</label>
            <input type="text" className="youtube-input" value={youtubeLink} onChange={handleYoutubeLinkChange} />
          </div>
          <div className="half-section">
            <center>
              <button className="download-button" onClick={downloadYoutubeVideo}>
                Download YouTube Video
              </button>
            </center>
          </div>
        </div>

        <div className="result-section">
          {analysisPerformed && confidence !== null && selectedFileName && (
            <>
              <Result videoName={selectedFileName} />
            </>
          )}

            {analysisPerformed ? (
              <div className="result-label">
                <h2>Result</h2>
                <ReactSpeedometer
                  value={confidence}
                  needleColor="black"
                  startColor="red"
                  endColor="green"
                  minValue={0}
                  maxValue={100}
                  segments={10}
                  ringWidth={30}
                  needleTransitionDuration={1000}
                />
              </div>
            ) : null}
            {analysisPerformed ? (
              <div>
                <InputGroup>
                <InputGroup.Text id="basic-addon2">
                Result: {confidence !== '' ? determineResult() : ''}
                </InputGroup.Text>
                </InputGroup>
              </div>
            ) : null}
            {analysisPerformed ? (
              <div>
                <Link to="/findpage">
                <button>Realated Videos</button>
                </Link>
                
              </div>
            ) : null}

        </div>
      </div>
    </>
  );
};

export default VideoAnalyzer;
