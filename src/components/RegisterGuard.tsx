import { Controller, useForm } from "react-hook-form";
import { PrimaryTextField } from "./TextFields";
import { PrimaryButton } from "./ui/Buttons";
import PrimaryDropDown from "./DropDown";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import type { RegisterMaterialForm } from "../types/material.type";
import { useNavigate, useParams } from "react-router";
import { FaCamera, FaChevronLeft, FaTimes } from "react-icons/fa";
import TrainerController from "../controllers/trainerController";
import TraineeController from "../controllers/traineeController";
import GuestController from "../controllers/guestController";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";

const RegisterGuard = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterMaterialForm>();

  const [refreshCamera, setRefreshCamera] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [deviceID, setDeviceID] = useState<string | null>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    []
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id, client } = useParams();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);
  const [imagePreview, setImagePreview] = useState<
    (File & { preview: string })[]
  >([]);

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

      let response;
      if (client === "administrative-staff") {
        response = await AdministrativeStaffController.registerMaterial(
          formData
        );
      } else if (client === "trainer") {
        response = await TrainerController.registerMaterial(formData);
      } else if (client === "trainee") {
        response = await TraineeController.registerMaterial(formData);
      } else {
        response = await GuestController.registerMaterial(formData);
      }
      if (response.status === 201) {
        toast.success(
          <SuccessToast
            message={t("successRegister", { resource: t("material") })}
          />
        );
        setImagePreview([]);
        reset();
      } else {
        toast.error(<ErrorToast message={t("somethingWrong")} />);
      }
      setLoading(false);
    } catch (error) {
      toast.error(<ErrorToast message={t("somethingWrong")} />);
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
              <FaChevronLeft /> {t("back")}
            </PrimaryButton>

            <h1 className="text-3xl text-white font-bold">
              {t("registerMaterial")}
            </h1>
          </div>
          <div className="flex w-full  items-center gap-3">
            <div className="flex-1 ">
              <PrimaryTextField
                placeholder={t("input", { field: t("brandSm") })}
                id="brand"
                label={t("brand")}
                {...register("brand", {
                  required: t("isRequired", { field: t("brand") }),
                })}
                type="text"
              />
              {errors.brand && (
                <p className="text-red-500 ml-2">{errors.brand.message}</p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("modelSm") })}
                id="model"
                label={t("model")}
                {...register("model", {
                  required: t("isRequired", { field: t("model") }),
                })}
                type="text"
              />
              {errors.model && (
                <p className="text-red-500 ml-2">{errors.model.message}</p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("serialNumberSm") })}
                id="serialNumber"
                label={t("serialNumber")}
                {...register("serialNumber", {
                  required: t("isRequired", { field: t("serialNumber") }),
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
                rules={{
                  required: t("isRequired", { field: t("materialType") }),
                }}
                render={({ field }) => (
                  <PrimaryDropDown
                    choices={["Laptop", "Network Cable", "Crimper"]}
                    label={t("materialType")}
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
                rules={{ required: t("isRequired", { field: t("ownership") }) }}
                render={({ field }) => (
                  <PrimaryDropDown
                    choices={["Collage", "Private"]}
                    label={t("ownership")}
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
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white text-2xl font-bold">
                {t("materialImage", { count: 2 })}
              </p>
              {cameraOpen && (
                <select
                  onChange={(e) => {
                    setDeviceID(e.target.value);
                    setRefreshCamera(true);

                    setTimeout(() => {
                      setRefreshCamera(false);
                    }, 1000);
                  }}
                  value={deviceID!}
                >
                  {devices?.map((device, index) => (
                    <option key={index} value={device.deviceId}>
                      {device.label || `Camera ${index + 1}`}
                    </option>
                  ))}
                </select>
              )}
              <Controller
                name="images"
                control={control}
                rules={{
                  required: t("isRequired", { field: t("materialImage") }),
                }}
                render={({ field: { onChange, ...field } }) => {
                  const onDrop = useCallback((acceptedFiles: File[]) => {
                    setImagePreview((prev) => {
                      const imagePreviews: (File & {
                        preview: string;
                      })[] = [
                        ...prev,
                        ...acceptedFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          })
                        ),
                      ];

                      return imagePreviews;
                    });
                    setImageFiles((prev) => {
                      const imageFiles: File[] = [...prev, ...acceptedFiles];
                      onChange(imageFiles);
                      return imageFiles;
                    });
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
                      {cameraOpen ? (
                        refreshCamera ? (
                          <Loader />
                        ) : (
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={
                              deviceID ? { deviceId: deviceID } : undefined
                            }
                            className="w-full h-full rounded-2xl object-cover object-center"
                          />
                        )
                      ) : imagePreview && imagePreview.length !== 0 ? (
                        imagePreview.map((file, idx) => (
                          <div className="relative">
                            <button
                              type="button"
                              className="absolute top-2 right-2 cursor-pointer bg-black/50 text-white p-1 rounded-full"
                              onClick={() => {
                                const removedFile = imageFiles.splice(idx, 1);
                                const removedPreviews = imagePreview.splice(
                                  idx,
                                  1
                                );
                                setImageFiles(imageFiles);
                                setImagePreview(imagePreview);
                                setValue("images", imageFiles, {
                                  shouldValidate: true,
                                });
                              }}
                            >
                              <FaTimes />
                            </button>
                            <img
                              key={idx}
                              src={file.preview}
                              className="w-full h-full rounded-xl object-cover object-center"
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          {isDragActive ? (
                            isDragReject ? (
                              <div className="h-full w-full flex justify-center items-center">
                                <p className="text-xl text-center font-bold">
                                  {t("drapImage")}
                                </p>
                              </div>
                            ) : (
                              <div className="h-full w-full flex justify-center items-center">
                                <p className="text-xl text-center font-bold">
                                  {t("drapImage")}
                                </p>
                              </div>
                            )
                          ) : (
                            <div className="h-full w-full flex justify-center items-center">
                              <p className="text-xl text-center font-bold">
                                {t("dragAndDrop")}
                              </p>
                            </div>
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
              <PrimaryButton
                type="button"
                onClick={() => {
                  navigator.mediaDevices.enumerateDevices().then(handleDevices);
                  setCameraOpen((prev) => {
                    if (!prev) {
                      setRefreshCamera(true);
                      setTimeout(() => {
                        setRefreshCamera(false);
                      }, 2000);
                    }
                    return !prev;
                  });
                }}
                className="flex gap-2 items-center justify-between max-w-fit"
              >
                {cameraOpen ? <FaTimes /> : <FaCamera />}
                {cameraOpen ? t("close") : t("camera")}
              </PrimaryButton>
              {cameraOpen && (
                <PrimaryButton
                  type="button"
                  onClick={() => {
                    if (webcamRef.current) {
                      const imageSrc = webcamRef.current.getScreenshot();
                      if (imageSrc) {
                        fetch(imageSrc)
                          .then((res) => res.blob())
                          .then((blob) => {
                            const file = new File([blob], "webcam_image.jpg", {
                              type: "image/jpeg",
                            });
                            setImagePreview((prev) => {
                              prev?.push(
                                Object.assign(file, {
                                  preview: URL.createObjectURL(file),
                                })
                              );
                              return prev;
                            });

                            setImageFiles((prev) => {
                              const imageFiles: File[] = [...prev, file];
                              console.log(imageFiles);
                              setValue("images", imageFiles, {
                                shouldValidate: true,
                              });
                              return imageFiles;
                            });

                            setCameraOpen(false);
                          });
                      }
                    }
                  }}
                >
                  {t("capture")}
                </PrimaryButton>
              )}
            </div>
          </div>
          <PrimaryButton type="submit" className="w-min">
            {t("register")}
          </PrimaryButton>
        </>
      )}
    </form>
  );
};

export default RegisterGuard;
