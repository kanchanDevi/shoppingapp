
import { formatIndianRupees } from "../utils/helper";

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
const Card = ({id, title, image, price, rating, category }) => {
  
  return (
    <div className="card w-[250px] h-[400px] flex flex-col m-3 mb-5  p-3  ">
      <div className="p-3">
        <img src={image} alt="pro-i" className="w-56 h-56" />
      </div>
      
     <div>
      <div className="w-[220px] h-[100px] ">
      <div className="flex justify-between  ">
      <p className="text-xs font-bold whitespace-wrap ">{title}</p>
      <p className="text-xs whitespace-nowrap items-end"> Price: {formatIndianRupees(price)}</p>
      </div>
      
     <div className="pt-2">
      
     <p className="text-sm mt-2 ">{generateStarIcons(rating.rate)}{rating.rate}</p>
     </div>
    

     <button className="mt-2 w-36 rounded-2xl border border-x-2 border-gray-500 text-black-500  p-2 text-sm hover:bg-yellow-600 hover:text-white" >Details</button>
     </div>
    </div>
    </div>
  );
};

export default Card;
