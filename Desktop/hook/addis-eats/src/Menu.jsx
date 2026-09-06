import { useState, useMemo } from "react";
import Dish from "./components/Dish";
import CategoryBar from "./components/CategoryBar";

const DISHES = [
  { id: 1, name: "Doro Wat", price: 350, category: "Wot", spicy: true },
  { id: 2, name: "Tibs", price: 280, category: "Tibs", spicy: false },
  { id: 3, name: "Kitfo", price: 320, category: "Kitfo", spicy: true },
  { id: 4, name: "Shiro Wat", price: 180, category: "Wot", spicy: false },
  { id: 5, name: "Firfir", price: 150, category: "Sides", spicy: true },
  { id: 6, name: "Injera", price: 80, category: "Sides", spicy: false },
];

function Menu() {
  const [category, setCategory] = useState("All");

  const filteredDishes = useMemo(() => {
    if (category === "All") return DISHES;
    return DISHES.filter((d) => d.category === category);
  }, [category]);

  return (
    <div className="menu-section">
      <CategoryBar selected={category} onSelect={setCategory} />

      {filteredDishes.length === 0 ? (
        <p className="empty-state">No dishes in "{category}"</p>
      ) : (
        <div className="menu-grid">
          {filteredDishes.map((dish) => (
            <Dish key={dish.id} {...dish} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
