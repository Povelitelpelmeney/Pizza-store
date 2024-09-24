import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const typeNames = ["тонкое", "традиционное"];
  const typeSizes = ["26 см", "30 см", "40 см"];
  const dispatch = useDispatch();
  const count = useSelector((state) =>
    state.cartSlice.items.reduce((summ, el) => {
      if (el.id == id) {
        summ += el.count;
      }
      return summ;
    }, 0)
  );
  const addedCount = count ? count : 0;
  const onCLickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: typeSizes[activeSize],
      count,
    };
    dispatch(addItem(item));
  };
  return (
    <div className="pizza-block-wrappper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el) => {
              return (
                <li
                  key={el}
                  onClick={() => setActiveType(el)}
                  className={activeType === el ? "active" : ""}
                >
                  {typeNames[el]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((el, pos) => {
              return (
                <li
                  key={el}
                  onClick={() => setActiveSize(pos)}
                  className={activeSize === pos ? "active" : ""}
                >
                  {el + " см"}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} ₽</div>
          <button
            onClick={onCLickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{addedCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PizzaBlock;
