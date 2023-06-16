# Tic-Tac-Toe Game
This is a simple Tic-Tac-Toe game implemented in HTML, CSS, and JavaScript. The game allows two players to take turns marking spots on the game board until one player wins or the game ends in a tie. 

### Game Overview:
The game logic is organized into different modules and objects to maintain code modularity and encapsulation.

### Gameboard:
The gameboard is represented as an array inside the Gameboard object. It keeps track of the current state of the game and provides methods to update and retrieve the game board.

### Players:
Each player is represented by a player object. The player object stores the player's name, marker ('X' or 'O'), and keeps track of the player's turn.

### Game Flow:
The flow of the game is controlled by the Game object. It initializes the game, handles player turns, checks for a winner or tie, and provides the necessary methods to interact with the game.

### User Interface:
The user interface allows players to interact with the game board by clicking on the available spots to place their marker. The interface also displays the game status, player names, and provides a button to start or restart the game.

### Playing the game:
Enter the player names and choose markers.
Click on the game board to place your marker.
Play alternates between players until there is a winner or a tie.
Once the game is over, click the "Restart" button to play again.

### Winning Condition
The game checks for a winning condition by identifying three marks in a row (horizontal, vertical, or diagonal). If a winning condition is detected, the game declares the winning player and ends the game.

### Tie Condition
If there are no more available spots on the game board and no player has achieved a winning condition, the game ends in a tie.

### Conclusion
This Tic-Tac-Toe game provides an enjoyable and interactive gaming experience. It demonstrates the use of modules and objects to organize the game's logic, allows player names to be entered, displays game status.

*Readme written with the help of ChatGPT by providing it with a prompt that included project assignement and modifying its response to fit the outcome of the assignement.*
