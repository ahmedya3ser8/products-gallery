import { Link } from "react-router-dom";
import type { IProduct } from "../../interfaces/iproduct";
import toast from "react-hot-toast";

export type TCartProduct = {
  item: IProduct,
  quantity: number
}

const ProductItem = ({ product }: {product: IProduct}) => {
  const addToCart = () => {
    const storedCart = localStorage.getItem("cartProducts");
    const updatedCart: TCartProduct[] = storedCart ? JSON.parse(storedCart) : [];
    const existingIndex = updatedCart.findIndex(p => p.item.id === product.id);
    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += 1;
      toast.success('product increase successfully')
    } else {
      updatedCart.push({ item: product, quantity: 1 });
      toast.success('product added to your cart')
    }
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
  }
  return (
    <div className="card p-4 text-[#333] rounded-lg shadow-[0px_2px_5px_#ca25104d] transition duration-300 hover:scale-105 dark:bg-white"> 
      <Link to={`products/${product.id}`} className="product_image">
        <img src={product.image} className="w-full h-[200px] cursor-pointer" alt={product.title} />
      </Link>
      <div className="card_body">
        <h3 className="bg-gray-100 px-4 py-2 mt-3 text-lg"> {product.title.split(' ', 5).join(' ')} </h3>
        <p className="px-4 py-2 h-[100px] my-3 overflow-hidden" > {product.description} </p>
      </div>
      <div className="card_footer flex justify-between items-center mt-4 px-4">
        <button onClick={addToCart} className="bg-[#157347] text-white p-2 rounded-md cursor-pointer">Add To Cart</button>
        <div className="product_price bg-[#f1b4b4] py-1 px-2 rounded-4xl"> {product.price} L.E </div>
      </div>
    </div>
  )
}

export default ProductItem;
