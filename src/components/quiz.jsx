import { decode } from "html-entities";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { fetchData, shuffle } from "../utilities";

export default function Quiz(props) {
  const [gameOn, setGameOn] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      try {
        const data = await fetchData();

        setQuizData(
          data.map((item) => ({
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
        );
        console.log(data);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, []);

  return (
    <div className="quiz--container">
      <h3 className="quiz--question">
        {!props.newGame ? decode(props.question) : ""}
      </h3>
      <div className="quiz--answer--container">
        {props.answer.map((answer) => (
          <div
            onClick={(e) => props.selectAnswer(answer.answerId)}
            data-id={answer.answerId}
          >
            <button
              key={answer.answerId}
              type="button"
              className="answer--btn"
              data-id={answer.answerId}
              style={
                props.checkStyle
                  ? answer.isCorrect
                    ? { backgroundColor: "#94D7A2", border: "none" }
                    : !answer.isCorrect && answer.isSelected
                    ? {
                        backgroundColor: "#F8BCBC",
                        border: "none",
                        opacity: "0.5",
                      }
                    : { backgroundColor: "transparent", opacity: "0.5" }
                  : answer.isSelected
                  ? { backgroundColor: "#D6DBF5", border: "none" }
                  : { backgroundColor: "transparent" }
              }
            >
              {decode(answer.answer)}
            </button>
          </div>
        ))}
      </div>
      <hr></hr>
    </div>
  );
}
