import BannerGuest from "./BannerGuest";
import BannerUser from "./BannerUser";

const Banner = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return (
      <BannerUser />
    );
  } else {
    return (
      <BannerGuest />
    );
  }
  
};

export default Banner;