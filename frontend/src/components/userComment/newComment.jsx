import React, { useState } from "react";
import { useParams } from "react-router-dom";

const NewComment = () => {
  const { id } = useParams();
  const curuser = localStorage.getItem("user");
  const userid = JSON.parse(curuser)._id;
  const [newReview, setnewReview] = useState(null);

  const handlenewChange = (event) => {
    setnewReview(event.target.value);
  };

  const handleAddReview = (event) => {
    event.preventDefault();
    const reviewData = {
      text: newReview,
      photo: id,
      user: userid,
    };

    //send data to the server
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setnewReview(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.location.href = `/photos/${id}`;
  };

  return (
    <div className="md:w-4/5 right-20 p-5 mx-auto">
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600">
        Comment
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          <input
            type="text"
            placeholder={"Write your comment here"}
            value={newReview}
            onChange={handlenewChange}
            className="p-4 border-1[px] border-zinc-400 text-lg font-sans"
          />
          <div className="flex justify-end">
            <button
              className="bg-sky-500 text-white hover:bg-blue-600 transition-all ease-in duration-200 p-2 text-xl mt-2"
              onClick={handleAddReview}
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
