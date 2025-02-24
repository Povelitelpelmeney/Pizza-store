import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

type pizzaType = {
  imageUrl: string;
  title: string;
  price: string;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<pizzaType>({
    imageUrl: "",
    title: "",
    price: "",
  });
  React.useEffect(() => {
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
    return <div> Загрузка </div>;
  }
  const { imageUrl, title, price } = pizza;
  return (
    <div className="container">
      <img src={imageUrl} alt="" />
      <h2>{title}</h2>
      <h4>{price}</h4>
    </div>
  );
};
export default FullPizza;
