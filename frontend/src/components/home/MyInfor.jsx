import React, { useState, useEffect } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";

const MyInfor = () => {

    const curuser = JSON.parse(localStorage.getItem("user"));
    const userId = curuser._id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data using the id
        const fetchUser = async () => {
          try {
            const response = await fetch(
              import.meta.env.VITE_BACKEND_URL + `/api/v1/users/${userId}`
            );
            const data = await response.json();
            setUser(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUser();
      }, [userId]);
    
      if (!user) {
        return <div>Loading...</div>;
      }

      const { name, location, description, occupation } = user;

      console.log(name, location, description, occupation);


      const handleUpdateMe = (e) => {
        if (window.confirm("Are you sure you want to update your info?") === true) {
          e.preventDefault();
          const userData = {
            name: e.target.name.value,
            location: e.target.location.value,
            description: e.target.description.value,
            occupation: e.target.occupation.value,
          };
    
          //Send data to the server
          fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/updateMe", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      };

      return(
        <div className="w-full my-12">
          <h2 className="mb-8 text-3xl font-bold">Update Your Info </h2>
          <form
            className="flex flex-col flex-wrap gap-4"
            onSubmit={handleUpdateMe}
          >
            <div className="flex gap-8">
              {/*animename*/}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Your name"
                  required
                  type="text"
                  defaultValue={name}
                />
              </div>
            </div>

            <div className="flex gap-8">
              {/*location*/}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="location" value="Location" />
                </div>
                <TextInput
                  id="location"
                  placeholder="Your location"
                  required
                  type="location"
                  defaultValue={location}
                />
              </div>
            </div>

            <div>
              {/*description*/}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Textarea
                  id="description"
                  placeholder="Your description ..."
                  required
                  className="w-full"
                  row={4}
                  defaultValue={description}
                />
              </div>
            </div>

            <div className="flex gap-8">
              {/*occupation*/}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="occupation" value="Occupation" />
                </div>
                <TextInput
                  id="occupation"
                  placeholder="Your occupation"
                  required
                  type="text"
                  defaultValue={occupation}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4"
            >
              Update
            </button>
          </form>
        </div>
      );
}

export default MyInfor