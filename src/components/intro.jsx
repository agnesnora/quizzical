import { useState } from "react";

export default function Intro(props) {
  const [difficulty, setDifficulty] = useState("easy");
  console.log(difficulty);
  function handleChange(event) {
    event.preventDefault();
    setDifficulty(event.target.value);
  }
  return (
    <div className="start--page">
      <h3>Fun game by Open Trivia Database</h3>
      {/* <div className="select--difficulty">
        <label className="label--select" htmlFor="difficulty">
          Set difficulty
        </label>
        <select
          id="difficulty"
          onChange={handleChange}
          name="difficulty"
          value={difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="medium">Hard</option>
        </select>
      </div> */}
      <div className="start--btn">
        <button onClick={props.startgame}> Start quiz</button>
      </div>

      {/* {!props.loading ? (
<div></div>
) : (
<div className="spinner">
<p>Loading</p>
</div>
)} */}
    </div>
  );
}
