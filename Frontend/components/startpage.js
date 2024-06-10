// StartPage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AtomSpinner } from "react-epic-spinners";
import { Helmet } from "react-helmet";
import { Card } from "react-bootstrap"; 

const PageWrapper = styled.div`
  position: relative;
`;

const AppName = styled.h1`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff; /* White text color */
  padding: 20px;
  text-align: justify;
`;

const StyledHeading = styled.h1`
  margin-bottom: 20px;
  font-size: 28px; /* Increased font size */
`;

const StyledParagraph = styled.p`
  /* Add your styles here */
  font-size: 16px; /* Increased font size */
`;

const StyledButton = styled.button`
  background-color: #6d75ff;
  color: #fff;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:disabled {
    cursor: not-allowed;
  }
`;

const StartPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartEngineClick = async () => {
    setLoading(true);

    // Simulate a 7-second delay using async/await
    await new Promise((resolve) => setTimeout(resolve, 7000));

    setLoading(false);
    navigate("/trending");
  };

  useEffect(() => {
    let timeoutId;

    if (loading) {
      // Clean up the loading state if the component unmounts or the redirect happens
      timeoutId = setTimeout(() => setLoading(false), 7000);
    }

    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Deepfake Scanner</title>
      </Helmet>
      <AppName>Deepfake Scanner</AppName>

      <StyledContainer>
        <StyledHeading>Welcome to Deepfake Detection</StyledHeading>
        <div>
        <Card>
          <StyledParagraph>
            Welcome to the Deepfake Detector App! Detect deepfake videos, verify their authenticity,
            and find similar content based on tags. Use the power of AI to ensure the credibility of
            trending social media videos.
          </StyledParagraph>
        </Card>
        </div>
        <StyledButton onClick={handleStartEngineClick} disabled={loading}>
          {loading ? "Detecting..." : "Start Engine"}
        </StyledButton>
        {loading && <AtomSpinner color="#6d75ff" />}
      </StyledContainer>
    </PageWrapper>
  );
};

export default StartPage;
