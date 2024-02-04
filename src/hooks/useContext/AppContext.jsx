import {createContext, useEffect, useState} from "react"

export const AppContext = createContext();

export function AppProvider(props) {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || []
      });
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
      }, [cart])
      function handleProductAdd(newProduct) {
        const existingProduct = cart.find(product => product.id === newProduct.id);
        if(existingProduct) {
          const cartUpdate = cart.map(product => {
            if(product.id === newProduct.id) {
              return {
                ...product,
                quantity: product.quantity + 1
              }
            }
            return product
          })
          setCart(cartUpdate)
        } else {
          setCart([...cart, {...newProduct, quantity: 1}])
        }
      }
    
      function handleProductDelete(id) {
        const cartUpdate = cart.filter(product => product.id !== id);
        setCart(cartUpdate)
      }

      function getProductFromCart(productId) {
        return cart.find(product => product.id === productId)
      }

      function getTotalPrice() {
        return cart.reduce((total, product) => total + product.quantity, 0)
      }

      function getTotalCart() {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0)
      }

      const value = {
        cart,
        setCart,
        onProductAdd: handleProductAdd,
        onProductDelete: handleProductDelete,
        getProductFromCart,
        getTotalPrice,
        getTotalCart
      }
    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}
