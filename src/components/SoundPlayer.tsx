import React, { useEffect, useRef, useState } from 'react';

interface AudioFile {
  src: string;
  delay: number;
  repeat: number;
}

interface SoundPlayerProps {
  audioFiles: AudioFile[];
  startIndex: number;
  play: boolean;
  onPlaybackComplete: () => void;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ audioFiles, startIndex, play, onPlaybackComplete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track whether audio is currently playing

  const playSequentially = async (startFromIndex: number) => {
    setIsPlaying(true); // Set to playing state
    for (let i = startFromIndex; i < audioFiles.length; i++) {
      const file = audioFiles[i];
      for (let j = 0; j < file.repeat; j++) {
        await playAudio(file.src);
      }
      await delay(file.delay); // Wait for custom delay after all repeats for this audio file
    }
    setIsPlaying(false); // Reset playing state after all files have played
    onPlaybackComplete(); // Notify parent component
  };

  const playAudio = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.pause(); // Stop any currently playing audio
      }
      audioRef.current = new Audio(src);
      audioRef.current.play();
      audioRef.current.onended = () => resolve(); // Resolve when audio ends
    });
  };

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (play && !isPlaying) {
      playSequentially(startIndex); // Start playing from the selected file index
    }
  }, [play, startIndex, audioFiles]);

  return (
    <div>
      <p>Playing Audio Files Sequentially</p>
    </div>
  );
};

export default SoundPlayer;
