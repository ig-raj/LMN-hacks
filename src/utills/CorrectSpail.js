import leven from 'leven';

// Function to find the closest word using Levenshtein distance
const correctSpelling = (input, wordList) => {
  let closestMatch = wordList[0];
  let smallestDistance = leven(input, closestMatch);

  wordList.forEach((word) => {
    const distance = leven(input, word);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestMatch = word;
    }
  });

  return closestMatch; // Return the word with the smallest Levenshtein distance
};

// Example usage
const inputWord = "qustion";  // Misspelled word
const commonWords = ["question", "answer", "problem", "query"];  // List of correct words

const correctedWord = correctSpelling(inputWord, commonWords);
console.log(correctedWord);  // Outputs: "question"
