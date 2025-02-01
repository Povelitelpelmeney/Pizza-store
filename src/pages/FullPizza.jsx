import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
  React.useEffect(() => {
    console.log(id);
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://66dfe34a2fb67ac16f276c3c.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, [id]);
  if (!pizza) {
    return "Загрузка";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
export default FullPizza;
