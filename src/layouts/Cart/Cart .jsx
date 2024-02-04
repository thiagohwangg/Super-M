import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useSelector } from "react-redux";
import { cartCountValue } from "../../Redux/Store/Store";

const stripeLoadedPromise = loadStripe(
  "pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate"
);

export default function Cart() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(() => {
   return JSON.parse(localStorage.getItem("loggedIn")) ?? false;
  });
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn))
  }, [loggedIn])
  const totalCart = useSelector(cartCountValue);
  function handleFormSubmit(e) {
    e.preventDefault();
    const lineItems = cart.map((product) => {
      return {
        price: product.price_id,
        quantity: product.quantity,
      };
    });
    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "http://localhost:5173/",
          cancelUrl: "https://react-tutorial.app/app.html",
          customerEmail: email,
        })
        .then((response) => {
          console.log(response.error);
        })
        .catch((error) => console.log(error));
    });
  }
  if(loggedIn) {
    return (
      <div className="cart-layout">
        {cart.length === 0 && (
          <div>
            <h1>Your Cart</h1>
            <p>You have not added any product to your cart yet.</p>
          </div>
        )}
        {cart.length > 0 && (
          <table className="table table-cart">
            <thead>
              <tr>
                <th width="25%" className="th-product">
                  Product
                </th>
                <th width="20%">Unit price</th>
                <th width="10%">Quanity</th>
                <th width="25%">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} width={30} height={30} alt />
                      {product.name}
                    </td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <strong>${product.price * product.quantity}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} />
                <th className="cart-highlight">Total</th>
                <th className="cart-highlight">${totalCart}</th>
              </tr>
            </tfoot>
          </table>
        )}
        {cart.length > 0 && (
          <form onSubmit={handleFormSubmit} className="pay-form">
            <p>
              Enter your email and then click on pay and your products will be
              delivered to you on the same day!
            </p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Email"
              type="email"
            />
            <Button type="submit">Pay</Button>
          </form>
        )}
      </div>
    );
  }else {
    return <>
            <h2>Please login</h2>
            <Button className="btn btn-primary" onClick={() => setLoggedIn(true)}>Login</Button>
    </>;
  }  
  }
  