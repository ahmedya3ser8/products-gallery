import { Link } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    document.body.classList.add('dark:bg-black')
    setIsOpen(prev => !prev);
  };
  return (
    <header className="py-5 bg-gradient-to-tr from-emerald-500 to-teal-500 dark:bg-gradient-to-tr dark:from-black dark:to-gray-950 text-white ">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to=''>
            <h2 className="text-xl md:text-3xl font-bold"> Products Gallery </h2>
          </Link>
          <ul className="flex space-x-2 lg:space-x-12">
            <li>
              <Link to='/' className="text-lg lg:text-2xl">Products</Link>
            </li>
            <li>
              <Link to='/cart' className="text-lg lg:text-2xl">Cart</Link>
            </li>
            <button onClick={toggleDarkMode} className="text-lg lg:text-2xl cursor-pointer select-none">
              {isOpen ? <LuSun /> : <LuMoon /> }
            </button>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;
