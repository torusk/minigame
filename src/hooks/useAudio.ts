import { useRef, useCallback, useEffect, useState } from "react";

function useAudio() {
  // オーディオコンテキストと各種ノードの参照を保持
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const sources = useRef<{ [key: string]: AudioBufferSourceNode }>({});
  const buffers = useRef<{ [key: string]: AudioBuffer }>({});

  // オーディオの読み込み状態とミュート状態を管理
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // オーディオの初期化処理
  const initAudio = useCallback(async () => {
    // オーディオコンテキストとゲインノードの作成
    audioContext.current = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);

    // 使用する音声ファイルの定義
    const audioFiles: { [key: string]: string } = {
      bgm: "/game_bgm.mp3",
      gameOver: "/game_over.mp3",
      plateShoot: "/plate_shoot.mp3",
      collision: "/collision.mp3",
      finish: "/finish.mp3", // 新しい音源を追加
    };

    // 音声ファイルの読み込みと解読
    const loadPromises = Object.entries(audioFiles).map(async ([key, url]) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      buffers.current[key] = await audioContext.current!.decodeAudioData(
        arrayBuffer
      );
    });

    // 全ての音声ファイルの読み込みが完了したらフラグを更新
    await Promise.all(loadPromises);
    setIsLoaded(true);
  }, []);

  // コンポーネントのマウント時にオーディオを初期化
  useEffect(() => {
    initAudio();
    return () => {
      // コンポーネントのアンマウント時にオーディオコンテキストを閉じる
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [initAudio]);

  // 音量の設定
  const setVolume = useCallback((volume: number) => {
    if (gainNode.current && audioContext.current) {
      gainNode.current.gain.setValueAtTime(
        volume,
        audioContext.current.currentTime
      );
    }
  }, []);

  // ミュートの切り替え
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setVolume(isMuted ? 1 : 0);
  }, [isMuted, setVolume]);

  // 音声の再生
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

      // 既に再生中の場合は停止
      if (sources.current[soundName]) {
        sources.current[soundName].stop();
      }

      // 新しい音源を作成して再生
      const source = audioContext.current.createBufferSource();
      source.buffer = buffers.current[soundName];
      source.connect(gainNode.current);
      source.loop = loop;
      source.start();
      sources.current[soundName] = source;

      // 停止用の関数を返す
      return () => {
        source.stop();
        delete sources.current[soundName];
      };
    },
    [isLoaded, isMuted]
  );

  // 音声の停止
  const stopSound = useCallback((soundName: string) => {
    if (sources.current[soundName]) {
      sources.current[soundName].stop();
      delete sources.current[soundName];
    }
  }, []);

  // 各種音声再生関数
  const playBgm = useCallback(() => playSound("bgm", true), [playSound]);
  const stopBgm = useCallback(() => stopSound("bgm"), [stopSound]);
  const playGameOver = useCallback(() => playSound("gameOver"), [playSound]);
  const playPlateShoot = useCallback(
    () => playSound("plateShoot"),
    [playSound]
  );
  const playCollision = useCallback(() => playSound("collision"), [playSound]);

  // 新しい音源再生関数を追加
  const playFinish = useCallback(() => playSound("finish"), [playSound]);

  // 外部から使用する関数とステートを返す
  return {
    isLoaded,
    playBgm,
    stopBgm,
    playGameOver,
    playPlateShoot,
    playCollision,
    playFinish, // 新しい関数を追加
    setVolume,
    toggleMute,
    isMuted,
  };
}

export default useAudio;
