import { Controller, useForm } from "react-hook-form";
import { PrimaryTextField } from "./TextFields";
import { PrimaryButton } from "./ui/Buttons";
import PrimaryDropDown from "./DropDown";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import type { RegisterMaterialForm } from "../types/material.type";
import { useNavigate, useParams } from "react-router";
import { FaChevronLeft } from "react-icons/fa";

const RegisterMaterial = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterMaterialForm>();
  const navigate = useNavigate();

  const { id, client } = useParams();

  const [imagePreview, setImagePreview] =
    useState<(File & { preview: string })[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = async (data: RegisterMaterialForm) => {
    setLoading(true);
    try {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof RegisterMaterialForm];
        if (key === "images") {
          data.images.map((image) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, value as string);
        }
      }
      formData.append("clientID", id as string);

      const response = await AdministrativeStaffController.registerMaterial(
        formData
      );
      if (response.status === 201) {
        toast.success(
          <SuccessToast message="Material registered successfully!" />
        );
        reset();
      } else {
        toast.error(
          <ErrorToast message="Something went wrong, please try again" />
        );
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        <ErrorToast message="Something went wrong, please try again" />
      );
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
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
            <div className="flex flex-col gap-2">
              <p className="text-white text-2xl font-bold">Material Images</p>
              <Controller
                name="images"
                control={control}
                rules={{ required: "Material Image is required." }}
                render={({ field: { onChange, ...field } }) => {
                  const onDrop = useCallback((acceptedFiles: File[]) => {
                    setImagePreview(
                      acceptedFiles.map((file) =>
                        Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        })
                      )
                    );
                    onChange(acceptedFiles);
                  }, []);
                  const {
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  } = useDropzone({
                    onDrop,
                    multiple: true,
                    accept: {
                      "image/*": [],
                    },
                  });
                  return (
                    <div
                      {...getRootProps()}
                      className={`w-60 h-70 border-2  ${
                        isDragActive
                          ? isDragAccept
                            ? "bg-green-400/50 border-green-500"
                            : "bg-red-400/50 border-red-500"
                          : "bg-white/30 border-white/50"
                      } backdrop-blur-2xl shadow-lg cursor-pointer p-3 rounded-2xl  flex flex-col overflow-auto items-center  gap-2`}
                    >
                      <input
                        {...getInputProps()}
                        name={field.name}
                        onBlur={field.onBlur}
                        type="file"
                      />
                      {imagePreview ? (
                        imagePreview.map((file, idx) => (
                          <img
                            key={idx}
                            src={file.preview}
                            className="w-full h-full rounded-xl object-cover object-center"
                          />
                        ))
                      ) : (
                        <>
                          {isDragActive ? (
                            isDragReject ? (
                              <p className="text-xl text-center font-bold">
                                Drop files here.....
                              </p>
                            ) : (
                              <p className="text-xl text-center font-bold">
                                Drop files here.....
                              </p>
                            )
                          ) : (
                            <p className="text-xl text-center font-bold">
                              Drag and Drop files here.....
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  );
                }}
              />
              {errors.images && (
                <p className="text-red-500 ml-2">{errors.images.message}</p>
              )}
            </div>
          </div>
          <PrimaryButton type="submit" className="w-min">
            Register
          </PrimaryButton>
        </>
      )}
    </form>
  );
};

export default RegisterMaterial;
