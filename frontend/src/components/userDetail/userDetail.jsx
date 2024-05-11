import { useState, useEffect } from "react";
import UserList from "../userList/userList";
import { useParams } from "react-router-dom";
import PhotoImage from "./PhotoImage";

const Banner = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${id}`
        );
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/photos/blog/${id}`
        );
        const photos = await response.json();
        setPhotos(photos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchPhotos();
  }, [id]);

  return (
    <div className="px-1 lg:px-1 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center py-10">
        {/* left side*/}
        <div className=" md:w-1/4 mb-40 ">
          <UserList />
        </div>

        {/* right side*/}
        <div className="md:w-3/5 right-20 p-5 mx-auto bg-white rounded-xl shadow-md mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Infor of user{" "}
            <span className="text-red-600 mb-40">{user.name}</span>
          </h1>
          <div className="ml-20 h-[300px] overflow-auto">
            <div className="text-left mx-auto mt-4 text-xl">
              <p className="text-gray-600 font-bold mb-2">
                Name: <span className="text-black">{user.name}</span>
              </p>
              <p className="text-gray-600 font-bold mb-2">
                Description:{" "}
                <span className="text-black">{user.description}</span>
              </p>
              <p className="text-gray-600 font-bold mb-2">
                Location: <span className="text-black">{user.location}</span>
              </p>
              <p className="text-gray-600 font-bold mb-2">
                Occupation:{" "}
                <span className="text-black">{user.occupation}</span>
              </p>
            </div>
          </div>
          <div>
            <PhotoImage photos={photos} headline={`Photos of ${user.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
