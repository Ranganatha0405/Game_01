import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Radio } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "SIGNAL_01",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/glitch1/200/200"
  },
  {
    id: 2,
    title: "SIGNAL_02",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/glitch2/200/200"
  },
  {
    id: 3,
    title: "SIGNAL_03",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/glitch3/200/200"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSkipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handleSkipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-sm bg-black p-6 terminal-border-magenta flex flex-col gap-4">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={handleSkipForward}
      />
      
      <div className="flex flex-col gap-2">
        <div className="relative aspect-square w-full border-2 border-glitch-magenta/20 overflow-hidden">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-full h-full object-cover grayscale contrast-150 ${isPlaying ? 'flicker' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-glitch-magenta/10 mix-blend-overlay" />
          {isPlaying && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Radio className="text-glitch-magenta animate-pulse" size={16} />
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-xl text-glitch-magenta uppercase tracking-tighter glitch-text" data-text={currentTrack.title}>{currentTrack.title}</h3>
          <p className="text-glitch-cyan/60 text-xs uppercase tracking-widest">SOURCE: {currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="h-1 w-full bg-glitch-magenta/20 overflow-hidden">
          <div 
            className="h-full bg-glitch-magenta shadow-[0_0_8px_#ff00ff]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] text-glitch-magenta/40 uppercase">
          <span>STREAM_POS</span>
          <span>END_OF_FILE</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <button 
          onClick={handleSkipBack}
          className="text-glitch-cyan hover:text-glitch-magenta transition-colors"
        >
          <Rewind size={20} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 border-2 border-glitch-magenta flex items-center justify-center text-glitch-magenta hover:bg-glitch-magenta hover:text-black transition-all"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        
        <button 
          onClick={handleSkipForward}
          className="text-glitch-cyan hover:text-glitch-magenta transition-colors"
        >
          <FastForward size={20} />
        </button>
      </div>
    </div>
  );
};
