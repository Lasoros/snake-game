import { useState } from "react";
import "./App.css";
import GameState from "./components/GameState";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <GameState />
      </div>
    </>
  );
}

export default App;
