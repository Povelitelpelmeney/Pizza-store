import React from "react";

type CategoriesProps = { value: number; onClickCategory: (i: number) => void };

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    const categories = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((category, pos) => {
            return (
              <li
                key={pos}
                onClick={() => onClickCategory(pos)}
                className={value === pos ? "active" : ""}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
