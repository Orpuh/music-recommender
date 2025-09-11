import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  const [artists, setArtists] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const artistList = artists.split(',').map(artist => artist.trim()).filter(artist => artist);
      
      if (artistList.length === 0) {
        throw new Error('Please enter at least one artist');
      }
      
      if (artistList.length > 5) {
        throw new Error('Please enter no more than 5 artists');
      }

      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artists: artistList }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faMusic} className="music-icon" /> RECOMMENDLY
        </h1>
        <p>Enter up to 5 artists you like, separated by commas</p>
      </header>

      <main className="App-main">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={artists}
            onChange={(e) => setArtists(e.target.value)}
            placeholder="e.g., The Beatles, Radiohead, Kendrick Lamar"
            className="artist-input"
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="recommendations">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <h2>{rec.artistName}</h2>
              <div className="tags">
                <span className="tag">{rec.genre}</span>
                <span className="tag">{rec.era}</span>
                <span className="tag">{rec.artistType}</span>
              </div>
              <p className="explanation">{rec.explanation}</p>
              {rec.spotifyUrl && (
                <a 
                  href={rec.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="spotify-button"
                >
                  <FontAwesomeIcon icon={faSpotify} /> Listen on Spotify
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
