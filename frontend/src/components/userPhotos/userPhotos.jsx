import { useEffect, useState } from "react";
import UserList from "../userList/userList";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

const Banner = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8081/user/${id}`);
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();

    const fetchUserPhotos = async () => {
      try {
        const response = await fetch(`http://localhost:8081/photoOfUser/${id}`);
        const userPhotos = await response.json();
        setUserPhotos(userPhotos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPhotos();
  }, [id]);

  if(userPhotos.length) {
    return (
      <div className="px-1 lg:px-1 bg-teal-100 flex items-center">
        <div className="flex w-full flex-col md:flex-row justify-between items-center py-10">
          {/* left side*/}
          <div className=" md:w-1/4 ">
            <UserList />
          </div>
  
          {/* right side*/}
          <div className=" md:w-4/5 space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Photos of{" "}
              <span className="text-red-600">
                {user.first_name} {user.last_name}
              </span>
            </h1>
            {userPhotos.map((photo) => (
              <div key={photo.id} className="w-full">
                <img
                      src={`/public/images/${photo.file_name}`}
                      alt={photo.title}
                      className="w-300 h-450 rounded-full"
                    />
                  <p className="text-left">Comment: </p>
                 {photo.comments&&photo.comments.map((c) => (
                    <Card key={c.id} className="w-full">
                      <div className="p-4">
                        <h1 className="text-2xl text-gray-6000">
                          {c.comment}
                        </h1>
                        <p className="text-gray-600 font-bold mb-2">
                          {" "}
                          On: {c.date_time}
                        </p>
                      </div>
                    </Card>
                  ))}
                  {photo.comments.length === 0? <p className="text-center">No comment</p>: null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div> Loading... </div>
    );
  }
}

export default Banner;
