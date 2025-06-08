import logo from "../assets/image.png";
import down from "../assets/icons8_scroll_down.svg";
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import useScreenSize from "../../hooks/useScreenSize";
import TeacherDashboard from "./TeacherDashboard";

function Login() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    //TODO: login validation logic
    setIsLoggedIn(true);
  }

  if (isLoggedIn) return <TeacherDashboard />;

  function handleDarkMode(event?: React.MouseEvent) {
    event?.preventDefault();
    setIsDarkMode((prev) => !prev);
  }

  const layoutProps = {
    isDarkMode,
    handleDarkMode,
    handleLogin,
  };

  if (isMobile) return <MobileLayout {...layoutProps} />;
  if (isTablet) return <TabletLayout {...layoutProps} />;
  if (isDesktop) return <DesktopLayout {...layoutProps} />;

  return <p>Loading layout...</p>;
}

function DesktopLayout({
  isDarkMode,
  handleDarkMode,
  handleLogin,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
  handleLogin: (event: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen overflow-hidden text-gray-500">
      <div className="navbar bg-green-700 shadow-sm flex justify-end items-center px-4">
        <span onClick={handleDarkMode}>
          {isDarkMode ? (
            <IoMoon className="text-white cursor-pointer h-5 w-5" />
          ) : (
            <IoMoonOutline className="text-black cursor-pointer h-5 w-5" />
          )}
        </span>
      </div>
      <div className="bg-blue-50 p-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-[500px] w-[900px] flex rounded-2xl border border-gray-200 shadow-2xl p-2 gap-4">
          <div className="shadow-md flex h-4/5 self-center justify-center items-center p-4 gap-10">
            <img src={logo} alt="logo" className="h-50 w-60" />
          </div>
          <div className="h-4/5 self-center w-0.5  bg-green-900"></div>
          <div className="flex flex-col justify-center items-center shadow-lg gap-8 h-4/5 self-center w-4/5">
            <span className="uppercase text-3xl font-poppins font-semibold">
              login
            </span>
            <div className="flex flex-col shadow-sm w-4/5 p-5">
              <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <div className="relative">
                  <select
                    name="department"
                    id="department"
                    className="border-1 rounded-sm border-gray-400 font-normal text-sm p-3 w-full appearance-none bg-transparent focus:border-green-700 focus:outline-none"
                  >
                    <option value="" disabled selected>
                      Select Department
                    </option>
                    <option value="1">Garment</option>
                    <option value="2">Construction</option>
                    <option value="3">ICT/WDDBA</option>
                    <option value="4">ICT/HNS</option>
                    <option value="5">Metal</option>
                    <option value="6">Wood</option>
                    <option value="7">Drafting</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <img src={down} alt="" className="h-5 w-5" />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Username"
                  className="border-1 rounded-sm border-gray-400 text-sm p-2 font-normal w-full focus:border-green-700 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border-1 rounded-sm border-gray-400 font-normal text-sm p-2 w-full focus:border-green-700 focus:outline-none"
                />
                <button className="font-poppins text-sm cursor-pointer font-medium bg-green-700 text-white w-20 rounded-sm p-2 mt-2 self-end hover:bg-green-800 transition-colors">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLayout({
  isDarkMode,
  handleDarkMode,
  handleLogin,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
  handleLogin: (event: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen overflow-hidden text-gray-500">
      <div className="navbar bg-green-700 shadow-sm flex justify-end items-center px-4">
        <span onClick={handleDarkMode}>
          {isDarkMode ? (
            <IoMoon className="text-white cursor-pointer h-5 w-5" />
          ) : (
            <IoMoonOutline className="text-black cursor-pointer h-5 w-5" />
          )}
        </span>
      </div>
      <div className="bg-blue-50 p-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-full w-[350px] flex flex-col rounded-2xl border border-gray-200 shadow-2xl p-2 gap-3">
          <div className="flex flex-row justify-center items-center border-b-1 border-b-green-800 shadow-md p-5 gap-8">
            <div>
              <img src={logo} alt="logo" className="h-14 w-14" />
            </div>
            <h2 className="uppercase font-poppins text-black text-2xl">
              log in
            </h2>
          </div>
          <div className="flex flex-col p-2">
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <div className="relative">
                <select
                  name="department"
                  id="department"
                  className="border-1 rounded-sm border-gray-400 font-normal text-sm p-3 w-80 appearance-none bg-transparent focus:border-green-700 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Department
                  </option>
                  <option value="1">Garment</option>
                  <option value="2">Construction</option>
                  <option value="3">ICT/WDDBA</option>
                  <option value="4">ICT/HNS</option>
                  <option value="5">Metal</option>
                  <option value="6">Wood</option>
                  <option value="7">Drafting</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <img src={down} alt="" className="h-5 w-5" />
                </div>
              </div>

              <input
                type="text"
                placeholder="Username"
                className="border-1 rounded-sm border-gray-400 text-sm p-2 font-normal w-80 focus:border-green-700 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-1 rounded-sm border-gray-400 font-normal text-sm p-2 w-80 focus:border-green-700 focus:outline-none"
              />
              <button className="font-poppins text-sm cursor-pointer font-medium bg-green-700 text-white w-20 rounded-sm p-2 mt-2 self-end hover:bg-green-800 transition-colors">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletLayout({
  isDarkMode,
  handleDarkMode,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
}) {
  return (
    <div className="min-h-screen overflow-hidden text-gray-500">
      <div className="navbar bg-green-700 shadow-sm flex justify-end items-center px-4">
        <span onClick={handleDarkMode}>
          {isDarkMode ? (
            <IoMoon className="text-white cursor-pointer h-5 w-5" />
          ) : (
            <IoMoonOutline className="text-black cursor-pointer h-5 w-5" />
          )}
        </span>
      </div>
      <div className="bg-blue-50 p-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-[450px] w-[550px] flex flex-col rounded-2xl border border-gray-200 shadow-2xl p-2 gap-3">
          <div className="border-b-1 border-b-green-800 shadow-md flex justify-center items-center p-4 gap-10">
            <img src={logo} alt="logo" className="h-35 w-35" />
            <span className="uppercase text-3xl font-poppins font-semibold">
              login
            </span>
          </div>
          <div className="flex flex-col p-5">
            <form className="flex flex-col gap-5">
              <div className="relative">
                <select
                  name="department"
                  id="department"
                  className="border-1 rounded-sm border-gray-400 font-normal text-sm p-3 w-full appearance-none bg-transparent focus:border-green-700 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select Department
                  </option>
                  <option value="1">Garment</option>
                  <option value="2">Construction</option>
                  <option value="3">ICT/WDDBA</option>
                  <option value="4">ICT/HNS</option>
                  <option value="5">Metal</option>
                  <option value="6">Wood</option>
                  <option value="7">Drafting</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <img src={down} alt="" className="h-5 w-5" />
                </div>
              </div>

              <input
                type="text"
                placeholder="Username"
                className="border-1 rounded-sm border-gray-400 text-sm p-2 font-normal w-full focus:border-green-700 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-1 rounded-sm border-gray-400 font-normal text-sm p-2 w-full focus:border-green-700 focus:outline-none"
              />
              <button className="font-poppins text-sm cursor-pointer font-medium bg-green-700 text-white w-20 rounded-sm p-2 mt-2 self-end hover:bg-green-800 transition-colors">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
