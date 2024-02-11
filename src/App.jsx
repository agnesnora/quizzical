import { useState, useEffect } from "react";

import "../src/styles/app/app.css";
import { decode } from "html-entities";
import Quiz from "../src/components/quiz";
import Footer from "../src/components/footer";
import Intro from "../src/components/intro";
import { nanoid } from "nanoid";
import { mockResponse } from "./utilities";
import { shuffle } from "./utilities";
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
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      setData(
        mockResponse.results.map((item) => ({
          ...item,
          allAnswers: shuffle(
            [...item.incorrect_answers, item.correct_answer].map((answer) => ({
              answer: answer,
              answerId: nanoid(),
              isSelected: false,
              isCorrect: false,
              correctAnswer: item.correct_answer,
              score: 0,
            }))
          ),
          questionId: nanoid(),
        }))
      );
    }
  }, [error]);
  useEffect(() => {
    if (gameOn) {
      setSelected([]);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        fetchQuizData();
      }, 2000);
    }
  }, [gameIsOn]);

  async function fetchQuizData() {
    try {
      // if (Math.random() < 0.5) {
      //   throw new Error("Simulated error: Invalid API endpoint");
      // }

      const data = await fetchData(); // Use await here

      setData(
        data.map((item) => ({
          ...item,
          allAnswers: shuffle(
            [...item.incorrect_answers, item.correct_answer].map((answer) => ({
              answer: answer,
              answerId: nanoid(),
              isSelected: false,
              isCorrect: false,
              correctAnswer: item.correct_answer,
              score: 0,
            }))
          ),
          questionId: nanoid(),
        }))
      );
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

    checkedArray.length === 8 ? setAllChecked(true) : setAllChecked(false);
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

  function selectAnswer(questionId, answerId) {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.questionId === questionId) {
          return {
            ...item,
            allAnswers: item.allAnswers.map((answer) => {
              return {
                ...answer,
                isSelected: answer.answerId === answerId,
              };
            }),
          };
        } else {
          return item;
        }
      });
    });
  }

  const quizComponent = data.map((item) => {
    return (
      <Quiz
        key={item.answerId}
        question={item.question}
        answer={item.allAnswers}
        selectAnswer={(answerId) => selectAnswer(item.questionId, answerId)}
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
        <h1 className="logo">Quizzical</h1>
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
          ) : gameOn && error ? (
            <div>
              <h3 className="error-message">
                We apologize for the inconvenience, but there seems to be an
                issue with the API. However, we have prepared mock data for you
                to experience our game.
              </h3>
              {quizComponent}
            </div>
          ) : (
            gameOn && !error && quizComponent
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
