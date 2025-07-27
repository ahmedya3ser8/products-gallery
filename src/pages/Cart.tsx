import { useEffect, useState } from "react";
import type { TCartProduct } from "../components/product-item/ProductItem";

const CartPage = () => {
  const [cartProducts, setCartProducts ] = useState<TCartProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const incrementAmount = (inedx: number) => {
    cartProducts[inedx].quantity++;
    getTotalPrice();
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }
  const decrementAmount = (inedx: number) => {
    cartProducts[inedx].quantity--;
    getTotalPrice();
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }
  const deleteProduct = (index: number) => {
    cartProducts.splice(index, 1);
    getTotalPrice();
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }
  const clearCart = () => {
    const clearedCart: TCartProduct[] = [];
    setCartProducts(clearedCart);
    setTotal(0);
    localStorage.setItem('cartProducts', JSON.stringify(clearedCart))
  }
  const getTotalPrice = () => {
    const calculatedTotal = cartProducts.reduce((acc, product) => acc + product.quantity * product.item.price, 0);
    setTotal(calculatedTotal);
  }
  useEffect(() => {
    const storedCart = localStorage.getItem("cartProducts");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
      getTotalPrice();
    }
  }, []);
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <h1 className="text-2xl lg:text-4xl text-emerald-500 dark:text-white mb-4">Shopping Cart</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 dark:text-white">
          <p className="text-sm lg:text-base">You have <strong className="text-[#950b0b]"> {cartProducts.length} </strong> item in your cart </p>
          <button onClick={clearCart} className="text-[#950b0b] bg-gray-200 transition-all duration-700 hover:bg-gray-400 px-4 py-2 cursor-pointer">Clear Shopping Cart</button>
        </div>
        <div className="mt-6 overflow-auto rounded-md shadow ring-1 ring-gray-300">
          <table className="w-full min-w-[640px] text-sm text-center rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2">Img</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Quantity</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-solid border-b-black">
              {cartProducts.map((product, index) => (
                <tr key={product.item.id} className="odd:bg-white even:bg-gray-50 border-b border-b-gray-200 text-center">
                  <td className="p-2">
                    <img src={product.item.image} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto rounded-md" alt={product.item.title} />
                  </td>
                  <td className="p-2"> {product.item.title} </td>
                  <td className="p-2"> {product.item.price} L.E</td>
                  <td className="p-2 w-[140px]">
                    <div className="flex justify-between items-center gap-2">
                      <button onClick={() => incrementAmount(index)} className="bg-black text-white py-1 px-2 rounded-lg cursor-pointer">+</button>
                      <input readOnly value={product.quantity} type="number" className="w-10 text-center bg-white p-1 outline-none border border-solid border-[#ccc] rounded-lg" />
                      <button onClick={() => decrementAmount(index)} className="bg-black text-white py-1 px-2 rounded-lg cursor-pointer">-</button>
                    </div>
                  </td>
                  <td className="p-2 text-sm"> {(product.item.price * product.quantity).toFixed(2)} L.E</td>
                  <td className="p-2">
                    <button onClick={() => deleteProduct(index)} className="bg-red-500 text-white py-2 px-3 rounded-lg cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="font-medium text-sm text-end px-4 py-3 dark:text-white">Total : <strong> {total.toFixed(2)} </strong> L.E</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}

export default CartPage;
