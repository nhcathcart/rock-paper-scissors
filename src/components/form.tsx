import { GameState } from "../hooks/use-game";

interface FormProps {
  gameState: GameState;
  startGame: () => void;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  updatePlayerName: (player: "player1" | "player2", name: string) => void;
}
export function Form({
  gameState,
  startGame,
  setNumberOfPlayers,
  updatePlayerName,
}: FormProps) {
  return (
    <div className="flex flex-col border shadow-xl rounded-xl px-4 pt-8 pb-4 gap-2 w-[300px] text-black">
      <div className="flex items-center gap-2">
        <label>Player Mode:</label>
        <select
          onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
          className="flex flex-grow rounded-md py-1.5 pl-3 pr-10 border border-gray-500 border-opacity-50 h-[38px]"
        >
          <option value={1}>1 Player</option>
          <option value={2}>2 Player</option>
        </select>
      </div>
      <label className="mt-4">Player 1:</label>
      <input
        type="text"
        value={gameState.player1}
        onChange={(e) => updatePlayerName("player1", e.target.value)}
        className="border border-gray-500 border-opacity-50 rounded-md py-1.5 px-3 w-full"
      />
      <label>Player 2:</label>
      <input
        type="text"
        value={gameState.player2 ?? ""}
        disabled={gameState.onePlayer}
        onChange={(e) => updatePlayerName("player2", e.target.value)}
        className="border border-gray-500 border-opacity-50 rounded-md py-1.5 pl-3 pr-10 w-full"
        style={{ backgroundColor: gameState.onePlayer ? "#f1f1f1" : "" }}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          startGame();
        }}
        className="bg-slate-700 px-2 py-3 hover: hover:bg-slate-900 hover:scale-105 active:scale-100 text-white rounded-md mt-4 w-full"
      >
        Start Game
      </button>
    </div>
  );
}
