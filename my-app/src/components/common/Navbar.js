import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const { totalItems } = useSelector((state) => state.cart);


  // Ḍemo temporary data
const subLinks = [
    {
        title: "Python",
        link:"/catalog/python"
    },
    {
        title: "Web Dev",
        link:"/catalog/web-development"
    },
];

  

  // const fetchSublinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log("Printing Sublinks result:", result);
  //     setSubLinks(result.data.data);
  //   } catch (error) {
  //     console.log("Could not fetch the category list");
  //   }
  // };

  // useEffect(() => {
  //   fetchSublinks();
  // }, []);

  const location = useLocation();

  return (
    <div className=" flex flex-row h-14 border-b-[1px] border-b-gray-600 items-center justify-center">
      <div className=" flex max-w-maxContent items-center justify-between w-10/12">
        <div>
          <Link to={"/"}>
            <img src={logo} width={160} height={42} loading="lazy"></img>
          </Link>
        </div>

        <nav>
          <ul className="flex flex-row gap-6 ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" text-white relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <MdOutlineKeyboardArrowDown />
                    <div
                      className="invisible absolute left-[50%]  top-[50%] z-50 
                     translate-x-[-49%] translate-y-[40%]
                                flex flex-col rounded-md bg-gray-50 p-4 text-gray-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]"
                    >
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-gray-50"
                      >

                      </div>
                      {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={subLink.link} key={index}>
                                                    <p className="">{subLink.title}</p>
                                                </Link>
                                            ) )
                                    ) : (<span ></span>)
                                }

                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`  ${
                      location.pathname === link.path
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className="hidden md:flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative pr-2">
              <AiOutlineShoppingCart className="text-2xl text-gray-100 " />
              {totalItems > 0 && (
                <span className=" absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border  border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
