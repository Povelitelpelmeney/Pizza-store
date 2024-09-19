import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/slices/filterSlice";
import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() { 
  const [searchValue, setSearchValue] = React.useState("");
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
