import { Controller, useForm } from "react-hook-form";
import { PrimaryTextField } from "./TextFields";
import { PrimaryButton } from "./ui/Buttons";
import PrimaryDropDown from "./DropDown";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import type {
  Material,
  RegisterMaterialForm,
  UpdateMaterialForm,
} from "../types/material.type";
import { useNavigate, useParams } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import MaterialController from "../controllers/materialController";

const EditMaterial = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterMaterialForm>();
  const navigate = useNavigate();

  const { id, client } = useParams();

  const [imagePreview, setImagePreview] = useState<
    (File & { preview: string })[] | { preview: string }[]
  >();

  const [materialData, setMaterialData] = useState<Material>();

  const fetchMaterial = async () => {
    try {
      const response = await MaterialController.get(Number(id));
      setMaterialData(response.data);
      const pictureUrl: Array<{ preview: string }> = [];
      response.data.pictures.map((picture: { picturePath: string }) =>
        pictureUrl.push({
          preview: `http://localhost:3000/${picture.picturePath}`,
        })
      );
      setImagePreview(pictureUrl);
      const previousData: Material = {
        ...response.data,
      };
      reset({
        brand: previousData.brand,
        model: previousData.model,
        serialNumber: previousData.serialNumber,
        type: previousData.type,
        ownership: previousData.ownership,
      });
    } catch (error) {
      toast.error(<ErrorToast message="Can not find material." />);
      navigate("/dashboard");
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const handleUpdate = async (data: UpdateMaterialForm) => {
    setLoading(true);
    try {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof UpdateMaterialForm];
        formData.append(key, value as string);
      }

      const response = await MaterialController.updateMaterial(
        Number(id),
        data
      );
      if (response.status === 200) {
        toast.success(
          <SuccessToast message="Material updated successfully!" />
        );
        navigate(-1);
      } else {
        toast.error(
          <ErrorToast message="Something went wrong, please try again" />
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(
        <ErrorToast message="Something went wrong, please try again" />
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="flex flex-col gap-3 max-w-full"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <PrimaryButton
              onClick={() => navigate(-1)}
              type="button"
              className="flex items-center justify-between max-w-fit gap-3"
            >
              <FaChevronLeft /> Back
            </PrimaryButton>

            <h1 className="text-3xl text-white font-bold">Register Material</h1>
          </div>
          <div className="flex w-full  items-center gap-3">
            <div className="flex-1 ">
              <PrimaryTextField
                placeholder="Enter brand here....."
                id="brand"
                label="Brand"
                {...register("brand", { required: "Brand is Required." })}
                type="text"
              />
              {errors.brand && (
                <p className="text-red-500 ml-2">{errors.brand.message}</p>
              )}
              <PrimaryTextField
                placeholder="Enter model here....."
                id="model"
                label="Model"
                {...register("model", {
                  required: "Model is Required.",
                })}
                type="text"
              />
              {errors.model && (
                <p className="text-red-500 ml-2">{errors.model.message}</p>
              )}
              <PrimaryTextField
                placeholder="Enter serial number here....."
                id="serialNumber"
                label="Serial Number"
                {...register("serialNumber", {
                  required: "Serial Number is Required.",
                })}
                type="text"
              />
              {errors.serialNumber && (
                <p className="text-red-500 ml-2">
                  {errors.serialNumber.message}
                </p>
              )}

              <Controller
                name="type"
                control={control}
                rules={{ required: "Material Type is required." }}
                render={({ field }) => (
                  <PrimaryDropDown
                    choices={["Laptop", "Network Cable", "Crimper"]}
                    label="Material Type"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    setValue={field.onChange}
                    id="type"
                  />
                )}
              />
              {errors.type && (
                <p className="text-red-500 ml-2">{errors.type.message}</p>
              )}

              <Controller
                name="ownership"
                control={control}
                rules={{ required: "Ownership is required." }}
                render={({ field }) => (
                  <PrimaryDropDown
                    choices={["Collage", "Private"]}
                    label="Ownership"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    setValue={field.onChange}
                    id="onwership"
                  />
                )}
              />
              {errors.ownership && (
                <p className="text-red-500 ml-2">{errors.ownership.message}</p>
              )}
            </div>
          </div>
          <PrimaryButton type="submit" className="w-min">
            Update
          </PrimaryButton>
        </>
      )}
    </form>
  );
};

export default EditMaterial;
