import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { UnoCard } from "./interfaces";
import { generateRandomCard, generateRandomCards } from "./utils";

const Game: React.FC = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();

    const [playerId] = useState(uuid());
    const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
    
    // Access the broadcast channel corresponding to the current game via the gameid
    const [broadcastChannel] = useState(() => new BroadcastChannel(gameId!));
    
    // Mainain a deck of cards for the player
    const [cards, setCards] = useState<UnoCard[]>([]);

    // Keep track of the current game card from the controller
    const [currentCard, setCurrentCard] = useState<UnoCard | null>(null);

    // Listen for incoming messages from the controller via the BroadcastChannel API
    useEffect(() => {
        if (!gameId) return;

        broadcastChannel.postMessage({ type: "PLAYER_JOIN", playerId });
        
        // Generate a deck of 7 random cards when the game starts
        setCards(generateRandomCards(7));

        const handleMessage = (evt: MessageEvent) => {
            switch (evt.data.type) {
                case "CURRENT_CARD":
                    setCurrentCard(evt.data.currentCard);
                    break;
                case "TURN_UPDATE":
                    setCurrentPlayer(evt.data.currentPlayer);
                    break;
                case "PLAYER_UNO":
                    if (evt.data.playerId !== playerId) {
                        alert(`Player ${evt.data.playerId} has UNO!`);
                    }
                    break;
                case "PLAYER_WON":
                    if (evt.data.playerId !== playerId) {
                        alert(`Player ${evt.data.playerId} has won!`);
                        navigate("/");
                    }
                    break;
                default:
                    console.warn(`Unhandled message type: ${evt.data.type}`);
            }
        };

        broadcastChannel.onmessage = handleMessage;
    }, [broadcastChannel, gameId, playerId, navigate]);

    // When a player plays a card, broadcast it to the controller to update the game card
    // Remove the played card from the players deck
    const makeMove = (card: UnoCard) => {
        if (currentPlayer !== playerId) return;

        broadcastChannel.postMessage({ type: "PLAYER_MOVE", playerId, card });

        const updatedDeck = cards.filter(elm => elm !== card);
        setCards(updatedDeck);

        // Check to see if we have a uno or a winner
        if (updatedDeck.length === 1) {
            broadcastChannel.postMessage({ type: "PLAYER_UNO", playerId });
        }

        if (updatedDeck.length === 0) {
            broadcastChannel.postMessage({ type: "PLAYER_WON", playerId });
            navigate('/');
        }
    };

    // Randomly 'draw' a new card and add it to the player's deck
    const drawCard = () => {
        if (currentPlayer !== playerId) return;

        const newCard = generateRandomCard();
        setCards(prevCards => [...prevCards, newCard]);
        broadcastChannel.postMessage({ type: "PLAYER_DRAW" });
    };

    // Convert text colors to HEX colors
    const getCardColor = (color: string) => {
        const colorMap: { [key: string]: string } = {
            red: "#FF5555",
            blue: "#5555FF",
            green: "#55AA55",
            yellow: "#FFAA00"
        };
        return colorMap[color] || color;
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4">Your Uno Cards</h1>

            <h2 className="text-2xl font-semibold mb-4">
                {!currentPlayer ? "Waiting for game to start..." :
                    currentPlayer === playerId ? "It's your turn!" :
                        `Waiting for player ${currentPlayer.slice(0, 8)}...'s turn`}
            </h2>

            {currentCard && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Current Card</h2>
                    <div
                        className="w-32 h-48 rounded-xl flex items-center justify-center text-white font-bold text-5xl mx-auto shadow-lg"
                        style={{ backgroundColor: getCardColor(currentCard.color) }}
                    >
                        {currentCard.number}
                    </div>
                </div>
            )}

            <div className="mt-auto">
                <div className="flex justify-center items-end space-x-2 mb-6 overflow-x-auto p-4">
                    {cards.map((card, index) => (
                        <button
                            key={index}
                            onClick={() => makeMove(card)}
                            className="w-24 h-36 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2"
                            style={{ backgroundColor: getCardColor(card.color) }}
                            disabled={currentPlayer !== playerId}
                        >
                            {card.number}
                        </button>
                    ))}
                </div>
                <button
                    onClick={drawCard}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
                    disabled={currentPlayer !== playerId}
                >
                    Draw Card
                </button>
            </div>
        </div>
    );
};

export default Game;