
# Rock Paper Scissors



## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Thought-Process](#thought-process)
- [Next-Steps](#next-steps)
## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nhcathcart/rock-paper-scissors.git
    ```
2. Navigate to the project directory:
    ```bash
    cd rock-paper-scissors
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and go to `http://localhost:5173` to play the game.

## Testing

To run the test suite, use the following command:
```bash
npm run test
```

## Thought-Process

**Requirements**
* Allow two players to enter their names
* One of the players can also be the computer, i.e. player vs computer
* Allow each to play a turn, one at a time, during which the player selects one of the option from rock, paper, scissors
* During each turn notify who has won and increment the scores
* In addition to implementing basic gameplay, the user must be able to save their game
* You can choose to code the UI only or Backend only or both UI and Backend. However, timebox it to 3 hours and let us know how much you were able to achieve and what improvements you would have worked on if you had more time. We would like to read your documentation on this.
* The goal is for players to play in the same browser.

**My Thought Process**

Before we begin here are a couple of thoughts:
1. Users shouldn't be able to see what the opponent has played until after their selection.
2. Once the game has started we will not want to see the input interface for player names etc.
3. Game progress should be automatically saved, and then should be reset by the user when they want to begin a new game.

To achieve the requirements, we will build a React Application that stores game state through the use of a custom hook, and persists the game state to local storage. 

--We will have two "layers" of components. A parent component "App" that will store state, and 3 "dumb" components for display.

 1. We will have a form component to gather usernames, and whether there will be one or two players. (This will not be an actual form tag, as we won't be submitting the form to a backend, but the UI will look like a form.)
 2.  We will have a game component to display the game interface and the scoreboard.
 3. We will have a win modal component to display the result of each round after both players have played (or one players has played and the computer has played).

--We will display either the form component or the game component based on whether the game has started.

--We will control whether the win modal is visible via a piece of state. This piece of state will be toggled in the game play logic (once a winner has been determined), and through a closing function that we can pass to the modal.

--We will persist the game state to local storage. We can achieve this through a useEffect hook in the game state that listens for changes to the game state and writes the changes to local storage. When the hook is initialized it will look in local storage for game state, so the game state can be saved between sessions.

## Next-Steps

Given more time here are some things I would work on next:

1. Tighten up the styling and interactivity of the interface to make it more "delightful". This could include color coding players, adding animations and visual feedback for the user, as well as more basic css changes. 
2. Add a database layer so the user can save a game, and retrieve it from a different browser.
3. Add functionality for a two person game where each player can play from a separate browser. This would include some kind of matchmaking service and a time limit for moves.