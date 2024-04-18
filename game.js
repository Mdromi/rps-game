const crypto = require("crypto");
const readline = require("readline");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.secretKey = crypto.randomBytes(32); // Generate a 256-bit secret key
    this.interface = readline.createInterface(process.stdin, process.stdout);
  }

  start() {
    const computerMoveIndex = Math.floor(Math.random() * this.moves.length);
    const computerMove = this.moves[computerMoveIndex];

    const hmac = this.calculateHMAC(computerMove);

    console.log(`HMAC: ${hmac}\n`);
    this.displayMenu();

    this.interface.question("Enter your move: ", (userInput) => {
      const userChoice = userInput.trim();
      if (userChoice === "?") {
        this.displayHelpTable();
        this.start();
        return;
      }

      const parsedChoice = parseInt(userChoice);
      if (
        isNaN(parsedChoice) ||
        parsedChoice < 0 ||
        parsedChoice > this.moves.length
      ) {
        console.log(
          'Invalid input. Please enter a valid move number or "?" for help.'
        );
        this.start();
        return;
      }

      if (parsedChoice === 0) {
        console.log("Exiting the game.");
        this.interface.close();
        return;
      }

      const userMove = this.moves[parsedChoice - 1];
      console.log(`Your move: ${userMove}`);
      console.log(`Computer move: ${computerMove}`);
      const result = this.evaluateResult(userMove, computerMove);
      console.log(result);
      console.log(`HMAC key: ${this.secretKey.toString("hex")}`);
      this.interface.close();
    });
  }

  displayMenu() {
    console.log("Available moves:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
    console.log('\nEnter your move or "?" for help:');
  }

  displayHelpTable() {
    console.log("\nResults from the user's point of view:");
    // Prepare header row with emphasized style
    const headerRow = `+--------------+${"--------+".repeat(
      this.moves.length
    )}`;
    let headerRowWithEmphasis = "\x1b[1m" + headerRow + "\x1b[0m";

    console.log(headerRowWithEmphasis);
    // Prepare header with PC vs. User
    let header = "| v PC\\User >  |";
    this.moves.forEach((move) => {
      header += ` ${move.padEnd(6)} |`;
    });
    console.log(header);
    console.log(headerRowWithEmphasis);
    // Render the table body
    for (let i = 0; i < this.moves.length; i++) {
      let row = `| ${this.moves[i].padEnd(12)} |`;
      for (let j = 0; j < this.moves.length; j++) {
        row += ` ${this.evaluateResult(this.moves[i], this.moves[j]).padEnd(
          7
        )}|`;
      }
      console.log(row);
      console.log(headerRowWithEmphasis);
    }
  }

  calculateHMAC(message) {
    const hmac = crypto.createHmac("sha256", this.secretKey);
    hmac.update(message);
    return hmac.digest("hex");
  }

  evaluateResult(userMove, computerMove) {
    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);
    const numberOfMoves = this.moves.length;

    // Calculate the winning moves for the user
    const winningMoves = [];
    for (let i = 1; i <= Math.floor(numberOfMoves / 2); i++) {
        winningMoves.push((userIndex + i) % numberOfMoves);
    }

    if (userIndex === computerIndex) {
        return "Draw";
    } else if (winningMoves.includes(computerIndex)) {
        return "Win";
    } else {
        return "Lose";
    }
}

}

// Extract moves from command-line arguments, skipping the first two arguments (node executable and script filename)
const moves = process.argv.slice(2);
if (moves.length < 3 || moves.length % 2 === 0) {
  console.log(
    "Invalid number of moves. Please provide an odd number of moves greater than 2."
  );
} else {
  const game = new Game(moves);
  game.start();
}
