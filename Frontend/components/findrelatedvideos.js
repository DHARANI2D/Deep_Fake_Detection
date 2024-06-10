// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tags, setTags] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const videoId = localStorage.getItem("rdfe"); // YouTube video ID for testing

  useEffect(() => {
    const getVideoTags = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyClayeMJE73Mc8oeq0RLAjc2gZBXGzr1Ag`
        );

        const videoTags = response.data.items[0]?.snippet.tags || [];
        setTags(videoTags);
        getRelatedVideos(videoTags);
      } catch (error) {
        console.error('Error fetching video tags:', error);
      }
    };

    const getRelatedVideos = async (tags) => {
      try {
        let nextPageToken = null;
        let allVideos = [];
    
        do {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${tags.join(
              ','
            )}&type=video&key=AIzaSyClayeMJE73Mc8oeq0RLAjc2gZBXGzr1Ag${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
          );
    
          const videos = response.data.items || [];
          allVideos = allVideos.concat(videos);
          nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
    
        setRelatedVideos(allVideos);
      } catch (error) {
        console.error('Error fetching related videos:', error);
      }
    };

    getVideoTags();
  }, [videoId]); // Run once on component mount, and whenever videoId changes

  return (
    <div>
      <h1>YouTube Video Tags and Related Videos</h1>
      {tags.length > 0 && (
        <div>
          <h2>Tags:</h2>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
      {relatedVideos.length > 0 && (
        <div>
          <h2>Related Videos:</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {relatedVideos.map((video) => (
                <tr key={video.id.videoId}>
                  <td>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.snippet.title}
                    </a>
                  </td>
                  <td>
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
