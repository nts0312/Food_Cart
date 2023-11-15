import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/redux/cartSlice";

const Cart = () => {

  //always use specific and correct reduxStore . We could subscribe to whole store like useSelector((store) => store and later fetch values from it . But it is very less efficient as if any change happened in store , our cart will get affected . Which we dont want. We want only items list
  
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && <h1>Please add items to the Cart !!!</h1>}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
