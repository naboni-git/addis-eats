export const initialState = {
  items: [],
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      // Check if item already exists in cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // If exists, increase quantity by 1
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      // If new item, add with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE": {
      // Find the item
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );

      if (existingItem && existingItem.quantity > 1) {
        // If quantity > 1, decrease by 1
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      }

      // If quantity is 1, remove item completely
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR": {
      // Remove all items
      return {
        ...state,
        items: [],
      };
    }

    default: {
      // Return state unchanged for unknown actions
      return state;
    }
  }
}

// Helper function to calculate total price
export function getTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Helper function to count total items
export function getCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
