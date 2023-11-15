import React, { useState } from "react";
import ItemList from "./ItemList";

function RestaurantCategory({ data, setShowItem, showItem }) {
  //   const [showItem, setShowItems] = useState(false);

  const handleClick = () => {
    setShowItem();
  };
  return (
    <div>
      {/* Header */}
      <div className="w-6/12 mx-auto my-6 bg-gray-50 shadow-xl p-4 ">
        <div
          className="flex justify-between cursor-pointer "
          onClick={handleClick}
        >
          <span className="font-bold text">
            {data.title} ({data.itemCards.length})
          </span>
          <span>{showItem ? "⬆️" : "⬇️"}</span>
        </div>
        {/* Accordian Body */}
        {showItem && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
}

export default RestaurantCategory;
