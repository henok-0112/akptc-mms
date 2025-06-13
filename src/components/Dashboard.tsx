import {
  FaBars,
  FaBriefcase,
  FaCaretDown,
  FaGraduationCap,
  FaIdBadge,
  FaLanguage,
  FaTimes,
  FaUser,
  FaUserLock,
  FaUserPlus,
} from "react-icons/fa";
import Logo from "../assets/logo.png";
import SideNav from "./SideNav";
import {
  DangerButton,
  DropdownButton,
  DropdownLinkButton,
  PrimaryLinkButton,
} from "./ui/Buttons";
import { useEffect, useState, type PropsWithChildren } from "react";
import Container from "./Container";
import { FaEllipsisVertical, FaPersonChalkboard } from "react-icons/fa6";
import useScreenSize from "../hooks/useScreenSize";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router";
import { useOverlay } from "../contexts/OverlayContext";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC<PropsWithChildren> = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const { isDesktop } = useScreenSize();
  const { user, logout } = useAuth();
  const { open, overlayChildren, loadingOverlay, setOpen } = useOverlay();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-3 h-screen grid grid-cols-[350px_1fr] grid-rows-[80px_1fr] gap-3">
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
          <img src={Logo} alt={t("akptcLogo")} className="w-15" />
          <h1 className=" font-bold text-shadow-2xs text-lg">
            {t("akptcmms")}
          </h1>
        </div>

        {isDesktop ? (
          <div className="flex gap-2 items-center">
            <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="am">Amharic</option>
              <option value="om">Afan Oromo</option>
            </select>
            <p className="text-xl font-bold">
              {t("welcome", { user: user?.name })}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setOpenSideNav(!openSideNav)}
            className="outline-none before:content-[''] before:w-full before:h-full relative before:absolute before:bg-green-400/50 before:left-0 p-2 flex justify-center items-center before:rounded-md hover:text-white before:scale-0 before:transition-all hover:before:scale-100"
          >
            <FaEllipsisVertical
              size={25}
              className="cursor-pointer  transition-all"
            />
          </button>
        )}
      </header>
      <SideNav className=" col-start-1 col-end-2 z-0" open={openSideNav}>
        <DropdownLinkButton
          links={[
            {
              icon: <FaBriefcase size={25} />,
              link: "/dashboard/administrative-staff",
              title: t("administrativeStaff"),
            },
            {
              icon: <FaPersonChalkboard size={25} />,
              link: "/dashboard/trainer",
              title: t("trainer"),
            },
            {
              icon: <FaGraduationCap size={25} />,
              link: "/dashboard/trainee",
              title: t("trainee"),
            },
            {
              icon: <FaUser size={25} />,
              link: "/dashboard/guest",
              title: t("guest"),
            },
          ]}
        >
          <FaIdBadge size={25} /> <span>{t("client")}</span>
        </DropdownLinkButton>
        <PrimaryLinkButton
          link="/dashboard/guards"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUserLock size={25} />{" "}
          <span className="flex-1 text-center">{t("guard", { count: 2 })}</span>
        </PrimaryLinkButton>
        <PrimaryLinkButton
          link="/dashboard/register"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUserPlus size={25} />{" "}
          <span className="flex-1 text-center">{t("registerClient")}</span>
        </PrimaryLinkButton>
        <PrimaryLinkButton
          link="/dashboard/guards/register"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUserPlus size={25} />{" "}
          <span className="flex-1 text-center">{t("registerGuard")}</span>
        </PrimaryLinkButton>
        {/* <PrimaryLinkButton
          link="/dashboard/register"
          className="flex gap-4 justify-evenly items-center"
        >
          <FaUserPlus size={25} />{" "}
          <span className="flex-1 text-center">Edit Profile</span>
        </PrimaryLinkButton> */}
        <DangerButton type="button" className="w-full" onClick={handleLogout}>
          {t("logout")}
        </DangerButton>
      </SideNav>
      <Container className="z-10 overflow-y-auto relative max-w-full col-start-2 col-end-3 p-4">
        {open && (
          <div className="w-full h-full absolute flex justify-center items-center left-0 top-0 bg-black/50  z-100">
            <FaTimes
              size={40}
              color="#FFFFFF"
              className="absolute right-5 top-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            {loadingOverlay ? <Loader /> : overlayChildren}
          </div>
        )}
        <Outlet />
      </Container>
    </div>
  );
};

export default Dashboard;
