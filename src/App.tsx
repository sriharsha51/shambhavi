import React, { useState } from 'react';
import SoundPlayer from './components/SoundPlayer';
import { Button } from '@mui/material';

interface AudioFile {
  src: string;
  delay: number;
  repeat: number;
}

const App: React.FC = () => {
  const [delays, setDelays] = useState<number[]>([120000, 40000, 40000, 10000, 1000, 300000, 25000, 1000, 60000, 60000, 300000, 1000]); // Default delays
  const [startIndex, setStartIndex] = useState<number>(0); // Track the index to start playback from
  const [play, setPlay] = useState<boolean>(false); // Control when to start playback
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null); // For Wake Lock API

  const audioFiles: AudioFile[] = [
    { src: `${import.meta.env.BASE_URL}pathangasan.mp3`, delay: delays[0], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}shishupalasanRight.mp3`, delay: delays[1], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}shishupalasanLeft.mp3`, delay: delays[2], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}nadiVibhajan.mp3`, delay: delays[3], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}nadiVibhajanCount.mp3`, delay: delays[4], repeat: 3 },
    { src: `${import.meta.env.BASE_URL}analomVilom.mp3`, delay: delays[5], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}omChantingSeparator.mp3`, delay: delays[6], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}omChanting.mp3`, delay: delays[7], repeat: 21 },
    { src: `${import.meta.env.BASE_URL}vipareetSwas.mp3`, delay: delays[8], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}bandhanas.mp3`, delay: delays[9], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}shambhaviMudra.mp3`, delay: delays[10], repeat: 1 },
    { src: `${import.meta.env.BASE_URL}openEyes.mp3`, delay: delays[11], repeat: 1 },
  ];

  const handleDelayChange = (index: number, newDelay: number) => {
    const updatedDelays = [...delays];
    updatedDelays[index] = newDelay;
    setDelays(updatedDelays);
  };

  const handlePlayFromIndex = (index: number) => {
    setStartIndex(index); // Set the index from where playback should start
  };

  const handlePlayAll = async () => {
    try {
      // Request Wake Lock
      if ('wakeLock' in navigator) {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);

        // Listen for release events
        lock.addEventListener('release', () => {
          console.log('Wake Lock was released');
        });
      }
    } catch (err) {
      console.error(`Failed to acquire Wake Lock: ${err.message}`);
    }

    setPlay(true); // Trigger playback
  };

  const releaseWakeLock = () => {
    if (wakeLock) {
      wakeLock.release().catch((err) => {
        console.error(`Failed to release Wake Lock: ${err.message}`);
      });
      setWakeLock(null);
    }
  };

  return (
    <div>
      <h1>Shambhavi Mahamudra</h1>
      <Button style={{ alignSelf: 'center', marginInline: 40 }} variant="contained" onClick={handlePlayAll}>
        Play
      </Button>
      {audioFiles.map((file, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p>
            Audio File {index + 1}: {file.src} (Repeat {file.repeat} times)
          </p>
          <label>
            Delay after this file (ms):
            <input
              type="number"
              value={delays[index]}
              onChange={(e) => handleDelayChange(index, parseInt(e.target.value))}
            />
          </label>
          <button onClick={() => handlePlayFromIndex(index)}>Set the audio file to be played from</button>
        </div>
      ))}
      <SoundPlayer audioFiles={audioFiles} startIndex={startIndex} play={play} onPlaybackComplete={releaseWakeLock} />
    </div>
  );
};

export default App;
