import {
  FaBars,
  FaCaretDown,
  FaTimes,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import Logo from "../assets/logo.png";
import SideNav from "./SideNav";
import { DangerButton, PrimaryLinkButton } from "./ui/Buttons";
import { useEffect, useState, type PropsWithChildren } from "react";
import Container from "./Container";
import { FaEllipsisVertical } from "react-icons/fa6";
import useScreenSize from "../hooks/useScreenSize";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router";

const Dashboard: React.FC<PropsWithChildren> = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const { isDesktop } = useScreenSize();
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="relative z-10 p-3 h-screen grid grid-cols-[350px_1fr] grid-rows-[80px_1fr] gap-3">
      <header
        className={`px-2 py-1 col-span-2 bg-white/30 border border-white/50 gap-5 rounded-2xl flex items-center backdrop-blur-sm ${
          isDesktop ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center gap-2">
          {!isDesktop ? (
            <button
              onClick={() => setOpenSideNav(!openSideNav)}
              className={`outline-none before:content-[''] before:w-full before:h-full relative before:absolute before:bg-green-400/50 before:left-0 p-2 flex  items-center before:rounded-md hover:text-white before:scale-0 before:transition-all hover:before:scale-100 justify-center`}
            >
              {openSideNav ? (
                <FaTimes
                  size={25}
                  className="cursor-pointer z-10 transition-all"
                />
              ) : (
                <FaBars
                  size={25}
                  className="cursor-pointer z-10 transition-all"
                />
              )}
            </button>
          ) : (
            <></>
          )}
          <img
            src={Logo}
            alt="Akaki Polytechnic Collage Logo"
            className="w-15"
          />
          <h1 className=" font-bold text-shadow-2xs text-lg">
            Akaki Polytechnic Collage Material Management System
          </h1>
        </div>
        <DangerButton type="button" onClick={handleLogout}>
          Logout
        </DangerButton>
        {isDesktop ? (
          <div className="flex gap-2 items-center">
            <p className="text-xl">Welcome, {user?.name}</p>
            <button
              onClick={() => setOpenSideNav(!openSideNav)}
              className="outline-none before:content-[''] before:w-full before:h-full relative before:absolute before:bg-green-400/50 before:left-0 p-2 flex justify-center items-center before:rounded-md hover:text-white before:scale-0 before:transition-all hover:before:scale-100"
            >
              <FaCaretDown
                size={25}
                className="cursor-pointer z-10 transition-all"
              />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setOpenSideNav(!openSideNav)}
            className="outline-none before:content-[''] before:w-full before:h-full relative before:absolute before:bg-green-400/50 before:left-0 p-2 flex justify-center items-center before:rounded-md hover:text-white before:scale-0 before:transition-all hover:before:scale-100"
          >
            <FaEllipsisVertical
              size={25}
              className="cursor-pointer z-10 transition-all"
            />
          </button>
        )}
      </header>
      <SideNav className=" col-start-1 col-end-2" open={openSideNav}>
        <PrimaryLinkButton
          link="/dashboard/administrative-staff"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUser size={25} />{" "}
          <span className="flex-1 text-center">Adminsitrative Staffs</span>
        </PrimaryLinkButton>
        <PrimaryLinkButton
          link="/dashboard/register"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUserPlus size={25} />{" "}
          <span className="flex-1 text-center">Register Client</span>
        </PrimaryLinkButton>
      </SideNav>
      <Container className=" overflow-y-auto max-w-full col-start-2 col-end-3 p-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default Dashboard;
