import { useEffect, useState } from 'react'

import './App.css'
import Products from './component/Products';
import { useCart } from './CartContext';

function App() {
 const [data , setData] = useState([]);
 const [ loading , setLoading] = useState(false);
 const [error , setError] = useState(null);

 const {cart , clearCart} = useCart();
 console.log(cart);

useEffect(()=>{
   fetchproducts()
} , []);

const fetchproducts = async()=>{
  setLoading(true);
  try {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log("here" , data);
  setData(data);
  } catch (error) {
    console.log("error in fetch Data" , error);
  }finally{
    setLoading(false);
  }
}
 
const totalPrice = cart.reduce((a , b)=> a+ b.price ,0);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
      <h2>Cart : {cart.length}</h2>
      <button  className="mt-2 bg-red-500 text-white px-3 py-1 rounded" onClick={()=>{clearCart()}}>Clear All cart items</button>
      <p  className="mt-2 bg-amber-300 text-white px-3 py-1 rounded" >Total all Price :{totalPrice} </p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading data</p>
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
