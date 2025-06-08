import Container from "./Container";
import { FaArrowRotateRight } from "react-icons/fa6";

type TryAgainProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TryAgain = ({ onClick }: TryAgainProps) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-white font-bold text-2xl z-100 mb-2">
        Please Try Again
      </p>
      <Container
        className="max-w-15 max-h-15 flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        <FaArrowRotateRight size={30} className="text-white" />
      </Container>
    </div>
  );
};

export default TryAgain;
