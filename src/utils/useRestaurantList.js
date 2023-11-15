// import { useEffect, useState } from "react";
// import { SWIGGY_API_URL } from "./constants";

// const useRestaurantList = () => {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await fetch(SWIGGY_API_URL);
//     const json = await data.json();

//     const list =
//       json?.data?.cards[2].card?.card?.gridElements?.infoWithStyle?.restaurants;

//     setList(list);
//   };

//   return list;
// };

// export default useRestaurantList;
