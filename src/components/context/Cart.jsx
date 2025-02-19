import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const addToCart = (product) => {
    let newCart = [...cart];

    const index = newCart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const shipping=() => {
    return 0;
  };
  const subTotal = ()=>{
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  const grandToral = () => {
    return subTotal() + shipping();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart ,subTotal,grandToral,shipping}}>
      {children}
    </CartContext.Provider>
  );
};
