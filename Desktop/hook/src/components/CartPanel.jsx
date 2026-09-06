import { useContext } from "react";
import { someContext } from "../cart/CartContext";

function CartPanel({ isOpen, onClose }) {
  const { cartItems } = useContext(someContext);

  if (!isOpen) return null;

  const total = cartItems.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cartItems.items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.items.map((item, index) => (
                <li key={index} className="cart-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">Br {item.price}</span>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div className="cart-total">
                <strong>Total:</strong> Br {total}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPanel;
