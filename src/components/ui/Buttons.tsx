import {
  forwardRef,
  useEffect,
  useState,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router";
import useScreenSize from "../../hooks/useScreenSize";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};

const PrimaryButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={
        "px-10 py-3 rounded-full text-xl shadow-xl bg-green-400/50 text-black cursor-pointer font-bold " +
        " " +
        className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const DangerButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={
        "px-10 py-3 rounded-full text-xl shadow-xl bg-red-500 text-black cursor-pointer font-bold " +
        " " +
        className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

type LinkButtonProps = {
  className?: string;
  link: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
};

const PrimaryLinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({
  children,
  link,
  className,
}) => {
  const { isDesktop } = useScreenSize();
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `px-10 py-3 rounded-full text-xl shadow-xl cursor-pointer font-bold ${
          isDesktop ? "w-full" : "max-w-100"
        } ${
          isActive
            ? "bg-green-400/50 text-black border-2 border-green-400/50"
            : "border-2 border-black text-black hover:bg-green-400/50 hover:border-green-400/50 hover:text-black transition-all"
        }` +
        " " +
        className
      }
    >
      {children}
    </NavLink>
  );
};

const DangerLinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({
  children,
  link,
  className,
  onClick,
}) => {
  const { isDesktop } = useScreenSize();
  return (
    <NavLink
      onClick={onClick}
      to={link}
      className={({ isActive }) =>
        `px-10 py-3 rounded-full text-xl shadow-xl cursor-pointer font-bold ${
          isDesktop ? "w-full" : "max-w-100"
        } ${
          isActive
            ? "bg-red-500 text-black border-2 border-red-500"
            : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-black transition-all"
        }` +
        " " +
        className
      }
    >
      {children}
    </NavLink>
  );
};

type DropdownLinkButtonProps = {
  className?: string;
  links: Array<{ icon: ReactNode; link: string; title: string }>;
};

const DropdownLinkButton: React.FC<
  PropsWithChildren<DropdownLinkButtonProps>
> = ({ children, links, className }) => {
  const { isDesktop } = useScreenSize();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setActive(open);
  }, [open]);
  return (
    <div>
      <button
        className={`px-10 py-3 text-xl shadow-xl cursor-pointer ${
          isDesktop ? "w-full" : "max-w-100"
        } font-bold rounded-full flex gap-4 justify-evenly items-center mb-2 ${className} ${
          active
            ? "bg-green-400/50 text-black border-2 border-green-400/50"
            : "border-2 border-black text-black duration-500 hover:bg-green-400/50 hover:border-green-400/50 hover:text-black transition-all"
        }`}
        onClick={() => setOpen(!open)}
      >
        {children}
        <FaChevronDown
          className={`transition-all duration-500 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`grid ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-all duration-1000 ${isDesktop ? "w-full" : "max-w-100"}`}
      >
        <div
          className={`overflow-hidden  rounded-2xl bg-white/50 px-3 backdrop-blur-sm flex flex-col gap-2 transition-all duration-1000 ${
            open
              ? "py-3 border border-white/50"
              : "py-0 border-none border-white/50"
          }`}
        >
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }) => {
                return (
                  `px-10 py-3 text-xl rounded-xl shadow-xl cursor-pointer font-bold flex gap-4 justify-evenly items-center ${
                    isActive
                      ? "bg-green-400/50 text-black border-2 border-green-400/50"
                      : "border-2 border-green-400/50 text-black/50 hover:bg-green-400/50 hover:text-black transition-all"
                  }` +
                  " " +
                  className
                );
              }}
            >
              {link.icon} {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

type RadioButtonProps = {
  name: string;
  id: string;
  value: string;
  label: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ name, id, value, label, onBlur, onChange }, ref) => {
    return (
      <div>
        <input
          type="radio"
          name={name}
          id={id}
          ref={ref}
          className="hidden peer outline-none"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="flex items-center gap-3 text-black after:shadow-md before:shadow-md text-2xl before:w-7 before:h-7 before:rounded-full before:bg-white/50 before:border before:border-white/70 before:content-[''] before:block after:w-4 after:h-4 after:content-[''] after:rounded-full after:bg-green-500/50 after:absolute relative cursor-pointer before:backdrop-blur-lg after:left-[6px] after:scale-0 after:transition-all peer-checked:after:scale-100"
        >
          {label}
        </label>
      </div>
    );
  }
);

export {
  PrimaryButton,
  DangerButton,
  DangerLinkButton,
  RadioButton,
  PrimaryLinkButton,
  DropdownLinkButton,
};
