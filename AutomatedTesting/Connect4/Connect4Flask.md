---
layout: default
---

## Placeholder for the full connect 4 MiniMax Explanation


My objective for this project was to develop a fully functional Connect 4 game with an intelligent AI opponent, implemented in Python using the Pygame library. The game needed to have a user-friendly interface for local play and a challenging AI opponent using the Minimax algorithm with alpha-beta pruning. The following outlines the steps I took to accomplish this goal, from game creation to AI implementation.


****Game Creation****

**1. Game Logic**
   
I developed the core logic for the Connect 4 game, including creating a 7x6 grid game board.

I managed player turns, allowing two players to alternately drop discs into columns.

I defined win conditions, which included checking for four discs in a row horizontally, vertically, or diagonally.


**2. User Interface**

I created a simple user interface using Pygame, a Python library designed for multimedia applications.

I ensured the interface allowed users to interact with the game, visualize the game board, and see the discs drop into place.

Using Pygame and VSCode, I created a basic, yet functional game of Connect 4 locally.


**3. Designing and Implementing the AI Model**

I decided on using the Minimax algorithm with alpha-beta pruning to power the AI opponent, given the well-defined environment and actions in Connect 4.

I established a scoring system where the AI receives positive feedback for winning moves and negative feedback for losing.

I selected and implemented the Minimax algorithm based on decision trees for the AI.

**Minimax Algorithm (Decision Tree Setup):**

I implemented functions to evaluate the board’s score based on the current state.

I evaluated various potential winning patterns (rows, columns, and diagonals) and assigned scores based on how favorable these patterns are for the AI.

I established the ‘evaluate windows’ function, which scores smaller "windows" or segments of the board, typically four slots wide (the length needed to win). It assigns points based on the number of AI pieces and opponent pieces in these windows.

I implemented the minimax algorithm with alpha-beta pruning, which means to explore all possible moves to a certain depth, simulating the game to determine the best move for the AI by trying to maximize its own score and minimize the opposition's score. The Alpha-beta pruning improved efficiency by cutting off branches in the search tree that could not influence the final decision, significantly reducing the number of nodes evaluated. Finally, I modified the main game loop to use the minimax algorithm for player 2's moves.


****Conclusion****
I made an effort to translate aspects of the script to JavaScript to make the game user-interactive on a web-based platform. However, Pygame does not function in web-based environments, and the game lost significant functionality during the translation. Additionally, hosting the game on third-party services like Render proved cumbersome and did not meet the desired standards. Therefore, I decided to document the entire process and offer the full code for any user to play locally in their environment. This approach ensures that the game retains all its functionality and provides a challenging and enjoyable experience.

The full code is freely available for anyone to use and play with in their local environment, ensuring the integrity and functionality of the original game design.
