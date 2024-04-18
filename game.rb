require 'securerandom'

class Game
  def initialize(moves)
    @moves = moves
    @secret_key = SecureRandom.random_bytes(32) # Generate a 256-bit secret key
  end

  def start
    computer_move_index = rand(@moves.length)
    computer_move = @moves[computer_move_index]

    hmac = calculate_hmac(computer_move)

    puts "HMAC: #{hmac}\n"
    display_menu

    print "Enter your move: "
    user_input = gets.chomp

    if user_input == "?"
      display_help_table
      start
      return
    end

    parsed_choice = user_input.to_i
    if parsed_choice.to_s != user_input || parsed_choice < 0 || parsed_choice > @moves.length
      puts 'Invalid input. Please enter a valid move number or "?" for help.'
      start
      return
    end

    if parsed_choice == 0
      puts "Exiting the game."
      return
    end

    user_move = @moves[parsed_choice - 1]
    puts "Your move: #{user_move}"
    puts "Computer move: #{computer_move}"
    result = evaluate_result(user_move, computer_move)
    puts result
    puts "HMAC key: #{@secret_key.unpack('H*').first}"
  end

  private

  def display_menu
    puts "Available moves:"
    @moves.each_with_index { |move, index| puts "#{index + 1} - #{move}" }
    puts "0 - exit"
    puts "? - help"
    puts '\nEnter your move or "?" for help:'
  end

  def display_help_table
    puts "\nResults from the user's point of view:"
    # Prepare header row with emphasized style
    header_row = "+--------------+#{'--------+'.repeat(@moves.length)}"
    header_row_with_emphasis = "\e[1m#{header_row}\e[0m"

    puts header_row_with_emphasis
    # Prepare header with PC vs. User
    header = "| v PC\\User >  |"
    @moves.each { |move| header += " #{move.ljust(6)} |" }
    puts header
    puts header_row_with_emphasis
    # Render the table body
    @moves.each do |move1|
      row = "| #{move1.ljust(12)} |"
      @moves.each do |move2|
        row += " #{evaluate_result(move1, move2).ljust(7)}|"
      end
      puts row
      puts header_row_with_emphasis
    end
  end

  def calculate_hmac(message)
    hmac = OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret_key, message)
    hmac.unpack('H*').first
  end

  def evaluate_result(user_move, computer_move)
    user_index = @moves.index(user_move)
    computer_index = @moves.index(computer_move)
    number_of_moves = @moves.length

    # Calculate the winning moves for the user
    winning_moves = []
    (1..number_of_moves / 2).each do |i|
      winning_moves.push((user_index + i) % number_of_moves)
    end

    return "Draw" if user_index == computer_index
    return "Win" if winning_moves.include?(computer_index)
    return "Lose"
  end
end

# Extract moves from command-line arguments, skipping the first two arguments (ruby executable and script filename)
moves = ARGV
if moves.length < 3 || moves.length.even?
  puts "Invalid number of moves. Please provide an odd number of moves greater than 2."
else
  game = Game.new(moves)
  game.start
end
