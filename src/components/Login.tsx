import Container from "./Container";
import { PrimaryTextField } from "./TextFields";
import Logo from "../assets/logo.png";
import { PrimaryButton } from "./ui/Buttons";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  const { user, login, loading, refresh } = useAuth();
  const navigate = useNavigate();

  const handlePasswordVisiblity = () => {
    setVisible(!visible);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleLogin = async (data: LoginForm) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });
      reset();
      if (response) {
        toast.success(<SuccessToast message="Login Successfull!" />);
        navigate("/dashboard");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(<ErrorToast message={error.response?.data.detail} />);
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(<ErrorToast message="Unknown error occured" />);
      }
    }
  };
  const refreshToken = async () => {
    try {
      const response = await refresh();
      console.log(response);
      if (response) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(<ErrorToast message={error.response?.data.detail} />);
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(<ErrorToast message="Unknown error occured" />);
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <FormContainer
      alt="Akaki Polytechnic Collage Logo"
      title="Login"
      logo={Logo}
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <PrimaryTextField
          placeholder="Enter username here....."
          id="username"
          label="Username"
          {...register("username", { required: "Username is Required." })}
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 ml-2">{errors.username.message}</p>
        )}
        <PrimaryTextField
          placeholder="Enter password here....."
          type={visible ? "text" : "password"}
          id="password"
          {...register("password", { required: "Password is Required." })}
          label="Password"
          suffixIcon={
            <Container
              onClick={handlePasswordVisiblity}
              className="cursor-pointer p-3 w-min"
            >
              {visible ? (
                <FaEyeSlash className="text-white text-2xl" />
              ) : (
                <FaEye className="text-white text-2xl " />
              )}
            </Container>
          }
        />

        {errors.password && (
          <p className="text-red-500 ml-2">{errors.password.message}</p>
        )}
        <p className="my-2 ml-2 text-white">
          Did you forget your password?{" "}
          <Link to="/forgot-password" className="underline hover:text-black">
            Reset Password
          </Link>
        </p>
        <PrimaryButton type="submit" className="w-min">
          Login
        </PrimaryButton>
      </form>
    </FormContainer>
  );
};

export default Login;
