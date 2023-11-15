import RestaurantCard, { OpenRestaurantCards } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { SWIGGY_API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
//import { ResCards } from "../utils/data";
// import useRestaurantList from "../utils/useRestaurantList";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState("");

  const OpenRestaurant = OpenRestaurantCards(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();

    //optional chaining
    setlistOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setFilteredList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (onlineStatus === false)
    return (
      <div>
        <h1>OFFLINE</h1>
      </div>
    );
  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" py-6 ">
      <div className="flex">
        <div className="search">
          <input
            type="text"
            className="border w-64 rounded-l h-9 ml-4 shadow-md"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className=" bg-amber-400 h-9 w-24 rounded-r text-white  hover:bg-yellow-500 shadow-md"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredList(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="text-white ml-10 h-9 bg-amber-400  hover:bg-yellow-500  shadow-md font-medium rounded-full text-sm px-5 text-center mr-2 mb-2"
          //callback must learn
          onClick={() => {
            const filteredRestaurants = listOfRestaurants?.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredList(filteredRestaurants);
          }}
        >
          Top Rated
        </button>

        {/* checking real time change using Usecontext */}
        <input
          className="border border-orange-300 px-2 ml-3 h-8"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap space-x-[5px]">
        {filteredList?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"restaurant/" + restaurant.info.id}
            style={{ textDecoration: "none", color: "black" }} //key is placed from Restaurant card to Link bcoz key is always placed at parent jsx
          >
            {restaurant.info.isOpen ? (
              <OpenRestaurant resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
