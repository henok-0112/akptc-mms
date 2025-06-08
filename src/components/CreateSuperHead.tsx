import { PrimaryTextArea, PrimaryTextField } from "./TextFields";
import Logo from "../assets/logo.png";
import { PrimaryButton, RadioButton } from "./ui/Buttons";
import FormContainer from "./FormContainer";
import PrimaryDropDown from "./DropDown";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Container from "./Container";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import InitializationController from "../controllers/initializationController";
import { isAxiosError } from "axios";

type FormData = {
  full_name: string;
  username: string;
  gender: string;
  department: number | null;
  password: string;
  securityQuestion: number | null;
  securityAnswer: string;
};

type CreateSuperHeadProps = {
  initialize: Dispatch<SetStateAction<boolean>>;
  departments: Array<{ id: number; value: string }>;
  exists: boolean;
};

const CreateSuperHead = ({
  initialize,
  departments,
  exists = false,
}: CreateSuperHeadProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] =
    useState(null);
  const securityQuestions = [
    { id: 1, value: "What is your pet's name" },
    { id: 2, value: "name" },
    { id: 3, value: "country" },
  ];

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const handlePasswordVisiblity = () => {
    setVisible(!visible);
  };

  const handleCreateSuperHead = async (data: FormData) => {
    try {
      setLoading(true);
      await InitializationController.createSuperHead({
        full_name: data.full_name,
        username: data.username,
        gender: data.gender,
        department: data.department!,
        password: data.password,
        securityQuestion: data.securityQuestion!,
        securityAnswer: data.securityAnswer,
      });
      reset();
      toast.success(
        <SuccessToast message="Super Head Successfully created!" />
      );
      await InitializationController.initialize();
      setLoading(false);
      initialize(true);
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        toast.error(<ErrorToast message={err.response?.data.detail} />);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("department", selectedDepartment);
    trigger("department");
  }, [selectedDepartment]);

  useEffect(() => {
    setValue("securityQuestion", selectedSecurityQuestion);
    trigger("securityQuestion");
  }, [selectedSecurityQuestion]);

  const handleSuperHeadExists = async () => {
    setLoading(true);
    await InitializationController.initialize();
    initialize(true);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    if (exists) {
      handleSuperHeadExists();
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit(handleCreateSuperHead)}>
      <FormContainer
        logo={Logo}
        alt="Akaki Polytechnic Collage"
        title="Create Super Head"
      >
        <PrimaryTextField
          placeholder="Enter your full name here....."
          id="full_name"
          {...register("full_name", { required: "Full Name is Required." })}
          label="Full Name"
          type="text"
        />
        {errors.full_name && (
          <p className="text-red-500 ml-2">{errors.full_name.message}</p>
        )}
        <PrimaryTextField
          placeholder="Enter your username here....."
          id="username"
          {...register("username", { required: "Username is Required." })}
          label="Username"
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 ml-2">{errors.username.message}</p>
        )}
        <label className=" font-bold text-xl ml-5 text-white">Gender</label>
        <div className="flex justify-around">
          <RadioButton
            id="male"
            {...register("gender", { required: "Gender is Required." })}
            label="Male"
            value="male"
          />
          <RadioButton
            id="female"
            {...register("gender", { required: "Gender is Required." })}
            label="Female"
            value="female"
          />
        </div>

        {errors.gender && (
          <p className="text-red-500 ml-2">{errors.gender.message}</p>
        )}
        <PrimaryDropDown
          id="department"
          label="Department"
          {...register("department", {
            validate: (value) => value !== null || "Department is required.",
          })}
          choices={departments}
          value={selectedDepartment === null ? 0 : selectedDepartment}
          setValue={setSelectedDepartment}
        />
        {errors.department && (
          <p className="text-red-500 ml-2">{errors.department.message}</p>
        )}
        <PrimaryTextField
          id="password"
          label="Password"
          type={visible ? "text" : "password"}
          placeholder="Enter your password here....."
          {...register("password", {
            required: "Password is Required.",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
            },
          })}
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
        <PrimaryDropDown
          id="securityQuestion"
          label="Security Question"
          {...register("securityQuestion", {
            validate: (value) =>
              value !== null || "Security Question is required.",
          })}
          choices={securityQuestions}
          value={
            selectedSecurityQuestion === null ? 0 : selectedSecurityQuestion
          }
          setValue={setSelectedSecurityQuestion}
        />

        {errors.securityQuestion && (
          <p className="text-red-500 ml-2">{errors.securityQuestion.message}</p>
        )}

        <PrimaryTextArea
          id="securityAnswer"
          {...register("securityAnswer", {
            required: "Security Answer is Required.",
          })}
          label="Security Answer"
          placeholder="Enter your answer here......"
        />
        {errors.securityAnswer && (
          <p className="text-red-500 ml-2">{errors.securityAnswer.message}</p>
        )}
        <PrimaryButton type="submit">Create Super Head</PrimaryButton>
      </FormContainer>
    </form>
  );
};

export default CreateSuperHead;
