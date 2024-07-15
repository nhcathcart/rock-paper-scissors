import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import useGame from "../hooks/use-game";

describe("useGame hook", () => {
  let result = renderHook(() => useGame()).result;
  beforeEach(() => {
    localStorage.clear();
    result = renderHook(() => useGame()).result;
  })
  test("initializes game state correctly", () => {
    // const { result } = renderHook(() => useGame());
    expect(result.current.gameState.hasStarted).toBe(false);
    expect(result.current.gameState.player1).toBe("");
    expect(result.current.gameState.player2).toBe("Computer");
    expect(result.current.gameState.onePlayer).toBe(true);
    expect(result.current.gameState.isPlayer1Turn).toBe(true);
    expect(result.current.gameState.player1Score).toBe(0);
    expect(result.current.gameState.player2Score).toBe(0);
    expect(result.current.gameState.player1Selection).toBeNull();
    expect(result.current.gameState.player2Selection).toBeNull();
    expect(result.current.gameState.showWinModal).toBe(false);
    expect(result.current.gameState.whoWon).toBeNull();
  });
  test("when the game state is changed it is persisted to local storage", () => {
    // here we update the module level result variable, then we initialize a variable with a call to the hook to check if the state is persisted across renders
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    const localResult = renderHook(() => useGame()).result;
    
    expect(localResult.current.gameState.player1).toBe("John Doe");
  
  })
  test("updates player name correctly in a one person game", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    expect(result.current.gameState.player1).toBe("John Doe");
  });

  test("updates number of players correctly", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.setNumberOfPlayers(1);
    });
    expect(result.current.gameState.player2).toBe("Computer");
    expect(result.current.gameState.onePlayer).toBe(true);
    act(() => {
      result.current.setNumberOfPlayers(2);
    });
    expect(result.current.gameState.player2).toBe("");
    expect(result.current.gameState.onePlayer).toBe(false);
  });

  test("updates player name correctly in a two person game", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.setNumberOfPlayers(2);
    });
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    act(() => {
      result.current.updatePlayerName("player2", "Jane Doe");
    });
    expect(result.current.gameState.player1).toBe("John Doe");
    expect(result.current.gameState.player2).toBe("Jane Doe");
  });

  test("starts the game correctly", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.startGame();
    });
    expect(result.current.gameState.hasStarted).toBe(true);
  });

  test("resets the game state correctly", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.setNumberOfPlayers(2);
    });
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    act(() => {
      result.current.resetGameState();
    });
    expect(result.current.gameState.hasStarted).toBe(false);
    expect(result.current.gameState.player1).toBe("");
    expect(result.current.gameState.player2).toBe("Computer");
    expect(result.current.gameState.onePlayer).toBe(true);
    expect(result.current.gameState.isPlayer1Turn).toBe(true);
    expect(result.current.gameState.player1Score).toBe(0);
    expect(result.current.gameState.player2Score).toBe(0);
    expect(result.current.gameState.player1Selection).toBeNull();
    expect(result.current.gameState.player2Selection).toBeNull();
    expect(result.current.gameState.showWinModal).toBe(false);
    expect(result.current.gameState.whoWon).toBeNull();
  });

  test("it correctly finds the winner, and updates the score in a one person game", () => {
    // const { result } = renderHook(() => useGame());
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    act(() => {
      result.current.startGame();
    });
    act(() => {
      result.current.play("rock");
    });
    if (result.current.gameState.player2Selection === "rock") {
      expect(result.current.gameState.player1Score).toBe(0);
      expect(result.current.gameState.player2Score).toBe(0);
      expect(result.current.gameState.whoWon).toBe("tie");
    } else if (result.current.gameState.player2Selection === "paper") {
      expect(result.current.gameState.player1Score).toBe(0);
      expect(result.current.gameState.player2Score).toBe(1);
      expect(result.current.gameState.whoWon).toBe("player2");
    }else{
      expect(result.current.gameState.player1Score).toBe(1);
      expect(result.current.gameState.player2Score).toBe(0);
      expect(result.current.gameState.whoWon).toBe("player1")
    }
  });
  test("it correctly finds the winner, and updates the score in a two person game", () => {
    // const { result } = renderHook(() => useGame());
    
    act(() => {
      result.current.setNumberOfPlayers(2);
    });
    act(() => {
      result.current.updatePlayerName("player1", "John Doe");
    });
    act(() => {
      result.current.updatePlayerName("player2", "Jane Doe");
    })
    act(() => {
      result.current.startGame();
    });
    console.log("Game State : ", result.current.gameState)
    act(() => {
      result.current.play("rock");
    })
    act(() => {
      result.current.play("paper");
    })
    expect(result.current.gameState.player1Score).toBe(0);
    expect(result.current.gameState.player2Score).toBe(1);
    expect(result.current.gameState.whoWon).toBe("player2");
  })
});
