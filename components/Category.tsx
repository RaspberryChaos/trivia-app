import React from 'react';
import { QuestionCategory } from "../pages/api/triviaAPI";

type CategoryProps = {
    title: string,
    callback: any,
    value: QuestionCategory,
  };

const Category: React.FC<CategoryProps> = ({title, value, callback}) => {
    return (
        <div>
            <button onClick={callback} value={value} className="choice category">{title}</button>
        </div>
        )
};

export default Category;
