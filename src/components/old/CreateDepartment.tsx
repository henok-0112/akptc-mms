import logo from "../assets/image.png";
import down from "../assets/icons8_scroll_down.svg";
import { useState } from "react";
import { IoMoon, IoMoonOutline } from "react-icons/io5";
// import useScreenSize from "../hooks/useScreenSize";

function CreateDepartment() {
  // const { isMobile, isTablet, isDesktop } = useScreenSize();
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleDarkMode(event?: React.MouseEvent) {
    event?.preventDefault();
    setIsDarkMode((prev) => !prev);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // TODO: handle department creation logic
    alert("Department created!");
  }

  const layoutProps = { isDarkMode, handleDarkMode, handleSubmit };

  // if (isMobile) return <MobileLayout {...layoutProps} />;
  // if (isTablet) return <TabletLayout {...layoutProps} />;
  // if (isDesktop) return <DesktopLayout {...layoutProps} />;
  return <p>Loading layout...</p>;
}

function DepartmentForm({
  handleSubmit,
  selectWidth = "w-full",
}: {
  handleSubmit: (event: React.FormEvent) => void;
  selectWidth?: string;
}) {
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="relative">
        <select
          name="department"
          id="department"
          className={`border border-gray-400 rounded-sm font-normal text-sm p-3 ${selectWidth} appearance-none bg-transparent focus:border-green-700 focus:outline-none`}
        >
          <option value="" disabled selected>
            Select Department Name
          </option>
          <option value="Garment">Garment</option>
          <option value="Construction">Construction</option>
          <option value="ICT/WDDBA">ICT/WDDBA</option>
          <option value="ICT/HNS">ICT/HNS</option>
          <option value="Metal">Metal</option>
          <option value="Wood">Wood</option>
          <option value="Drafting">Drafting</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <img src={down} alt="dropdown" className="h-5 w-5" />
        </div>
      </div>
      <textarea
        placeholder="Department Description"
        className="border border-gray-400 rounded-sm text-sm p-2 focus:border-green-700 focus:outline-none resize-none"
        rows={4}
      ></textarea>
      <button className="font-poppins text-sm font-medium bg-green-700 text-white w-28 rounded-sm p-2 mt-2 self-end hover:bg-green-800 transition-colors">
        Create
      </button>
    </form>
  );
}

function DesktopLayout({
  isDarkMode,
  handleDarkMode,
  handleSubmit,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
  handleSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen text-gray-500">
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
        <div className="w-[900px] flex rounded-2xl border border-gray-200 shadow-2xl p-4 gap-4">
          <div className="flex items-center justify-center p-4">
            <img src={logo} alt="logo" className="h-50 w-60" />
          </div>
          <div className="w-0.5 bg-green-900"></div>
          <div className="flex flex-col justify-center w-full px-6">
            <h2 className="text-3xl uppercase font-semibold font-poppins mb-4">
              Create Department
            </h2>
            <DepartmentForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletLayout({
  isDarkMode,
  handleDarkMode,
  handleSubmit,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
  handleSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen text-gray-500">
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
        <div className="w-[550px] flex flex-col rounded-2xl border border-gray-200 shadow-2xl p-4 gap-3">
          <div className="flex justify-center items-center gap-6 border-b border-green-800 pb-4">
            <img src={logo} alt="logo" className="h-20 w-20" />
            <h2 className="text-2xl uppercase font-semibold font-poppins">
              Create Department
            </h2>
          </div>
          <div className="mt-4 px-2">
            <DepartmentForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLayout({
  isDarkMode,
  handleDarkMode,
  handleSubmit,
}: {
  isDarkMode: boolean;
  handleDarkMode: (event?: React.MouseEvent) => void;
  handleSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen text-gray-500">
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
        <div className="w-[350px] flex flex-col rounded-2xl border border-gray-200 shadow-2xl p-4 gap-3">
          <div className="flex justify-center items-center gap-4 border-b border-green-800 pb-4">
            <img src={logo} alt="logo" className="h-14 w-14" />
            <h2 className="text-xl uppercase font-semibold font-poppins">
              Create Department
            </h2>
          </div>
          <div className="mt-4">
            <DepartmentForm handleSubmit={handleSubmit} selectWidth="w-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
