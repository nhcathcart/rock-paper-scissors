import useGame from "./hooks/use-game";
import { Form } from "./components/form";
import { Game } from "./components/game";
import { WinModal } from "./components/win-modal";


export default function App() {
  const {
    gameState,
    setNumberOfPlayers,
    updatePlayerName,
    play,
    startGame,
    resetGameState,
    closeWinModal,
  } = useGame();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* render the Form component or the game based on whether the game has started*/}
      {gameState.hasStarted ? (
        <Game
          gameState={gameState}
          play={play}
          resetGameState={resetGameState}
        /> 
      ) : (
        <Form
          gameState={gameState}
          setNumberOfPlayers={setNumberOfPlayers}
          updatePlayerName={updatePlayerName}
          startGame={startGame}
        />
      )}
      {/* This is shown when each round is complete */}
      <WinModal isOpen={gameState.showWinModal} close={closeWinModal} gameState={gameState}/>
    </div>
  );
}