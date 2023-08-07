import React, { useState, useEffect } from "react";
import { URL, CATEGORY_URL } from "../utils/constant";
import Navbar from "./Navbar";
import Card from "./Card";
import { Link } from "react-router-dom";
import { filteredInputData } from "../utils/helper";



const Home = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  


  useEffect(() => {
    getData();
    getCategoryData();
  }, []);

  useEffect(() => {
    const dataapi = filteredInputData(input, data);
    setFilteredData(dataapi);
  }, [data, input]);

  async function getData() {
    const data = await fetch(URL);
    const jsonData = await data.json();
    setData(jsonData);
    setFilteredData(jsonData);
  }

  async function getCategoryData() {
    const data = await fetch(CATEGORY_URL);
    const jsonData = await data.json();
    setCategorySelect(jsonData);
  }

  const handleSearch = (query) => {
    setInput(query);
  };

  const handleCategorySelect = (query) => {
    setCategorySelect(query);
    if (query) {
      const filteredByCategory = data.filter((item) => item.category === query);
      setFilteredData(filteredByCategory);
    } else {
      // If no category is selected, set the filtered data as the original data
      setFilteredData(data);
    }
  };

  const handleHomeClick = () => {
    // Reset the filters and show all data
    setInput("");
    setCategorySelect(null);
    setFilteredData(data);
  };

  return (
    <div className="flex flex-col justify-center p-3">
      <Navbar
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        onHomeClick={handleHomeClick} 
        categories={categorySelect}// Pass the handleHomeClick function to Navbar
      />
      <div className="flex container flex-wrap m-4 justify-center ">
        {filteredData.map((item, index) => (
          <Link to={"/items/" + item.id}  key={item.id}>
          <Card {...item} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
