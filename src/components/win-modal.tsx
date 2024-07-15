import { ReactNode } from "react";
import { GameState } from "../hooks/use-game";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface WinModalProps {
  isOpen: boolean;
  close: () => void;
  gameState: GameState;
}

const iconClassName = "h-12 w-12";
const iconColor = "#64748b";
const selectionToIconMap = {
  rock: <FaRegHandRock className={iconClassName} color={iconColor} />,
  paper: <FaRegHandPaper className={iconClassName} color={iconColor} />,
  scissors: <FaRegHandScissors className={iconClassName} color={iconColor} />,
};

function TieDisplay(icon: ReactNode) {
  return (
    <>
      <h2 className="text-3xl">Tie!</h2>
      <div className="flex gap-4 items-center">
        {icon}
        <span>ties with</span>
        {icon}
      </div>
    </>
  );
}
function WinDisplay(
  winner: string,
  winnerIcon: ReactNode,
  loserIcon: ReactNode
) {
  return (
    <>
      <h2 className="text-3xl">{winner} wins!</h2>
      <div className="flex gap-4 items-center">
        {winnerIcon}
        <span>beats</span>
        {loserIcon}
      </div>
    </>
  );
}

function getDisplay(gameState: GameState) {
  if (gameState.whoWon === "tie") {
    return TieDisplay(selectionToIconMap[gameState.player1Selection!]);
  } else {
    if (gameState.whoWon === "player1") {
      return WinDisplay(
        gameState.player1,
        selectionToIconMap[gameState.player1Selection!],
        selectionToIconMap[gameState.player2Selection!]
      );
    } else {
      return WinDisplay(
        gameState.player2,
        selectionToIconMap[gameState.player2Selection!],
        selectionToIconMap[gameState.player1Selection!]
      );
    }
  }
}
export function WinModal({ isOpen, close, gameState }: WinModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute w-full h-full flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute w-full h-full bg-black bg-opacity-75"
            onClick={() => close()}
          />
          <motion.div
            initial={{ scale: 0.75 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative rouded-full h-[50vh] min-w-[50vh] bg-white text-black flex justify-between pt-8 pb-6 gap-12 items-center rounded-lg flex-col"
          >
            {/* This gets the appropiate display based on the outcome of the round */}
            {getDisplay(gameState)} 
            <button
              onClick={() => close()}
              className="bg-slate-700 px-2 py-3 hover: hover:bg-slate-900 hover:scale-105 active:scale-100 text-white rounded-md w-full max-w-36"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
