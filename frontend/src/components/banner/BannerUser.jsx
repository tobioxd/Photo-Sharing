import React from "react";
import UserList from "../userList/userList";

const BannerUser = () => {
  return (
    <div className="fixed left-0 w-1/3 h-screen overflow-auto pt-10">
      <UserList />
    </div>
  );
};

export default BannerUser;
