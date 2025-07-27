import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import ProductItem from "../components/product-item/ProductItem";
import type { IProduct } from "../interfaces/iproduct";
import { getAllProductsAPI } from "../services/productsService";

const ProductsPage = () => {
  const [sortType, setSortType] = useState('');
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: products, isLoading, isError } = useQuery<IProduct[]>({
    queryKey: ['allProducts'],
    queryFn: getAllProductsAPI,
    staleTime: 5 * 60 * 1000
  })
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const result = products?.filter(item => item.title.toLowerCase().includes(text.trim().toLowerCase()));
    switch(sortType) {
      case 'name-asc':
        return [...result].sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return [...result].sort((a, b) => b.title.localeCompare(a.title))
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      default:
        return result;
    }
  }, [products, text, sortType])
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
    <section className="products py-12 px-4 sm:px-6 lg:px-8">
      <div className="container relative">
        <div className="sorting flex justify-between items-center">
          <input onChange={(e) => setText(e.target.value)} type="search" placeholder="Search By Title..." className="block w-2/3 lg:w-1/4 p-2 outline-none border border-emerald-700 dark:border-white dark:placeholder:text-gray-200 rounded-lg" />
          <button onClick={() => setIsOpen(prev => !prev)} className="flex items-center gap-2 cursor-pointer dark:text-white">
            <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
              <path d="M4.375 10.7085H30.625" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8.75 18H26.25" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14.582 25.2915H20.4154" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Sort By
          </button>
        </div>
        {isOpen && (
          <ul className="sort_menu space-y-2 absolute right-[50px] bg-gray-50 dark:bg-black dark:text-white px-4 py-2 rounded-lg z-50">
            <li onClick={() => { setSortType('name-asc'); setIsOpen(false) }} className="cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-900"> Name (A_Z) </li>
            <li onClick={() => { setSortType('name-desc'); setIsOpen(false) }} className="cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-900"> Name (Z_A) </li>
            <li onClick={() => { setSortType('price-asc'); setIsOpen(false) }} className="cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-900"> Low To High </li>
            <li onClick={() => { setSortType('price-desc'); setIsOpen(false) }} className="cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-900"> High To Low </li>
          </ul>
        )}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-5">
          {filteredProducts?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage;
