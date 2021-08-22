import React from 'react';

type CategoryProps = {
    title: string,
    callback: any,
    categoryNum: number,
  };

const Category: React.FC<CategoryProps> = ({title, callback, categoryNum}) => {
    return (
        <div>
            <button onClick={callback} value={categoryNum} className="choice category">{title}</button>
        </div>
        )
};

export default Category;
