import numpy as np
import pygame
import sys
import math
import random

# Initialize Pygame
pygame.init()

player1_wins = 0
player2_wins = 0

# Define colors
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)
WHITE = (255, 255, 255)

# Define game parameters
ROW_COUNT = 6
COLUMN_COUNT = 7
SQUARESIZE = 100
RADIUS = int(SQUARESIZE / 2 - 5)

# Calculate width and height of the game board
width = COLUMN_COUNT * SQUARESIZE
height = (ROW_COUNT + 2) * SQUARESIZE  # Extra row for player input and score

size = (width, height)

# Create the game window
screen = pygame.display.set_mode(size)
pygame.display.set_caption("Connect 4")

# Initialize the game board
board = np.zeros((ROW_COUNT, COLUMN_COUNT))

def draw_board(board):
    for c in range(COLUMN_COUNT):
        for r in range(ROW_COUNT):
            pygame.draw.rect(screen, BLUE, (c * SQUARESIZE, r * SQUARESIZE + SQUARESIZE, SQUARESIZE, SQUARESIZE))
            pygame.draw.circle(screen, BLACK, (int(c * SQUARESIZE + SQUARESIZE / 2), int(r * SQUARESIZE + SQUARESIZE + SQUARESIZE / 2)), RADIUS)
    
    for c in range(COLUMN_COUNT):
        for r in range(ROW_COUNT):
            if board[r][c] == 1:
                pygame.draw.circle(screen, RED, (int(c * SQUARESIZE + SQUARESIZE / 2), height - int((r + 1) * SQUARESIZE + SQUARESIZE / 2)), RADIUS)
            elif board[r][c] == 2:
                pygame.draw.circle(screen, YELLOW, (int(c * SQUARESIZE + SQUARESIZE / 2), height - int((r + 1) * SQUARESIZE + SQUARESIZE / 2)), RADIUS)
    draw_scores()
    pygame.display.update()

def draw_scores():
    font = pygame.font.SysFont("monospace", 30)
    win_text_p1 = font.render(f"Player 1 Wins: {player1_wins}", True, RED)
    win_text_p2 = font.render(f"Player 2 Wins: {player2_wins}", True, YELLOW)
    screen.blit(win_text_p1, (10, 10))
    screen.blit(win_text_p2, (10, 50))

