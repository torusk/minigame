import { useRef, useCallback, useEffect, useState } from "react";

function useAudio() {
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const sources = useRef<{ [key: string]: AudioBufferSourceNode }>({});
  const buffers = useRef<{ [key: string]: AudioBuffer }>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const initAudio = useCallback(async () => {
    audioContext.current = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);

    const audioFiles: { [key: string]: string } = {
      bgm: "/game_bgm.mp3",
      gameOver: "/game_over.mp3",
      plateShoot: "/plate_shoot.mp3",
      collision: "/collision.mp3",
    };

    const loadPromises = Object.entries(audioFiles).map(async ([key, url]) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      buffers.current[key] = await audioContext.current!.decodeAudioData(
        arrayBuffer
      );
    });

    await Promise.all(loadPromises);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    initAudio();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [initAudio]);

  const setVolume = useCallback((volume: number) => {
    if (gainNode.current && audioContext.current) {
      gainNode.current.gain.setValueAtTime(
        volume,
        audioContext.current.currentTime
      );
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setVolume(isMuted ? 1 : 0);
  }, [isMuted, setVolume]);

  const playSound = useCallback(
    (soundName: string, loop = false): (() => void) | undefined => {
      if (
        !isLoaded ||
        !buffers.current[soundName] ||
        !audioContext.current ||
        !gainNode.current ||
        isMuted
      )
        return;

      if (sources.current[soundName]) {
        sources.current[soundName].stop();
      }

      const source = audioContext.current.createBufferSource();
      source.buffer = buffers.current[soundName];
      source.connect(gainNode.current);
      source.loop = loop;
      source.start();
      sources.current[soundName] = source;

      return () => {
        source.stop();
        delete sources.current[soundName];
      };
    },
    [isLoaded, isMuted]
  );

  const stopSound = useCallback((soundName: string) => {
    if (sources.current[soundName]) {
      sources.current[soundName].stop();
      delete sources.current[soundName];
    }
  }, []);

  const playBgm = useCallback(() => playSound("bgm", true), [playSound]);
  const stopBgm = useCallback(() => stopSound("bgm"), [stopSound]);
  const playGameOver = useCallback(() => playSound("gameOver"), [playSound]);
  const playPlateShoot = useCallback(
    () => playSound("plateShoot"),
    [playSound]
  );
  const playCollision = useCallback(() => playSound("collision"), [playSound]);

  return {
    isLoaded,
    playBgm,
    stopBgm,
    playGameOver,
    playPlateShoot,
    playCollision,
    setVolume,
    toggleMute,
    isMuted,
  };
}

export default useAudio;
