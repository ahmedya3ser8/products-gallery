import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../interfaces/iproduct";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { getProductAPI } from "../services/productsService";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isError, isLoading } = useQuery<IProduct>({
    queryKey: ['singleProduct', id],
    queryFn: () => getProductAPI(Number(id)),
    staleTime: 5 * 60 * 1000
  }) 
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="loader block mx-auto"></span>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">Something went wrong. Please try again.</span>
      </div>
    )
  }
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container flex flex-col md:flex-row items-center gap-6 min-h-[90vh]">
        <div className="flex flex-col items-center md:flex-row gap-5 dark:text-white">
          <div className="product_image w-full md:w-1/2">
            <img src={product?.image} className="w-full max-h-[400px] object-contain rounded-lg shadow" alt={product?.title} />
          </div>
          <div className="content w-full md:w-1/2 dark:text-white">
            <ul className="space-y-4 text-base sm:text-lg md:text-xl">
              <li> <strong> title: </strong> <span className="block md:inline"> {product?.title} </span> </li>
              <li> <strong> Category: </strong> <span className="block md:inline"> {product?.category} </span> </li>
              <li> <strong> Description: </strong> <span className="block md:inline"> {product?.description} </span> </li>
              <li className="flex items-center gap-2 flex-wrap"> 
                <strong> Rate: </strong>
                <span className="mx-1"> {product?.rating.rate} </span>
                {Array.from({ length: 5 }, (_, i) => 
                  i < Math.floor(product?.rating.rate || 0) ? <FaStar key={i} className="text-yellow-600" /> : <FaRegStar key={i} className="text-yellow-400" />
                )}
              </li>
              <li> <strong> Count: </strong> <span> {product?.rating.count} </span> </li>
              <li> <strong> Price: </strong> <span className="text-emerald-600 font-bold"> {product?.price} </span> LE </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;
