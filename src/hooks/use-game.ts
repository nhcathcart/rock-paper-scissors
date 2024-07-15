import { useEffect, useState } from "react";

export type Selection = "rock" | "paper" | "scissors" | null;
export type WhoWon = "player1" | "player2" | "tie" | null;

export interface GameState {
  hasStarted: boolean;
  player1: string;
  player2: string;
  onePlayer: boolean;
  isPlayer1Turn: boolean;
  player1Score: number;
  player2Score: number;
  player1Selection: Selection;
  player2Selection: Selection;
  showWinModal: boolean;
  whoWon: WhoWon;
}

const defaultGameState: GameState = {
  hasStarted: false,
  player1: "",
  player2: "Computer",
  onePlayer: true,
  isPlayer1Turn: true,
  player1Score: 0,
  player2Score: 0,
  player1Selection: null,
  player2Selection: null,
  showWinModal: false,
  whoWon: null,
};

const winMap = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

export default function useGame() {
  const [gameState, setGameState] = useState<GameState>(
    getPersistedGameState() ?? defaultGameState
  );

  // Save game state to local storage on changes
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(gameState);
      localStorage.setItem("gameState", serializedState);
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  }, [gameState]);
  //retrieve game state from local storage
  function getPersistedGameState(): GameState {
    const persistedGameState = localStorage.getItem("gameState");
    if (persistedGameState) {
      return JSON.parse(persistedGameState);
    }
    return defaultGameState;
  }
  
  function startGame() {
    setGameState((prevState) => ({
      ...prevState,
      hasStarted: true,
    }));
  }

  function setNumberOfPlayers(numberOfPlayers: number) {
    setGameState((prevState) => ({
      ...prevState,
      player2: numberOfPlayers === 1 ? "Computer" : "",
      onePlayer: numberOfPlayers === 1,
    }));
  }

  function updatePlayerName(player: "player1" | "player2", name: string) {
    setGameState((prevState) => ({
      ...prevState,
      [player]: name,
    }));
  }

  function getComputerSelection(): Selection {
    const selections: Selection[] = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * selections.length);
    return selections[randomIndex];
  }

  function play(selection: Selection) {
    if (gameState.isPlayer1Turn) {
      if (gameState.onePlayer) {
        // Single-player mode: Player vs. Computer
        const computerSelection = getComputerSelection(); // Get the computer's selection
        const newGameState = {
          ...gameState,
          player1Selection: selection, //Set the player's selection
          player2Selection: computerSelection, // Set the computer's selection
        };
        checkWin(newGameState); //check win and update game state
        return;
      } else {
        // Two-player mode
        setGameState((prevState) => ({
          ...prevState,
          player1Selection: selection,
          isPlayer1Turn: false,
        }));
        return;
      }
    } else {
      // This branch is for player 2's turn in a two-player game
      const newGameState = {
        ...gameState,
        player2Selection: selection,
        isPlayer1Turn: true,
      };
      checkWin(newGameState); //check win and update game state
      return;
    }
  }

  function checkWin(tempGameState: GameState) {

    const { player1Selection, player2Selection } = tempGameState;

    //check for a tie, and toggle the modal
    if (player1Selection === player2Selection) {
      setGameState({
        ...tempGameState,
        isPlayer1Turn: true,
        showWinModal: true,
        whoWon: "tie",
      });
      return;
    }
    //check for a player 1 win
    const player1Wins = winMap[player2Selection!] === player1Selection;
    //update score, and toggle the modal
    if (player1Wins) {
      setGameState({
        ...tempGameState,
        player1Score: tempGameState.player1Score + 1,
        showWinModal: true,
        whoWon: "player1",
      });
    } else {
      setGameState({
        ...tempGameState,
        player2Score: tempGameState.player2Score + 1,
        showWinModal: true,
        whoWon: "player2",
      });
    }
  }

  function resetGameState() {
    setGameState(defaultGameState);
  }

  function closeWinModal() {
    setGameState((prevState) => ({
      ...prevState,
      showWinModal: false,
    }));
  }

  return {
    gameState,
    setNumberOfPlayers,
    updatePlayerName,
    play,
    resetGameState,
    startGame,
    closeWinModal,
  };
}
