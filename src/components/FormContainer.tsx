import type { PropsWithChildren } from "react";
import type React from "react";
import Container from "./Container";

type FormContainerProps = {
  logo: string;
  title: string;
  alt: string;
};

const FormContainer: React.FC<PropsWithChildren<FormContainerProps>> = ({
  children,
  logo,
  title,
  alt,
}) => {
  return (
    <div className="bg-transparent h-screen p-5 flex items-center justify-center">
      <Container className="w-full h-min min-h-[200px] max-w-[400px] max-h-9/12  flex p-6 flex-col gap-2 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center gap-5 justify-center">
          <img src={logo} alt={alt} className="w-15 sm:w-20" />
          <h1 className="text-2xl text-center sm:text-4xl text-white">
            {title}
          </h1>
        </div>
        <hr className="text-white/70" />
        {children}
      </Container>
    </div>
  );
};

export default FormContainer;
