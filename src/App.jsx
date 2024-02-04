
import { Route, Routes } from "react-router-dom"
import Navbar from "./layouts/Navbar"
import Home from "./layouts/Home"
import About from "./layouts/About"
import Products from "./layouts/Products"
import Cart from "./layouts/Cart"
import ProductDetails from "./layouts/ProductDetails/"
import ProductDetailInfo from "./layouts/ProductDetails/ProductDetailInfo"
import ProductDetailNutrition from "./layouts/ProductDetails/ProductDetailNutrition/"
import ProductDetailStorage from "./layouts/ProductDetails/ProductDetailStorage"


function App() {
  
  return (
    <div className="container">
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<ProductDetails />}>
        <Route path='' element={<ProductDetailInfo />} />
        <Route path='nutrition' element={<ProductDetailNutrition />} />
        <Route path='storage' element={<ProductDetailStorage />} />
      </Route>
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </div>

  )
}


export default App
