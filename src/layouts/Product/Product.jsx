/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { addProduct, removeProduct } from "../../Redux/Store/Store";

export default function Product(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { details } = props;
  // eslint-disable-next-line react/prop-types
  const { image, description, name, price } = details;
  // eslint-disable-next-line react/prop-types
  const productFromCart = cart.find((product) => product.id === details.id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  const onProductAdd = () => {
    dispatch(addProduct(details));
  };

  const onProductDelete = () => {
    dispatch(removeProduct(details));
  };

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${details.id}`}>
          <img
            src={image}
            width={100}
            height={100}
            className="product-image"
            alt="product name here"
          />
          <div className="product-quantity-container">
            {quantity > 0 && (
                <div className="product-quantity">{quantity}</div>
            )}
            
          </div>
        </Link>
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              onClick={() => onProductDelete(details.id)}
              outline
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        <Button onClick={() => onProductAdd(details)} outline>
          ${price}
        </Button>
      </div>
    </div>
  );
}
