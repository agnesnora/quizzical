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

// export async function fetchData() {
//   const res = await fetch(
//     "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
//   );
//   const data = await res.json();
//   console.log(data.results);
//   return data.results;
// }

export async function fetchData() {
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
      {
        category: "Entertainment: Film",
        type: "multiple",
        difficulty: "easy",
        question: "Who directed the movie 'Jurassic Park'?",
        correct_answer: "Steven Spielberg",
        incorrect_answers: [
          "James Cameron",
          "George Lucas",
          "Christopher Nolan",
        ],
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "easy",
        question: "Which ancient civilization built the pyramids?",
        correct_answer: "Egyptians",
        incorrect_answers: ["Mayans", "Greeks", "Romans"],
      },
      {
        category: "Sports",
        type: "multiple",
        difficulty: "easy",
        question: "Which sport uses a shuttlecock?",
        correct_answer: "Badminton",
        incorrect_answers: ["Tennis", "Table Tennis", "Squash"],
      },
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the largest mammal in the world?",
        correct_answer: "Blue Whale",
        incorrect_answers: ["Elephant", "Giraffe", "Hippopotamus"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What programming language does React.js use?",
        correct_answer: "JavaScript",
        incorrect_answers: ["Java", "Python", "C#"],
      },
      {
        category: "Geography",
        type: "multiple",
        difficulty: "easy",
        question: "What is the smallest continent?",
        correct_answer: "Australia",
        incorrect_answers: ["Europe", "Asia", "North America"],
      },
      {
        category: "Entertainment: Music",
        type: "multiple",
        difficulty: "easy",
        question: "Who is known as the 'King of Pop'?",
        correct_answer: "Michael Jackson",
        incorrect_answers: ["Elvis Presley", "Prince", "Madonna"],
      },
      {
        category: "History",
        type: "multiple",
        difficulty: "easy",
        question: "Who wrote the 'Declaration of Independence'?",
        correct_answer: "Thomas Jefferson",
        incorrect_answers: [
          "George Washington",
          "John Adams",
          "Benjamin Franklin",
        ],
      },
      // Add more mock questions here...
    ],
  };

  // Simulate the asynchronous behavior of fetching data.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(mockResponse.results);
      resolve(mockResponse.results);
    }, 1000); // Simulating a delay of 1 second
  });
}
