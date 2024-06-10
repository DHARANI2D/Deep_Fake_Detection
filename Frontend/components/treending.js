import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const API_KEY = 'AIzaSyClayeMJE73Mc8oeq0RLAjc2gZBXGzr1Ag'; // Replace with your actual API key
const BACKEND_API_URL = 'YOUR_BACKEND_API_URL'; // Replace with your actual backend API URL

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet',
              chart: 'mostPopular',
              regionCode: 'IN',
              maxResults: 15,
              key: API_KEY,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const checkDeepfake = async (videoId) => {
    try {
      // Assuming your backend endpoint returns true or false for deepfake detection
      const response = await axios.post(BACKEND_API_URL, { videoId });
      return response.data.isDeepfake;
    } catch (error) {
      console.error('Error checking deepfake:', error);
      return false;
    }
  };

  // Define your custom theme
  const theme = createTheme({
    palette: {
      background: {
        default: '#000000', // Black background
      },
      primary: {
        main: '#6d75ff', // Primary color
      },
      text: {
        primary: '#ffffff', // Text color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 style={{ color: '#ffffff' }}>Top Trending Videos</h1>
        <TableContainer>
          <Table>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <Card>
                      <img
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Card>
                  </TableCell>
                  <TableCell>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" style={{ color: 'black' }}>
                          {video.snippet.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </TableCell>
                  <TableCell>
                    <Card>
                      <CardContent>
                        {checkDeepfake(video.id) ? (
                          <span style={{ color: 'red' }}>✘Not Deepfake</span>
                        ) : (
                          <span style={{ color: 'green' }}>✘ Not Deepfake</span>
                        )}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Link to='/videoana'>
            <button type="button" style ={{width:"100px"}}>For Manual Analysis</button>
      </Link>
    </div>
      </div>
    </ThemeProvider>
  );
};

export default VideoList;
