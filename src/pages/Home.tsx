import React from "react";
import { useSelector } from "react-redux";
import { setCategoryId, setCurPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import PizzaBlock, { PizzaBlockProps } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import SortPopup from "../components/Sort";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../hooks";
import { RootState } from "../redux/store";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, curPage, searchValue } = useSelector(
    (state: RootState) => state.filterSlice
  );
  const { items, status } = useSelector((state: RootState) => state.pizzaSlice);
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (page: number) => {
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
    .filter((obj: PizzaBlockProps) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((el: PizzaBlockProps) => <PizzaBlock key={el.id} {...el} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <h2 key={status}>Питсы нэту</h2>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination
        curPage={curPage - 1}
        onChangePage={(page: number) => onChangePage(page)}
      />
    </div>
  );
};

export default Home;
