import React, { useState, useEffect } from "react";
import UserList from "./userList/userList";
import { useParams } from "react-router-dom";
import UserComment from "./userComment/userComment";
import NewComment from "./userComment/newComment";
import { Link } from "react-router-dom";

const SinglePhoto = () => {
  const { id } = useParams();
  const [userphoto, setPhoto] = useState({});

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/photos/${id}`
        );
        const userphoto = await response.json();
        setPhoto(userphoto);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhoto();
  }, [id]);

  if (!userphoto.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="px-1 lg:px-1 flex items-center">
        <div className="flex w-full flex-col md:flex-row justify-between items-center py-10">
          {/* left side*/}
          <div className=" md:w-1/4 mb-80 mt-[-200px]">
            <UserList />
          </div>

          {/* right side*/}
          <div className="md:w-3/5 right-20 p-5 mx-auto bg-white rounded-xl shadow-md mt-20 ">
            <div className="flex">
              <Link
                to={`/user/${userphoto.user._id}`}
                className="flex items-center"
              >
                <div className="w-10 h-10 text-center rounded-full">
                  <img
                    src={`/public/images/${userphoto.user.photo}`}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <span className="p-2 font-bold">{userphoto.user.name}</span>
              </Link>
              <span className="flex justify-center mt-2">
                  {new Date(userphoto.date_time).toLocaleDateString()}{" "}
                  {new Date(userphoto.date_time).toLocaleTimeString()}
                </span>
            </div>
            <div className="flex justify-center">
              <img
                src={`/public/images/${userphoto.file_name}`}
                alt=""
                className="max-w-[400px] max-h-[600px] rounded-lg m-2"
              />
            </div>
            <div className="px-1 lg:px-1 flex">
              <NewComment />
            </div>
            <div className="px-1 lg:px-1 flex ">
              <UserComment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePhoto;
