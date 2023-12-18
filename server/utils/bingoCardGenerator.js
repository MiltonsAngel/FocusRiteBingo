// Shuffle Algorithm: ShuffleArray function to efficiently randomize the numbers within a specified range.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generates a column of numbers with specified range and count
function generateColumn(min, max, count = 5) {
    if (max - min < count - 1) {
        throw new Error("Range too small for the count");
    }

    const range = [];
    for (let i = min; i <= max; i++) {
        range.push(i);
    }

    shuffleArray(range);
    return range.slice(0, count);
}

// Generates a Bingo card
function generateBingoCard() {
    try {
        const card = {
            B: generateColumn(1, 15, 5),
            I: generateColumn(16, 30, 5),
            N: generateColumn(31, 45, 5),
            G: generateColumn(46, 60, 5),
            O: generateColumn(61, 75, 5)
        };

        // Generate a random column key from the card
        const columns = Object.keys(card);
        const randomColumnKey = columns[Math.floor(Math.random() * columns.length)];

        // Generate a random index for the 'FREE' space in the selected column
        const freeSpaceIndex = Math.floor(Math.random() * 5); // 5 because there are initially 5 numbers in each column

        // Add a free space at a random location in the selected column
        card[randomColumnKey].splice(freeSpaceIndex, 0, 'FREE');

        // Adjust the length of the selected column to maintain 5 cells
        card[randomColumnKey].pop();

        return card;
    } catch (error) {
        console.error('Error generating Bingo card:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export { generateBingoCard };
