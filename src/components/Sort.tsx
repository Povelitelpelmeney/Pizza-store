import React from "react";
import { setSort, Sort } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../hooks";

type elementType = { name: string; sortProperty: "rating" | "title" | "price" };
type listType = Array<elementType>;
type SortProps = {
  value: Sort;
};

const SortPopup: React.FC<SortProps> = React.memo(({ value }) => {
  const list: listType = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "title" },
  ];
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const onClickListItem = (i: elementType) => {
    dispatch(setSort(i));
    setIsVisible(!isVisible);
  };
  React.useEffect(() => {
    const handleCLick = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", handleCLick);
    return () => {
      document.body.removeEventListener("click", handleCLick);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, pos) => {
              return (
                <li
                  key={pos}
                  onClick={() => onClickListItem(obj)}
                  className={
                    value.sortProperty === obj.sortProperty ? "active" : ""
                  }
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
export default SortPopup;
