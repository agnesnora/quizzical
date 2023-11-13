import { useState, useEffect } from "react";

import "./App.css";
import { decode } from "html-entities";
import Quiz from "../src/components/quiz";
import Footer from "../src/components/footer";
import Intro from "../src/components/intro";
import { nanoid } from "nanoid";

import { fetchData } from "./utilities";

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [data, setData] = useState([]);

  const [selected, setSelected] = useState([]);
  const [checkStyle, setCheckStyle] = useState(false);

  const [allChecked, setAllChecked] = useState(false);
  const [correctAnswersArray, setCorrectAnswersArray] = useState([]);

  const [difficulty, setDifficulty] = useState("easy");
  const gameIsOn = gameOn ? true : false;
  const [loading, setLoading] = useState(false);
  const [markedAnswer, setMarkedAnswer] = useState(false);

  useEffect(() => {
    if (gameOn) {
      setSelected([]);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        fetchQuizData(); // Rename the function to avoid naming conflict
      }, 2000);
    }
  }, [gameIsOn]);

  function fetchQuizData() {
    // Rename this function
    fetch(
      `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results.map((item) => ({
            ...item,
            allAnswers: shuffle(
              [...item.incorrect_answers, item.correct_answer].map(
                (answer) => ({
                  answer: answer,
                  answerId: nanoid(),
                  isSelected: false,
                  isCorrect: false,
                  correctAnswer: item.correct_answer,
                  score: 0,
                })
              )
            ),
            questionId: nanoid(),
          }))
        )
      );
  }

  useEffect(() => {
    const selectedAnswersArray = selected.map((item) => item.allAnswers);
    setCorrectAnswersArray(
      selectedAnswersArray.filter(
        (answer) => answer.answer == answer.correctAnswer
      )
    );
  }, [selected]);

  useEffect(() => {
    setSelected(
      data.map((item) => ({
        allAnswers: item.allAnswers.filter((answer) => answer.isSelected),
      }))
    );
  }, [data]);

  function shuffle(array) {
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

  function startGame() {
    setGameOn(true);
  }

  function playAgain() {
    setData([]);
    setCorrectAnswersArray([]);
    setCheckStyle(false);
    setAllChecked(false);
    setGameOn(false);
  }

  useEffect(() => {
    const checkedArray = selected.filter((item) => item.allAnswers.length > 0);

    checkedArray.length === 5 ? setAllChecked(true) : setAllChecked(false);
  }, [selected]);

  function showCorrectAnswers(e) {
    setData((prevData) => {
      return prevData.map((item) => ({
        ...item,
        allAnswers: item.allAnswers.map((answer) => {
          return answer.answer == item.correct_answer
            ? { ...answer, isCorrect: true, score: 1 }
            : { ...answer };
        }),
      }));
    });
    if (e.target.dataset.check) {
      setCheckStyle(true);
    }
  }

  function selectAnswer(id) {
    setData((prevData) => {
      return prevData.map((item) => ({
        ...item,
        allAnswers: item.allAnswers.map((answer) => {
          return answer.answerId === id
            ? { ...answer, isSelected: !answer.isSelected }
            : { ...answer };
        }),
      }));
    });
  }

  const quizComponent = data.map((item) => {
    return (
      <Quiz
        key={item.answerId}
        question={item.question}
        answer={item.allAnswers}
        selectAnswer={selectAnswer}
        correctAnswer={item.correct_answer}
        allChecked={allChecked}
        selected={selected}
        checkStyle={checkStyle}
      />
    );
  });

  return (
    <>
      <div className="container">
        {!gameOn && (
          <Intro
            startgame={startGame}
            gameOn={gameOn}
            difficulty={difficulty}
            loading={loading}
          />
        )}

        <>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            gameOn && quizComponent
          )}
        </>

        <Footer
          allChecked={allChecked}
          showCorrectAnswers={showCorrectAnswers}
          checkStyle={checkStyle}
          playAgain={playAgain}
          gameOn={gameOn}
          selected={selected}
          data={data}
          correctAnswersArray={correctAnswersArray}
        />
      </div>
    </>
  );
}

export default App;
