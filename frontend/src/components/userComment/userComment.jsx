import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/comments/photo/${id}`
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
    
  }, [id]);

  if (comments.length === 0) {
    return (
      <div>
        <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600 ">
          Comments
        </span>
        <div className="flex justify-center items-center w-full h-64 bg-gray-200">
          <span className="text-lg font-bold">No comments found</span>
        </div>
      </div>
    );
  }

  comments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));


  return (
    <div className="md:w-4/5 right-20 p-5 mx-auto">
      <span className="flex flex-col w-full max-w-6xl mx-auto text-bold text-xl text-red-600 ">
        Comments
      </span>
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex flex-col bg-white-700 p-4 text-xl w-full"></div>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col bg-white-700 p-4 text-xl w-full"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={`/public/images/${comment.user.photo}`}
                    alt="user"
                    className="w-12 h-12 rounded-full cursor-pointer "
                    onClick={() => window.location.replace(`/user/${comment.user._id}`)}
                  />
                  <span className="ml-4 text-lg font-bold">
                    {comment.user.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">
                    {new Date(comment.date_time).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                  </span>
                </div>
              </div>
              <span style={{ fontFamily: "Segoe UI Historic, sans-serif" }}>
                {comment.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
