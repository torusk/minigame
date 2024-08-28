import { useRef, useCallback, useEffect, useState } from "react";

function useAudio() {
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const sources = useRef<{ [key: string]: AudioBufferSourceNode }>({});
  const buffers = useRef<{ [key: string]: AudioBuffer }>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const initAudio = useCallback(async () => {
    audioContext.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
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
        audioContext