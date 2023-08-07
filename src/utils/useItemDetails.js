// import {useEffect, useState} from 'react';

// import { URL } from "./constant";


// const useItemDetails=(resId)=>{
//     const [items, setItems]=useState(null)
    
//     useEffect(() => {
//         getRestaurantInfo();
//       }, []);
    
//       async function getRestaurantInfo() {
//         const data = await fetch(
//         URL + resId //mistake 3: Used the wrong URL to fetch details of menu
//         );
//         const jsonData = await data.json();
//         console.log(jsonData);
        
//         setItems(jsonData);
//       }
      
//     return items
// }

// export default useItemDetails