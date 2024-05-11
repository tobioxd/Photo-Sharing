import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon/icon.jpg";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const profilepic = JSON.parse(user).photo;
  const userId = JSON.parse(user)._id;
  const curname = JSON.parse(user).name;
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenuUser = () => {
    setIsMenuUserOpen(!isMenuUserOpen);
  };

  useEffect(() => {
    setIsSticky(true);
  }, []);


  //navUserItems here
  const navUserItems = [
    {
      label: "Profile",
      path: `/user/${userId}`,
    },
    {
      label: "update info",
      path: `updateinfo`,
    },
    {
      label: "Logout",
      path: "/logout",
    },
  ];

  return (
    <div className="fixed w-full z-100">
      <header className="w-full bg-transparent fixed top-0 right-0 transition-all ease-in duration-300">
        <nav
          className={`py-5 lg:px-24 px-4 ${
            isSticky ? "sticky top-0 left-0 right-0 bg-sky-300" : ""
          }`}
        >
          <div className="flex justify-between items-center text-base gap-8">
            {/* logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-sky-600 flex items-center gap-2"
            >
              <img src={icon} alt="icon" className="w-10 h-10" />
              Photo Sharing App
            </Link>


            <div className="flex items-center ml-auto">
              {/*userprofile*/}
              <span className="font-bold">Hello <span className="text-blue-700">{curname}</span></span>
              <img
                src={`/public/images/${profilepic}`}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer "
                onClick={toggleMenuUser}
              />

              {/* navItemUser*/}
              <div
                className={`space-y-4 px-4 mt-16 ml-20 py-5 bg-sky-400 ${
                  isMenuUserOpen ? "block fixed top-0 " : "hidden"
                } `}
              >
                {navUserItems.map((item, index) => (
                  <ul key={index}>
                    <Link
                      to={item.path}
                      className="block text-base text-white uppercase cursor-pointer hover:text-black-700"
                    >
                      {item.label}
                    </Link>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
