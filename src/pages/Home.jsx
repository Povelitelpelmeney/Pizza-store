import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setCategoryId,
  setCurPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, curPage } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzaSlice);
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsloading] = React.useState(true);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurPage(page));
  };
  const getPizzas = async () => {
    setIsloading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : ``;
    dispatch(fetchPizzas({ curPage, category, sort, search }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, curPage]);
  let pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((el) => <PizzaBlock key={el.id} {...el} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <h2>Произошла ошибка</h2>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination
        value={curPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
