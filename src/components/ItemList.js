import React from "react";
import { CDN_URL_MENU } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/redux/cartSlice";

function ItemList({ items }) {
  // let itemsCount = items.length;

  const dispatch = useDispatch()

  const handleAddItem = (items) => {
//Dispatch an action
 dispatch(addItem(items))
  }

  return (
    <div>
      <div>
        {items.map((item, index) => (
          <div key={item.card.info.id} className="flex border-b-2">
            <div className=" p-4 m-2 text-left w-9/12">
              <div className="my-4 ">
                <span className="font-medium">{item.card.info.name}</span>
                <span className="block font-medium">
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {item.card.info.description}
              </p>
            </div>
            <div className="w-3/12 py-8">
              <div className="absolute px-14 py-24">
                <button className="bg-white text-green-500 border-b-4 w-16 rounded-md" onClick={() => handleAddItem(item)}>
                  Add +
                </button>
              </div>
              <div>
                <img
                  className="rounded-lg"
                  src={CDN_URL_MENU + item?.card?.info?.imageId}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
