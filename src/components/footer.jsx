import Confetti from "react-confetti";
import "../styles/footer/footer.css";
export default function Footer(props) {
  const checkAnswerArray = props.selected.map((item) => ({
    ...item,
    allAnswers: item.allAnswers.filter((answer) => answer.score == 1),
  }));

  const scoredAnswerArray = checkAnswerArray.filter(
    (item) => item.allAnswers.length > 0
  );

  return props.allChecked && !props.checkStyle ? (
    <div className="footer footer--background">
      <button
        data-check="check"
        onClick={props.showCorrectAnswers}
        className="check--btn"
      >
        Check
      </button>
    </div>
  ) : props.checkStyle ? (
    <div className="playAgain--container footer footer--background">
      <h3>
        You scored {scoredAnswerArray.length}/{props.selected.length} correct
        answers
      </h3>
      <button data-play="play" onClick={props.playAgain}>
        Play again
      </button>
      {scoredAnswerArray.length >= 4 ? (
        <Confetti width={2000} height={1800} numberOfPieces={500} />
      ) : null}
    </div>
  ) : (
    <div className="footer footer--background"></div>
  );
}
