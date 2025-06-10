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
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();

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
      if (isAxiosError(error) && error.status === 403) {
        toast.error(<ErrorToast message={t("invalidCredentials")} />);
      } else if (error instanceof Error) {
        toast.error(<ErrorToast message={error.message} />);
      } else {
        toast.error(
          <ErrorToast message="Something went wrong, please try again!" />
        );
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  useEffect(() => {
    i18n.changeLanguage("om");
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <FormContainer alt={t("akptcLogo")} title={t("login")} logo={Logo}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <PrimaryTextField
          placeholder={t("input", { field: t("usernameSm") })}
          id="username"
          label={t("username")}
          {...register("username", {
            required: t("isRequired", { field: t("username") }),
          })}
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 ml-2">{errors.username.message}</p>
        )}
        <PrimaryTextField
          placeholder={t("input", { field: t("passwordSm") })}
          type={visible ? "text" : "password"}
          id="password"
          {...register("password", {
            required: t("isRequired", { field: t("password") }),
          })}
          label={t("password")}
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
          {t("forgetPasswordQ")}{" "}
          <Link to="/forgot-password" className="underline hover:text-black">
            {t("resetPassword")}
          </Link>
        </p>
        <PrimaryButton type="submit" className="w-min">
          {t("login")}
        </PrimaryButton>
      </form>
    </FormContainer>
  );
};

export default Login;
