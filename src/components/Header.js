import { useContext, useState } from "react";
import logo from "../utils/foody.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  //subscribing to the store using selector
  const cartItems = useSelector((store) => {
    return store.cart.items;
  });

  console.log(cartItems);

  return (
    <div className="flex justify-between bg-amber-400 rounded-b-lg shadow-xl h-[110px]">
      <div className="w-28 ml-8">
        <img className="logo" src={logo} />
      </div>
      <div className="nav-items ">
        <ul className="flex my-10">
          {/* not using  anchor <a > tag as it reloads the whole page instead we use link from react-router dom*/}
          <li>Online Status {onlineStatus == true ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link style={{ textDecoration: "none" }} to="/">
              Home
            </Link>
          </li>
          <li className="px-4">
            <Link style={{ textDecoration: "none" }} to="about">
              About Us
            </Link>
          </li>
          <li className="px-4">
            <Link style={{ textDecoration: "none" }} to="contact">
              Contact Us
            </Link>
          </li>
          <li className="px-4">
            <Link style={{ textDecoration: "none" }} to="cart">
              Cart - ({cartItems.length})
            </Link>
          </li>
          <li className="px-1 font-bold">{loggedInUser}</li>
          <div className="px-4 w-10 mr-14">
            <button
              onClick={() => {
                btnName === "Login"
                  ? setbtnName("Logout")
                  : setbtnName("Login");
              }}
            >
              {btnName}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
