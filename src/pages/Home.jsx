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
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, curPage, searchValue } = useSelector(
    (state) => state.filterSlice
  );
  const { items, status } = useSelector((state) => state.pizzaSlice);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurPage(page));
  };
  const getPizzas = async () => {
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
    // .map((el) => (
    //   <Link key={el.id} to={`/pizza/${el.id}`}>
    //     <PizzaBlock {...el} />
    //   </Link>
    // ));
    .map((el) => <PizzaBlock {...el} />);

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
        <h2>Питсы нэту</h2>
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
