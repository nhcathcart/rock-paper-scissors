import { ReactNode } from "react";
import { GameState } from "../hooks/use-game";
import { Selection } from "../hooks/use-game";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";

interface GameProps {
  gameState: GameState;
  play: (selection: Selection) => void;
  resetGameState: () => void;
}

const iconClassName = "h-6 w-6";
const iconColor = "#64748b";
const selectionArray: { name: Selection; icon: ReactNode }[] = [
  {
    name: "rock",
    icon: <FaRegHandRock className={iconClassName} color={iconColor} />,
  },
  {
    name: "paper",
    icon: <FaRegHandPaper className={iconClassName} color={iconColor} />,
  },
  {
    name: "scissors",
    icon: <FaRegHandScissors className={iconClassName} color={iconColor} />,
  },
];

function ScoreBoardItem({ player, score }: { player: string; score: number }) {
  return (
    <div className="flex flex-col items-center p-2 gap-1 justify-center border border-slate-700 border-opacity-50 rounded shadow-lg aspect-3/2 min-w-32">
      <label className="text-xl">{player}</label>
      <span className="text-2xl">{score}</span>
    </div>
  );
}

export function Game({ gameState, play, resetGameState }: GameProps) {
  return (
    <div className="flex flex-col justify-between items-center h-[60vh] md:h-[75vh] w-[75vw]">
      {/* SCOREBOARD */}
      <div className="flex justify-between w-full">
        <ScoreBoardItem
          player={gameState.player1}
          score={gameState.player1Score}
        />
        <ScoreBoardItem
          player={gameState.player2}
          score={gameState.player2Score}
        />
      </div>
      {/* PLAY INTERFACE */}
      <div className="flex flex-col items-center justify-center gap-12">
        <h3>
          {gameState.isPlayer1Turn ? `${gameState.player1}'s Turn` : `${gameState.player2}'s Turn`}
        </h3>
        <div className="flex gap-4">
          {/* map over the selection array to render the buttons */}
          {selectionArray.map((selection) => {
            return (
              <button
                key={selection.name}
                onClick={() => play(selection.name)}
                disabled={!gameState.hasStarted}
                className="flex justify-center items-center p-4 shadow-xl rounded border border-slate-700 border-opacity-50 hover:scale-105 active:scale-100"
              >
                {selection.icon}
              </button>
            );
          })}
        </div>
      </div>
      {/* RESET BUTTON */}
      <button
        onClick={(e) => {
          e.preventDefault();
          resetGameState();
        }}
        className="bg-red-700 px-2 py-3 max-w-36 hover:bg-red-900 hover:scale-105 active:scale-100 text-white rounded-md mt-4 w-full shadow-lg"
      >
        Reset Game
      </button>
    </div>
  );
}
