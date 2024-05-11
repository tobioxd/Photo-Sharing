import background from "../../assets/background/img.jpg";

const Banner = () => {
  return (
    <div>
      <div className="px-1 lg:px-1 bg-red-100 flex items-center justify-center mt-20 text-center">
      <div className="flex w-full flex-col md:flex-row justify-center items-center py-10">
        {/* right side*/}
        <div className=" md:w-4/5 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to my Photo Sharing App
          </h1>
        </div>
      </div>
    </div>
    <div>
        <img src={background} alt="" className="h-screen w-screen object-cover" />
      </div>
    </div>
  );
};

export default Banner;