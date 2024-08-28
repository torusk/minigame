import React, { useState } from "react";

interface AudioSettingsProps {
  setVolume: (volume: number) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ setVolume }) => {
  const [currentVolume, setCurrentVolume] = useState<number>(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
};

export default AudioSettings;
