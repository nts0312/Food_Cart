import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, costForTwo, avgRatingString, cloudinaryImageId } =
    resData?.info;

  return (
    <div className="m-4 my-6 p-2 w-[250px] border-solid border-grey-800 border-2 rounded-lg shadow-xl transition-transform hover:scale-105">
      <div className="cursor-pointer">
        <img
          className="rounded-lg "
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <p className="whitespace-nowrap text-ellipsis overflow-hidden font-bold text-lg py-1">
          {name}
        </p>
        <p className="text-sm"> ⭐️ {avgRatingString}</p>
        <p className="whitespace-nowrap text-ellipsis overflow-hidden text-sm">
          {cuisines.join(", ")}
        </p>
        <p className="text-sm">Price : {costForTwo}</p>
        <p className="text-sm">Delivery Time : {resData.info.sla.slaString}</p>
      </div>
    </div>
  );
};

//filtering
export const OpenRestaurantCards = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        {/* FIX THIS UI  */}
        {/* <label className="text-white bg-black absolute ">Open</label> */}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
