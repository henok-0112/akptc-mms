import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <CircleLoader size={70} color="#ffffff" />
      <p className="text-white z-100 font-bold mt-5 text-2xl">Loading...</p>
    </div>
  );
};

export default Loader;
