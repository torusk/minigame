import React, { useState } from 'react';

function AudioSettings({ setVolume }) {
  const [currentVolume, setCurrentVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <div className="audio-settings">
      <label htmlFor="volume-control">音量: </label>
      <input
        id="volume-control"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={currentVolume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default AudioSettings;
