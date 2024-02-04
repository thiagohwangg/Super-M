import {useState, useEffect} from "react"
import useFetch from "../../hooks/useFetch"
import Product from "../Product/"
import Loader from "../../components/Loader"

export default function Products () {
  const [products, setProducts] = useState([])
  const {get, loading} = useFetch("https://course-assets.tek4.vn/reactjs-assets/")
  useEffect(() => {
    get("supermarket.json")
      .then(data => {
        console.log(data);
        setProducts(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="products-layout">
      {loading && <Loader />}
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
          {products.map(product => <Product key={product.id} details={product} />)}
      </div>
    </div>


  )
}
