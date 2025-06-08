import type { PropsWithChildren } from "react";
import useScreenSize from "../hooks/useScreenSize";

type SideNavProps = {
  className?: string;
  open: boolean;
};

const SideNav: React.FC<PropsWithChildren<SideNavProps>> = ({
  open = true,
  className,
  children,
}) => {
  const { isDesktop } = useScreenSize();
  return (
    <aside
      className={`bg-white/30 border-white/50 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 p-4 ${
        isDesktop ? "px-4 border" : open ? " px-4 border" : "px-0 border-none"
      } ${className}`}
    >
      <nav
        className={`flex flex-col gap-3 ${
          isDesktop ? "items-start" : "items-center"
        }`}
      >
        {children}
      </nav>
    </aside>
  );
};

export default SideNav;
