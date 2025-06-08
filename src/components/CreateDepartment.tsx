import { PrimaryTextField, PrimaryTextArea } from "./TextFields";
import Logo from "../assets/logo.png";
import { PrimaryButton } from "./ui/Buttons";
import FormContainer from "./FormContainer";
import type { Swiper as SwiperClass } from "swiper";
import InitializationController from "../controllers/initializationController";
import { useForm } from "react-hook-form";
import Department from "../model/Department";
import { toast } from "react-toastify";
import { SuccessToast, ErrorToast } from "./Toasts";
import { useEffect } from "react";

type CreateDepartmentProps = {
  next?: React.RefObject<SwiperClass | undefined>;
  onDepartmentCreate: () => void;
  exists: boolean;
};

type FormData = {
  name: string;
  description: string;
};

const CreateDepartment = ({
  next,
  onDepartmentCreate,
  exists = false,
}: CreateDepartmentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (exists) {
      next?.current?.slideNext();
    }
  }, [exists]);

  const handleCreateDepartment = async (data: FormData) => {
    try {
      await InitializationController.createDepartment(
        new Department({
          departmentName: data.name,
          departmentDescription: data.description,
        })
      );
      reset();
      toast.success(
        <SuccessToast message="Department Created Successfully!" />
      );
      onDepartmentCreate();
      next?.current?.slideNext();
    } catch (error) {
      toast.error(<ErrorToast message="Can't Create Department" />);
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(handleCreateDepartment)}>
      <FormContainer
        logo={Logo}
        alt="Akaki Polytechnic Collage"
        title="Create Department"
      >
        <PrimaryTextField
          id="name"
          placeholder="Enter your department name here....."
          {...register("name", { required: "Department Name is required." })}
          label="Department Name"
          type="text"
        />
        {errors.name && (
          <p className="text-red-500 ml-2">{errors.name.message}</p>
        )}
        <PrimaryTextArea
          placeholder="Enter department description here....."
          id="description"
          {...register("description", {
            required: "Department Description is required.",
          })}
          label="Department Description"
        />
        {errors.description && (
          <p className="text-red-500 ml-2">{errors.description.message}</p>
        )}
        <PrimaryButton type="submit">Save Department</PrimaryButton>
      </FormContainer>
    </form>
  );
};

export default CreateDepartment;
