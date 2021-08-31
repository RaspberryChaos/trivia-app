import React from "react";
import { Difficulty } from "../pages/api/triviaAPI";
import styles from "../styles/DifficultyList.module.css";

type Props = {
  chooseDifficulty: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DifficultyList: React.FC<Props> = ({ chooseDifficulty }) => {
  return (
    <div className="flex">
      <h1 className="heading">Choose a Difficulty</h1>
      <div className={styles.options}>
      <button onClick={chooseDifficulty} value={Difficulty.Easy} className="choice difficulty">Easy</button>
      <button onClick={chooseDifficulty} value={Difficulty.Medium} className="choice difficulty">Medium</button>
      <button onClick={chooseDifficulty} value={Difficulty.Hard} className="choice difficulty">Hard</button>
      </div>
    </div>
  );
};

export default DifficultyList;