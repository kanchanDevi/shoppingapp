import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORY_URL } from "../utils/constant";
import Home from './Home';
import { useSelector } from "react-redux";
import { FaShoppingCart, FaShopware } from 'react-icons/fa';


const Navbar = ({ onSearch, onCategorySelect, categories, onHomeClick }) => {
  const [input, setInput] = useState("");
  const [cate, setCate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems =useSelector((store)=>store.cart.item)
  console.log(cartItems)

  useEffect(() => {
    getCategoryData();
  }, []);

  async function getCategoryData() {
    try {
      const data = await fetch(CATEGORY_URL);
      const jsonData = await data.json();
      setCate(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleHomeClick = () => {
    onHomeClick(); 
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId); 
    setIsDropdownOpen(false); 
  };

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    onSearch(inputValue.trim());
  };
  return (
    <nav>
      <ul className="flex justify-around bg-red-100">
       
        <Link to="/" element={<Home/>} onClick={handleHomeClick}>
            <li className="p-2 font-semibold "><FaShopware style={{fontSize:"30px"}}/></li>
          </Link>

        <li className="p-2 font-semibold">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="flex px-5 py-2 text-sm   rounded-md font-semibold outline-none  "
              id="options-menu"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={handleDropdownToggle}
            >
              {selectedCategory ? selectedCategory : "Categories"}
              <svg
                className={`w-5 h-5 ml-2 -mr-1 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 w-36 mt-2 ml-2 origin-top-right bg-white border rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  {cate.map((category) => (
                    <button
                      key={category.id} // Add the key prop here
                      className={`block w-full text-left px-4 text-sm py-2 capitalize ${
                        selectedCategory === category
                          ? "bg-gray-100 text-gray-900 capitalize"
                          : "text-gray-700  hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      role="menuitem"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </li>
        <li className="p-2 font-semibold  ">
          <form>
            <input
              type="text"
              placeholder="🔍"
              className="outline-none border rounded-xl pl-2 text-md w-96 p-1"
              value={input}
              onChange={handleInput}
            />
          </form>
        </li>
        <li className="p-2  text-lg font-semibold">Account</li>
        <Link to= "/cart"> <li className="pl-2 pt-2  flex items-center font-bold text-lg"><FaShoppingCart className="mr-2"/>{cartItems.length}</li></Link> 

      </ul>
    </nav>
  );
};

export default Navbar;
