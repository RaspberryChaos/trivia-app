import React from "react";
import Category from "../components/Category";

type Props = {
  chooseCategory: any;
};

const CategoryList: React.FC<Props> = ({ chooseCategory }) => {
  return (
    <div>
      <h1>Choose a Category</h1>
      <Category title="Geography" categoryNum={22} callback={chooseCategory} />
      <Category title="History" categoryNum={23} callback={chooseCategory} />
      <Category title="Animals" categoryNum={27} callback={chooseCategory} />
      <Category title="Books" categoryNum={10} callback={chooseCategory} />
      <Category title="Film" categoryNum={11} callback={chooseCategory} />
      <Category title="Music" categoryNum={12} callback={chooseCategory} />
    </div>
  );
};

export default CategoryList;
