import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon/icon.jpg";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setIsSticky(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  return (
    <div className="fixed w-full z-100">
      <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
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

          {/* nav links for large device */}

          {/*login*/}
          <Link
            onClick={handleLogout}
            className="ml-auto text-base text-black uppercase cursor-pointer hover:text-red-700"
          >
            LogOut
          </Link>
        </div>
      </nav>
    </header>
    </div>
  );
};

export default Navbar;
