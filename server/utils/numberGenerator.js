export class NumberGenerator {
    constructor() {
        this.availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    }

    generateNumber() {
        if (this.availableNumbers.length === 0) {
            throw new Error("No more numbers available to draw");
        }

        const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
        const number = this.availableNumbers[randomIndex];

        // Remove the drawn number from the available numbers
        this.availableNumbers.splice(randomIndex, 1);

        return number;
    }

    reset() {
        this.availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    }
}

export default NumberGenerator;
