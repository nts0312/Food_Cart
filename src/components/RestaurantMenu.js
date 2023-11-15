import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [showItem, setShowItem] = useState(0);
  const [isTrue, setIsTrue] = useState(true);
  const resId = useParams();

  const resInfo = useRestaurantMenu(resId?.resId);

  if (resInfo === null) return <Shimmer />;

  const { name, costForTwoMessage, cuisines } =
    resInfo?.cards[0]?.card?.card?.info;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center">
      <h1 className="text-4xl m-4">{name}</h1>
      <p className="text-xl">{cuisines.join(", ")}</p>

      {categories?.map((category, index) => (
        //controlled component (as it is controlled by Parent component)
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          //handled from here , it is called uplifting the state
          showItem={index === showItem && isTrue}
          //important logic
          setShowItem={() => {
            console.log("prev", showItem, "index--", index);
            if (index === showItem) setIsTrue(!isTrue);

            if (index != showItem) setIsTrue(true);

            setShowItem(index);
            console.log("after", showItem, "index", index);
          }}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
