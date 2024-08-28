import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./hooks/useAudio", () => ({
  __esModule: true,
  default: () => ({
    isLoaded: true,
    playBgm: jest.fn(),
    stopBgm: jest.fn(),
    playGameOver: jest.fn(),
    playPlateShoot: jest.fn(),
    playCollision: jest.fn(),
    setVolume: jest.fn(),
  }),
}));

jest.mock("./hooks/useGameLoop", () => ({
  __esModule: true,
  default: () => ({
    playerX: 0,
    enemies: [],
    plates: [],
    timeLeft: 30,
    totalCalories: 0,
    movePlayer: jest.fn(),
    stopPlayer: jest.fn(),
    shootPlate: jest.fn(),
  }),
}));

test("ゲームコンテナがレンダリングされること", () => {
  render(<App />);
  const gameContainer = screen.getByTestId("game-container");
  expect(gameContainer).toBeInTheDocument();
});
