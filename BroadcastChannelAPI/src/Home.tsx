import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [gameIdInput, setGameIdInput] = useState("");

  const handleCreateNewGame = () => {
    navigate("/controller");
  }

  const handleJoinExistingGame = () => {
    if (gameIdInput.trim()) {
      navigate(`/game/${gameIdInput}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-6">Uno Game</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Game ID"
              value={gameIdInput}
              onChange={(evt) => setGameIdInput(evt.target.value)}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full py-2 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300"
              onClick={handleJoinExistingGame}
            >
              Join Existing Game
            </button>
          </div>
        </div>
        <div className="bg-gray-100 p-4 text-center">
          <button
            className="text-blue-800 font-semibold text-lg hover:underline"
            onClick={handleCreateNewGame}
          >
            Create a New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;