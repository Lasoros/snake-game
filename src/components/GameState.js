import React, { useState } from 'react'

const GameState = () => {
 
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0)
}

export default GameState