def draw_replay_button():
    font = pygame.font.SysFont("monospace", 30)
    replay_text = font.render("Replay", True, BLACK)
    text_width, text_height = font.size("Replay")
    button_width = text_width + 20  # Add some padding
    button_height = text_height + 10  # Add some padding
    button_rect = pygame.Rect((width // 2 - button_width // 2, height // 2 - button_height // 2), (button_width, button_height))
    pygame.draw.rect(screen, WHITE, button_rect)
    screen.blit(replay_text, (width // 2 - text_width // 2, height // 2 - text_height // 2))
    return button_rect

def is_valid_location(board, col):
    return board[ROW_COUNT - 1][col] == 0

def get_next_open_row(board, col):
    for r in range(ROW_COUNT):
        if board[r][col] == 0:
            return r

def drop_piece(board, row, col, piece):
    board[row][col] = piece

def winning_move(board, piece):
    # Check horizontal locations for win
    for c in range(COLUMN_COUNT - 3):
        for r in range(ROW_COUNT):
            if board[r][c] == piece and board[r][c + 1] == piece and board[r][c + 2] == piece and board[r][c + 3] == piece:
                return True

    # Check vertical locations for win
    for c in range(COLUMN_COUNT):
        for r in range(ROW_COUNT - 3):
            if board[r][c] == piece and board[r + 1][c] == piece and board[r + 2][c] == piece and board[r + 3][c] == piece:
                return True

    # Check positively sloped diagonals
    for c in range(COLUMN_COUNT - 3):
        for r in range(ROW_COUNT - 3):
            if board[r][c] == piece and board[r + 1][c + 1] == piece and board[r + 2][c + 2] == piece and board[r + 3][c + 3] == piece:
                return True

    # Check negatively sloped diagonals
    for c in range(COLUMN_COUNT - 3):
        for r in range(3, ROW_COUNT):
            if board[r][c] == piece and board[r - 1][c + 1] == piece and board[r - 2][c + 2] == piece and board[r - 3][c + 3] == piece:
                return True

# Bouncing animation function
def drop_piece_animation(board, col, piece):
    row = get_next_open_row(board, col)
    x = int(col * SQUARESIZE + SQUARESIZE / 2)
    y = int(SQUARESIZE / 2)
    velocity = 1

    while y < height - (row + 1) * SQUARESIZE - SQUARESIZE / 2:
        y += velocity
        velocity += 1
        screen.fill(BLACK)
        draw_board(board)
        pygame.draw.circle(screen, RED if piece == 1 else YELLOW, (x, y), RADIUS)
        pygame.display.update()
        pygame.time.wait(10)

    # Simulate a bounce effect
    for _ in range(2):
        for bounce_height in range(10, 0, -2):
            y -= bounce_height
            screen.fill(BLACK)
            draw_board(board)
            pygame.draw.circle(screen, RED if piece == 1 else YELLOW, (x, y), RADIUS)
            pygame.display.update()
            pygame.time.wait(30)
        for bounce_height in range(0, 10, 2):
            y += bounce_height
            screen.fill(BLACK)
            draw_board(board)
            pygame.draw.circle(screen, RED if piece == 1 else YELLOW, (x, y), RADIUS)
            pygame.display.update()
            pygame.time.wait(30)

    drop_piece(board, row, col, piece)
    draw_board(board)

def reset_board():
    global board
    board = np.zeros((ROW_COUNT, COLUMN_COUNT))
    draw_board(board)

def check_replay_button_click(pos, button_rect):
    if button_rect and button_rect.collidepoint(pos):
        return True
    return False

def score_position(board, piece):
    score = 0
    # Score center column
    center_array = [int(i) for i in list(board[:, COLUMN_COUNT//2])]
    center_count = center_array.count(piece)
    score += center_count * 3

    # Score Horizontal
    for r in range(ROW_COUNT):
        row_array = [int(i) for i in list(board[r,:])]
        for c in range(COLUMN_COUNT-3):
            window = row_array[c:c+4]
            score += evaluate_window(window, piece)

    # Score Vertical
    for c in range(COLUMN_COUNT):
        col_array = [int(i) for i in list(board[:,c])]
        for r in range(ROW_COUNT-3):
            window = col_array[r:r+4]
            score += evaluate_window(window, piece)

    # Score posiive sloped diagonal
    for r in range(ROW_COUNT-3):
        for c in range(COLUMN_COUNT-3):
            window = [board[r+i][c+i] for i in range(4)]
            score += evaluate_window(window, piece)

    # Score negative sloped diagonal
    for r in range(ROW_COUNT-3):
        for c in range(COLUMN_COUNT-3):
            window = [board[r+3-i][c+i] for i in range(4)]
            score += evaluate_window(window, piece)

    return score

def evaluate_window(window, piece):
    score = 0
    opp_piece = 1 if piece == 2 else 2

    if window.count(piece) == 4:
        score += 100
    elif window.count(piece) == 3 and window.count(0) == 1:
        score += 5
    elif window.count(piece) == 2 and window.count(0) == 2:
        score += 2

    if window.count(opp_piece) == 3 and window.count(0) == 1:
        score -= 4

    return score

def get_valid_locations(board):
    valid_locations = []
    for col in range(COLUMN_COUNT):
        if is_valid_location(board, col):
            valid_locations.append(col)
    return valid_locations


def is_terminal_node(board):
    return winning_move(board, 1) or winning_move(board, 2) or len(get_valid_locations(board)) == 0

def minimax(board, depth, alpha, beta, maximizingPlayer):
    valid_locations = get_valid_locations(board)
    is_terminal = is_terminal_node(board)

    if depth == 0 or is_terminal:
        if is_terminal:
            if winning_move(board, 2):
                return (None, 100000000000000)
            elif winning_move(board, 1):
                return (None, -10000000000000)
            else:  # No more valid moves
                return (None, 0)
        else:  # Depth is zero
            return (None, score_position(board, 2))

    if maximizingPlayer:
        value = -math.inf
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = get_next_open_row(board, col)
            b_copy = board.copy()
            drop_piece(b_copy, row, col, 2)
            new_score = minimax(b_copy, depth-1, alpha, beta, False)[1]
            if new_score > value:
                value = new_score
                column = col
            alpha = max(alpha, value)
            if alpha >= beta:
                break
        return column, value

    else:  # Minimizing player
        value = math.inf
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = get_next_open_row(board, col)
            b_copy = board.copy()
            drop_piece(b_copy, row, col, 1)
            new_score = minimax(b_copy, depth-1, alpha, beta, True)[1]
            if new_score < value:
                value = new_score
                column = col
            beta = min(beta, value)
            if alpha >= beta:
                break
        return column, value


# Main game loop
def main():
    global player1_wins, player2_wins
    game_over = False
    turn = 0
    replay_button_rect = None

    draw_board(board)
    pygame.display.update()

    while True:  # Keep the game running until the user quits
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()

            if event.type == pygame.MOUSEMOTION:
                pygame.draw.rect(screen, BLACK, (0, 0, width, SQUARESIZE))
                posx = event.pos[0]
                if turn == 0:
                    pygame.draw.circle(screen, RED, (posx, int(SQUARESIZE / 2)), RADIUS)
                else:
                    pygame.draw.circle(screen, YELLOW, (posx, int(SQUARESIZE / 2)), RADIUS)
                draw_scores()
            pygame.display.update()

            if event.type == pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()

                if check_replay_button_click(pos, replay_button_rect):
                    reset_board()
                    game_over = False
                    turn = 0
                    replay_button_rect = None
                    draw_board(board)
                    continue

                pygame.draw.rect(screen, BLACK, (0, 0, width, SQUARESIZE))
                # Ask for Player 1 Input
                if turn == 0:
                    posx = event.pos[0]
                    col = int(math.floor(posx / SQUARESIZE))

                    if is_valid_location(board, col):
                        drop_piece_animation(board, col, 1)
                        if winning_move(board, 1):
                            print("Player 1 wins!!")
                            player1_wins += 1
                            game_over = True

                        turn += 1
                        turn = turn % 2

        if turn == 1 and not game_over:
            pygame.time.wait(1000)  # Wait for 1 second before AI makes its move
            col, minimax_score = minimax(board, 4, -math.inf, math.inf, True)
            if is_valid_location(board, col):
                drop_piece_animation(board, col, 2)
                if winning_move(board, 2):
                    print("Player 2 wins!!")
                    player2_wins += 1
                    game_over = True

                turn += 1
                turn = turn % 2
        
        if not game_over and is_terminal_node(board):
            print("The game is a draw!")
            game_over = True
        if game_over:
            draw_scores()
            replay_button_rect = draw_replay_button()
            pygame.display.update()
            pygame.time.wait(3000)

if __name__ == "__main__":
    main()
    
