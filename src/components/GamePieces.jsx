import React, { useEffect, useRef, useState } from "react";

const GamePieces = ({ score, setScore, onGameOver }) => {
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

    const snakeMove = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }

          switch (direction) {
            case "right":
              snakeHead.x += SNAKE_SPEED;
              break;
            case "left":
              snakeHead.x -= SNAKE_SPEED;
              break;
            case "up":
              snakeHead.y -= SNAKE_SPEED;
              break;
            case "down":
              snakeHead.y += SNAKE_SPEED;
              break;
            default:
              break;
          }

          newSnake[0] = snakeHead;

          handleAppleHit(newSnake);

          return newSnake;
        });
      }
    };

    const handleAppleHit = (newSnake) => {
      const snakeHead = newSnake[0];

      if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
        setScore(score++);

        setApple({
          x:
            Math.floor((Math.random() * canvas.width) / SNAKE_SPEED) *
            SNAKE_SPEED,
          y:
            Math.floor((Math.random() * canvas.height) / SNAKE_SPEED) *
            SNAKE_SPEED,
        });

        newSnake.push({
          x: newSnake[newSnake.length - 1].x,
          y: newSnake[newSnake.length - 1].y,
        });
      }
    };

    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const interval = setInterval(() => {
      cntxt.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApple();
      snakeMove();
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
