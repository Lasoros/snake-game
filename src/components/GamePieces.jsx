import React, { useRef, useState } from "react";

const GamePieces = () => {
  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [apple, setApple] = useState({ x: 180, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);

  const [direction, setDirection] = useState(null);

  return (
    <div>
      <canvas
        className="gameCanvas"
        ref={canvasRef}
        width={750}
        height={420}
      ></canvas>
    </div>
  );
};

export default GamePieces;
