import React, { useState, useEffect } from 'react';
import './HomePage.scss';

const client = {
  generations: {
    create: async (params) => {
      const response = await fetch('/api/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return response.json();
    },
    get: async (id) => {
      const response = await fetch(`/api/generations/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch generation details');
      }
      return response.json();
    }
  }
};

function HomePage() {
  const [generationId, setGenerationId] = useState(null);
  const [generationDetails, setGenerationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');

  async function generateImage() {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    setLoading(true);
    setError(null);
    setGenerationDetails(null);
    try {
      const generation = await client.generations.create({
        aspect_ratio: '16:9',
        prompt: prompt,
      });
      setGenerationId(generation.id);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let intervalId;

    async function fetchGenerationDetails() {
      if (!generationId) return;
      try {
        const details = await client.generations.get(generationId);
        setGenerationDetails(details);
        if (details.state === 'complete') {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error fetching generation details:', error);
        setError('Failed to fetch generation details');
        clearInterval(intervalId);
      }
    }

    if (generationId) {
      fetchGenerationDetails();
      intervalId = setInterval(fetchGenerationDetails, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [generationId]);

  const handleDownload = () => {
    if (generationDetails && generationDetails.assets && generationDetails.assets.image) {
      const link = document.createElement('a');
      link.href = generationDetails.assets.image;
      link.download = `luma-ai-generation-${generationId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container">
      <h1>Luma AI Video Generation</h1>
      <div className="form-group">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt"
          className="prompt-input"
        />
        <button onClick={generateImage} disabled={loading} className="generate-button">
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
      {loading && <div className="loader">Generating your video... This may take a few moments.</div>}
      {error && <p className="error">{error}</p>}
      {generationId && !loading && !error && (
        <p className="status">Generation in progress. ID: {generationId}</p>
      )}
      {generationDetails && (
        <div className="generation-details">
          <h2>Generation Details</h2>
          <p className="status">Status: {generationDetails.state}</p>
          {generationDetails.state === 'complete' && generationDetails.assets && generationDetails.assets.image && (
            <div className="image-container">
              <img src={generationDetails.assets.image} alt="Generated image" className="generated-image" />
              <button onClick={handleDownload} className="download-button">Download Video</button>
            </div>
          )}
          {generationDetails.state !== 'complete' && (
            <p>Your video is still being generated. Please wait...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;