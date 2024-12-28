import React, { useState } from "react";
import GamePieces from "./GamePieces";

const GameState = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState("");

  const handleGameOver = (type) => {
    setGameOver(true);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }

    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key === "Enter") {
        handleResetGame();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, [gameOver]);

  return (
    <div>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>

      {gameOver && (
        <div>
          <p>
            Game Over!{" "}
            {collision == "wall"
              ? "Wall Struck, You Lose!"
              : "Snake No Taste Good"}
          </p>
          <p>Please Press Enter To Reset The Game</p>
        </div>
      )}
      {!gameOver && (
        <GamePieces
          score={score}
          setScore={setScore}
          onGameOver={(type) => handleGameOver(type)}
        />
      )}
    </div>
  );
};

export default GameState;
