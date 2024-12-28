import React, { useEffect, useRef, useState } from "react";

const GamePieces = () => {
  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [apple, setApple] = useState({ x: 180, y: 100 });
  const [snake, setSnake] = useState([
    { x: 100, y: 50 },
    { x: 95, y: 50 },
  ]);

  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // console.log(canvasRef.current); allows grabbing of properties of canvas when editing

    const cntxt = canvas.getContext("2d");

    const drawSnake = () => {
      snake.forEach((snakePart) => {
        cntxt.beginPath();
        cntxt.rect(snakePart.x, snakePart.y, 14, 14);
        cntxt.fillSyle = "#90EE90";
        cntxt.fill();
        cntxt.closePath();
      });
    };

    const drawApple = () => {
      cntxt.beginPath();
      cntxt.rect(apple.x, apple.y, 14, 14);
      cntxt.fillSyle = "#FF0000";
      cntxt.fill();
      cntxt.closePath();
    };

    const interval = setInterval(() => {
      cntxt.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApple();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction]);

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
