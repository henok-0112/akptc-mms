import type React from "react";

type ContainerProps = {
  className?: string;
  onClick?: React.MouseEventHandler;
};

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={
        "bg-white/20 backdrop-blur-2xl border w-full h-full border-white/20 rounded-xl shadow-xl" +
        " " +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Container;
