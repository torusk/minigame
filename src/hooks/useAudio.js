import { useRef, useCallback, useEffect, useState } from "react";

function useAudio() {
  const audioContext = useRef(null);
  const gainNode = useRef(null);
  const sources = useRef({});
  const buffers = useRef({});
  const [isLoaded, setIsLoaded] = useState(false);

  const initAudio = useCallback(async () => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);

    const audioFiles = {
      bgm: "/game_bgm.mp3",
      gameOver: "/game_over.mp3",
      plateShoot: "/plate_shoot.mp3",
      collision: "/collision.mp3",
    };

    const loadPromises = Object.entries(audioFiles).map(async ([key, url]) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      buffers.current[key] = await audioContext.current.decodeAudioData(
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

  const setVolume = useCallback((volume) => {
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(
        volume,
        audioContext.current.currentTime
      );
    }
  }, []);

  const playSound = useCallback(
    (soundName, loop = false) => {
      if (!isLoaded || !buffers.current[soundName]) return;

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
    [isLoaded]
  );

  const stopSound = useCallback((soundName) => {
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
  };
}

export default useAudio;
