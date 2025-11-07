import React from 'react';
import { useCart } from '../CartContext';

function Products({ data }) {
     const { addToCart , removeFromCart } = useCart();

     
  return (
    <div className="border rounded-2xl p-4 flex flex-col items-center  bg-white max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mt-1">{data.title.slice(0,20)+"..."}</h2>
      <p className="text-xl font-bold text-black mt-2">${data.price}</p>
      <p className="text-sm text-gray-600 text-center mt-2">{data.description.slice(0 , 25) + "..."}</p>
      <button 
        className="mt-2 bg-black text-white px-3 py-1 rounded"
        onClick={() => addToCart(data)}
      >
        Add to Cart
      </button>
       <button 
        className="mt-2 bg-black text-white px-3 py-1 rounded"
        onClick={() => removeFromCart(data.id)}
      >
        remove from cart
      </button>
    </div>
  );
}

export default Products;
