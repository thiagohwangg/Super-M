import {useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function ProductDetails() {
    const [product, setProduct] = useState({})
    const params = useParams()
    const {get} = useFetch("https://react-tutorial-demo.firebaseio.com/")
    useEffect(() => {
        get(`productinfo/id${params.id}.json`)
            .then(data => {
                setProduct(data)
            })
    }, [])
  return (
    <div className="product-details-layout">
        <div>
            <h2>{product.name}</h2>
            <img src={product.image} width={125} height={125} className="product-details-image" alt="product name here" />
        </div>
        <div>
            <div className="tabs">
            <ul>
                <li>
                <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="" end>Details</NavLink>
                </li>
                <li>
                <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="nutrition">Nutrition</NavLink>
                </li>
                <li>
                <NavLink className={({isActive}) => isActive ? "tab-active" : ""} to="storage">Storage</NavLink>
                </li>
            </ul>
            </div>
            <Outlet context={product} />    
        </div>
    </div>

  )
}
