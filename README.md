# Rock-Paper-Scissors-Lizard-Spock Game

This is a Ruby implementation of the popular Rock-Paper-Scissors-Lizard-Spock game, as seen on the TV show "The Big Bang Theory". It allows you to play the game against the computer and displays the outcome.

## Rules of the Game

The game is an extension of the classic Rock-Paper-Scissors game, adding two more possible moves: Lizard and Spock. The rules are as follows:

- Rock crushes Scissors
- Scissors cuts Paper
- Paper covers Rock
- Rock crushes Lizard
- Lizard poisons Spock
- Spock smashes Scissors
- Scissors decapitates Lizard
- Lizard eats Paper
- Paper disproves Spock
- Spock vaporizes Rock

## Usage

To play the game, run the following command in your terminal:

```bash
node game.js Rock Paper Scissors Spock  Lizard
```
or,
```bash
ruby game.rb Rock Paper Scissors Spock  Lizard
```

## Results Tables
### Rock-Paper-Scissors Outcomes Table
| PC\User >| Rock | Paper | Scissors |
|----------|------|-------|----------|
| Rock | Draw | Win   | Lose     |
| Paper| Lose | Draw  | Win      |
| Scissors | Win | Lose | Draw |

### Rock-Paper-Scissors-Lizard-Spock Outcomes Table
| PC\User >| Rock | Paper | Scissors | Lizard  | Spock  |
|----------|------|-------|----------|------|------|
| Rock | Draw | Win   | Win      | Lose | Lose |
| Paper | Lose | Draw  | Win      | Win  | Lose |
| Scissors | Lose | Lose  | Draw | Win  | Win  |
| Lizard | Win  | Lose  | Lose     | Draw | Win  |
| Spock | Win  | Win   | Lose     | Lose | Draw |


### Custom Table with 7 Moves
| PC\User >| Rock | Paper | 3rd move | 4th  | 5th  | 6th  | 7th  |
|----------|------|-------|----------|------|------|------|------|
| Rock | Draw | Win   | Win      | Win  | Lose | Lose | Lose |
| Paper| Lose | Draw  | Win      | Win  | Win  | Lose | Lose |
| 3rd move | Lose | Lose  | Draw | Win  | Win  | Win  | Lose |
| 4th  | Lose  | Lose  | Lose     | Draw | Win  | Win  | Win  |
| 5th  | Win  | Lose   | Lose     | Lose | Draw | Win  | Win  |
| 6th  | Win  | Win   | Lose     | Lose | Lose | Draw | Win  |
| 7th  | Win  | Win   | Win      | Lose | Lose | Lose | Draw |
