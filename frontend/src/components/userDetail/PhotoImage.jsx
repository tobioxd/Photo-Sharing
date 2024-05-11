import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import NewPhoto from "./newPhoto";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const PhotoImage = ({ headline, photos }) => {

  return (
    <div className="mb-10">
      <h2 className="text-5xl text-center font-bold text-black my-5">
        {headline}
      </h2>

      <div className="px-1 lg:px-1 flex">
        <NewPhoto />
      </div>

      {/* Swiper */}
      <div className="mt-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          initialSlide={0}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {Array.isArray(photos) &&
            photos.map((photo) => (
              <SwiperSlide key={photo._id}>
                <Link
                  to={`/photos/${photo._id}`}
                  className="flex flex-col items-center h-120g"
                >
                  <div className="">
                    <img
                      src={`/public/images/${photo.file_name}`}
                      alt=""
                      className="max-w-[400px] max-h-[600px] rounded-lg"
                    />
                  </div>
                </Link>
                <span className="flex justify-center font-bold">
                  {new Date(photo.date_time).toLocaleDateString()}{" "}
                  {new Date(photo.date_time).toLocaleTimeString()}
                </span>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoImage;
