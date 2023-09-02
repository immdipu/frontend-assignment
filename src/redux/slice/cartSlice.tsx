import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the cart
export interface CartItem {
  productId: number;
  quantity: number;
  title: string;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, quantity, title, price, image } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Otherwise, add it as a new item
        state.items.push(action.payload);
      }
    },

    // Action to increase the quantity of a particular product in the cart
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.productId !== productIdToRemove
      );
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
