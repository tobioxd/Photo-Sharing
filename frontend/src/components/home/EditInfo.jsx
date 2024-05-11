import React, { useState } from "react";
import MyInfor from "./MyInfor";
import ChangePassword from "./ChangePassword";

const EditInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const profilepic = user.photo;
  const [file, setFile] = useState(null);
  const [Info, setInfo] = useState(true);
  const [ChangePass, setChangePass] = useState(false);

  const upload = () => {
    const formData = {
      photo: file.name,
    };

    console.log(formData);

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const data = new FormData();
    data.append("file", file);
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/upload`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    window.location.href = "/login";

    alert("Profile picture updated successfully, please login again");
  };

  const handleMyInfo = () => {
    setInfo(true);
    setChangePass(false);
  };

  const handleChangePass = () => {
    setInfo(false);
    setChangePass(true);
  };

  return (
    <div className="px-1 lg:px-1 flex items-center">
      <div className="flex w-full flex-col md:flex-row items-center py-40">
        <div className=" md:w-1/4 mb-40 mr-80 ml-40">
          <span className="font-bold">My Profile Picture</span>
          <div>
            <img src={`/public/images/${profilepic}`} alt="" />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={upload}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="mb-80 mr-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Edit Info</h1>
          <div className="flex flex-col items-left justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleMyInfo}
              type="button"
            >
              My Info
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleChangePass}
              type="button"
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="w-full">
          {Info && <MyInfor />}
          {ChangePass && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
