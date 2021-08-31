import React from "react";
import Category from "../components/Category";
import styles from "../styles/CategoryList.module.css";
import { QuestionCategory } from "../pages/api/triviaAPI";

type Props = {
  chooseCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CategoryList: React.FC<Props> = ({ chooseCategory }) => {
  return (
    <div className="flex">
      <h1 className="heading">Choose a Category</h1>
      <div className={styles.grid}>
      <Category title="Geography" value={QuestionCategory.Geography} callback={chooseCategory} />
      <Category title="History" value={QuestionCategory.History} callback={chooseCategory} />
      <Category title="Animals" value={QuestionCategory.Animals} callback={chooseCategory} />
      <Category title="Books" value={QuestionCategory.Books} callback={chooseCategory} />
      <Category title="Film" value={QuestionCategory.Film} callback={chooseCategory} />
      <Category title="Music" value={QuestionCategory.Music} callback={chooseCategory} />
      </div>
    </div>
  );
};

export default CategoryList;
