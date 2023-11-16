export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export async function fetchData() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=8&difficulty=easy&type=multiple"
  );
  const data = await res.json();
  console.log(data.results);
  return data.results;
}

const mockResponse = {
  response_code: 0,
  results: [
    {
      category: "Science",
      type: "multiple",
      difficulty: "easy",
      question: "What is the chemical symbol for the element oxygen?",
      correct_answer: "O2",
      incorrect_answers: ["O", "O3", "O4"],
    },
    {
      category: "Geography",
      type: "multiple",
      difficulty: "easy",
      question: "Which country is known as the Land of the Rising Sun?",
      correct_answer: "Japan",
      incorrect_answers: ["China", "Korea", "Vietnam"],
    },
    {
      category: "History",
      type: "multiple",
      difficulty: "easy",
      question: "Who was the first President of the United States?",
      correct_answer: "George Washington",
      incorrect_answers: ["John Adams", "Thomas Jefferson", "James Madison"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "easy",
      question: "Which Beatles album features the song 'Hey Jude'?",
      correct_answer: "The Beatles (White Album)",
      incorrect_answers: ["Abbey Road", "Sgt. Pepper's", "Let It Be"],
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "In what year did the first modern Olympic Games take place?",
      correct_answer: "1896",
      incorrect_answers: ["1900", "1920", "1956"],
    },
    {
      category: "General Knowledge",
      type: "multiple",
      difficulty: "easy",
      question: "What is the capital city of Australia?",
      correct_answer: "Canberra",
      incorrect_answers: ["Sydney", "Melbourne", "Brisbane"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Computer Personal Unit",
        "Central Process Unit",
        "Central Peripheral Unit",
      ],
    },
    {
      category: "Geography",
      type: "multiple",
      difficulty: "easy",
      question: "Which river is the longest in the world?",
      correct_answer: "Nile",
      incorrect_answers: ["Amazon", "Yangtze", "Mississippi"],
    },

    // Add more mock questions here...
  ],
};
export { mockResponse };
