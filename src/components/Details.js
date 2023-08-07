import React, { useEffect, useState, useCallback } from 'react';
import { URL } from '../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import Navbar from './Navbar';
import { formatIndianRupees } from '../utils/helper';


const generateStarIcons = (rate) => {
  const totalStars = 5;
  const fullStars = Math.floor(rate);
  const halfStars = Math.ceil(rate - fullStars);
  const emptyStars = totalStars - fullStars - halfStars;

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-star-${i}`}>⭐</span>);
  }

  // Add half stars
  for (let i = 0; i < halfStars; i++) {
    stars.push(<span key={`half-star-${i}`}>⭐</span>);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-star-${i}`} className="text-xl">☆</span>);
  }

  return stars;
};


const Details = () => {
    const [items, setItems] = useState();
    const { id } = useParams();
    const dispatch = useDispatch();

    const getapiData = useCallback(async () => {
        try {
            const data = await fetch(`${URL}/${id}`);
            if (!data.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await data.json();
            setItems(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error scenario here if needed
        }
    }, [id]);

    useEffect(() => {
        getapiData();
    }, [getapiData]);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };
  

    return (
        <>
        <Navbar />
            {items && (
                <>
                    <div className='flex justify-center bg-green-100 h-[100vh]  pt-5'>
                    <div className=' p-3 h-96 w-96 '>
                    <img src={items.image} alt="data"  className='w-96 h-96 p-2 border-yellow-200 border-8' />
                    </div>
                    <div className='w-1/2 p-2'>
                      <p className='font-bold'>{items.title}</p>
                      <p>{items.description}</p>
                      <p className='font-semibold mt-2 mb-3'>{items.category}</p>
                      <p className='mb-2'>{generateStarIcons(items.rating.rate)}{items.rating.rate}</p>
                      <p className='mb-5'>Price: {formatIndianRupees(items.price)}</p>
                    <div>
                    <button  className="bg-yellow-300 p-3 outline-none rounded-2xl text-gray-800 " >Buy Now</button>
                    <button  className=" border border-yellow-400 p-3 rounded-2xl ml-2 text-gray-800" onClick={()=>handleAddItem(items)} key={items?.id}>Add To Cart</button>
                    </div>
                   
                    </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Details;
