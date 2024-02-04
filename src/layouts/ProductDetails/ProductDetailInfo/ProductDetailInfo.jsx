import { useDispatch } from "react-redux"
import { useOutletContext } from "react-router-dom"
import Button from "../../../components/Button"
import {addProduct} from "../../../Redux/Store/Store"



export default function ProductDetailInfo() {
  const dispatch = useDispatch();
  
  const product = useOutletContext();
  const {description, price} = product;
  const onProductAdd = () => {
    dispatch(addProduct(product))
  }
  return (
    <div>
        <p>
            {description} sold at <strong>${price}</strong> per piece.
        </p>
        <Button onClick={() => onProductAdd()}>${price}</Button>
    </div>

  )
}
