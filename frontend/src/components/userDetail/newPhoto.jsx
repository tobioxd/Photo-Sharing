import React, { useState } from "react";
import { useParams } from "react-router-dom";

const NewPhoto = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"))._id;
  const [file, setFile] = useState(null);

  console.log(id, currentUser);

  const upload = () => {
    const formData = {
      file_name: file.name
    };

    console.log(formData);

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/photos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      window.location.reload();
  };

  if (id === currentUser) {
    return (
      <div className="flex justify-center items-center">
        <span>Add New Photo :</span>

        <div className="ml-4">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
};

export default NewPhoto;
