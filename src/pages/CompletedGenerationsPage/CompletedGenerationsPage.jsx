import React, { useState, useEffect } from 'react';
import './CompletedGenerationsPage.scss';

const client = {
  generations: {
    list: async () => {
      const response = await fetch('http://localhost:3001/api/generations');
      if (!response.ok) {
        throw new Error('Failed to fetch generations');
      }
      return response.json();
    }
  }
};

function CompletedGenerationsPage() {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        console.log('Fetching generations...');
        const data = await client.generations.list();
        console.log('Fetched generations:', data);
        setGenerations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching generations:', error);
        setError('Failed to fetch generations: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGenerations();
  }, []);

  const handleDownload = (mediaUrl, generationId) => {
    if (mediaUrl) {
      const link = document.createElement('a');
      link.href = mediaUrl;
      link.download = `luma-ai-generation-${generationId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No media URL available for download');
    }
  };

  return (
    <div className="completed-generations">
      <h1>Completed Generations</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="generations-list">
        {generations.map((generation) => (
          <div key={generation.id} className="generation-item">
            <p>Prompt: {generation.prompt || 'No prompt available'}</p>
            <p>ID: {generation.id}</p>
            <p>Status: {generation.state}</p>
            {generation.mediaUrl ? (
              <div className="media-container">
                <video controls width="100%">
                  <source src={generation.mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button onClick={() => handleDownload(generation.mediaUrl, generation.id)}>
                  Download Video
                </button>
              </div>
            ) : (
              <p>Media not available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedGenerationsPage;
