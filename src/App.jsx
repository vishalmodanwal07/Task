import { useEffect, useState } from 'react'

import './App.css'
import Products from './component/Products';
import { useCart } from './CartContext';

function App() {
 const [data , setData] = useState([]);
 const [ loading , setLoading] = useState(false);
 const [error , setError] = useState(null);
 const [ categories , setCategories] = useState([]);
 const [selectedCategory , setSelectedCategory] = useState("all");


 const {cart , clearCart} = useCart();
//  console.log(cart);


useEffect(()=>{
   fetchCategory();
} , []);

useEffect(()=>{
  fetchproducts();
} , [selectedCategory]);

const fetchproducts = async()=>{
  const api = selectedCategory ==="all" ? "https://fakestoreapi.com/products" : `https://fakestoreapi.com/products/category/${selectedCategory}`
  setLoading(true);
  try {
  const response = await fetch(api);
  const data = await response.json();
  console.log("here" , data);
  setData(data);
  } catch (err) {
    console.log("error in fetch Data" , err);
    setError("failed to fetch data")
  }finally{
    setLoading(false);
  }
}
 
const fetchCategory = async ()=>{
 try {
   const response = await fetch("https://fakestoreapi.com/products/categories");
   const data = await response.json();
   console.log(data);
   setCategories(data);
 } catch (error) {
    console.log("error to fetching in categories")
 }
}

const totalPrice = cart.reduce((a , b)=> a+ b.price ,0);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
      <h2 className='text-xl text-black'>Cart : {cart.length}</h2>
      <div className='flex justify-around'>
         <button  className="mt-2 bg-red-500 text-white px-3 py-1 rounded" onClick={()=>{clearCart()}}>Clear All cart items</button>
      <select value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}}>
        <option value="all">All Products</option>
      {
        categories.map((category)=>(
          <option key={category} value={category}>{category.toUpperCase()}</option>
         ))
      }
      </select>
      </div>
     
      <p  className="mt-2 bg-amber-300 text-balck text-xl px-3 py-1 rounded" >Total all Price :{totalPrice} </p>

      {loading ? (
        <p className="text-center text-2xl text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {data.map((product) => (
            <Products key={product.id} data={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
