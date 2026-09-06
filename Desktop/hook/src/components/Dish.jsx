import PropTypes from "prop-types";
import { useContext, useReducer } from "react";
import { someContext } from "../cart/CartContext";

const Dish = ({ name, price, spicy, category, image }) => {
  const { cartItems, setCartItems } = useContext(someContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT": {
        const updatedItems = [
          ...cartItems.items,
          { name, price, spicy, category, image },
        ];
        setCartItems({ items: updatedItems });
        return state + 1;
      }
      case "DECREMENT": {
        const newItems = cartItems.items.slice(0, -1);
        setCartItems({ items: newItems });
        return state > 0 ? state - 1 : 0;
      }
      case "RESET": {
        setCartItems({ items: [] });
        return 0;
      }
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, cartItems.items.length);

  return (
    <div className="dish-card">
      {image && <img src={image} alt={name} className="dish-image" />}
      <div className="categoryWrapper">
        {category}
        {spicy && <span> 🌶️ Spicy</span>}
      </div>
      <h3>{name}</h3>
      <p className="price">Br {price}</p>

      <div className="dish-controls">
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <span className="count">{count > 0 && count}</span>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      </div>
      <button className="reset-btn" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </div>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  category: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Dish.defaultProps = {
  spicy: false,
  image: null,
};

export default Dish;
