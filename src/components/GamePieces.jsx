import React, { useEffect, useRef, useState } from "react";

const GamePieces = ({ score, setScore, onGameOver }) => {
  const canvasRef = useRef();
  const SNAKE_SPEED = 10;
  const [treat, setTreat] = useState({ x: 180, y: 100 });
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
        cntxt.fillStyle = "#8c9620";
        cntxt.fill();
        cntxt.closePath();
      });
    };

    const drawTreat = () => {
      cntxt.beginPath();
      cntxt.rect(treat.x, treat.y, 14, 14);
      cntxt.fillStyle = "#ce7e00";
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

          handleTreatHit(newSnake);
          handleWallHit(snakeHead);
          handleBodyHit(newSnake);

          return newSnake;
        });
      }
    };

    const handleBodyHit = (newSnake) => {
      const snakeHead = newSnake[0];
      for (let i = 1; i < newSnake.length; i++) {
        if (snakeHead.x === newSnake[i].x && snakeHead.y === newSnake[i].y) {
          onGameOver("self");
        }
      }
    };

    const handleWallHit = (snakeHead) => {
      if (
        snakeHead.x + SNAKE_SPEED > canvas.width ||
        snakeHead.x + SNAKE_SPEED < 0
      ) {
        onGameOver("wall");
      }

      if (
        snakeHead.y + SNAKE_SPEED > canvas.height ||
        snakeHead.y + SNAKE_SPEED < 0
      ) {
        onGameOver("wall");
      }
    };

    const handleTreatHit = (newSnake) => {
      const snakeHead = newSnake[0];

      if (snakeHead.x === treat.x && snakeHead.y === treat.y) {
        setScore(score++);

        setTreat({
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
      drawTreat();
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
