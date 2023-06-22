import { decode } from "html-entities";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export default function Quiz(props) {
  // const correctStyle = {
  //   backgroundColor: "#94D7A2",
  // };

  // const incorrectStyle = {
  //   backgroundColor: "#F8BCBC",
  // };

  // const correctAnswer = props.selected.map((item) =>
  //   item.allAnswers.map((answer) => answer.isCorrect)
  // );

  // const incorrectAnswer = props.selected.map((item) =>
  //   item.allAnswers.map((answer) => !answer.isCorrect)
  // );

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
