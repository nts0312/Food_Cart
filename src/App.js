import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
//import About from "./components/About";
import Error from "./components/Error";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";

const AppLayout = () => {
  //Suppose We have authentication logic which provide data with name
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = {
      name: "Nitin Singh",
    };
    setUserName(data.name);
  }, []);
  //Now to pass this new Info to my app , we will use context Provider

  return (
    // Add a provider which will provide a bridge or connection between app and store , and store prop is must
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          {/*Outlet is replaced by component which is showing , it will not be present in elements in inspect element */}
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const About = lazy(() => import("./components/About"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/contact", element: <Contact />, errorElement: <Error /> },

      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Please Wait!!!</h1>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },

      { path: "/cart", element: <Cart />, errorElement: <Error /> },

      { path: "/", element: <Body />, errorElement: <Error /> },

      {
        path: "/restaurant/:resId", // for dynamic Routing
        element: <RestaurantMenu />,
        errorElement: <Error />,
      },

      { path: "/cart", element: <Cart />, 
      errorElement: <Error /> },

    ],

    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
