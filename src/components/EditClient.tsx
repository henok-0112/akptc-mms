import { Controller, useForm } from "react-hook-form";
import { PrimaryTextField } from "./TextFields";
import { PrimaryButton, RadioButton } from "./ui/Buttons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ClientTypes, type UpdateClientForm } from "../types/client.type";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import TrainerController from "../controllers/trainerController";
import TraineeController from "../controllers/traineeController";
import GuestController from "../controllers/guestController";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router";
import { FaCamera, FaChevronLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";

const EditClient = () => {
  const { id, client } = useParams();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<UpdateClientForm>();

  const [imagePreview, setImagePreview] = useState("");
  const [clientType, setClientType] = useState<ClientTypes>(
    ClientTypes.ADMINISTRATIVE_STAFF
  );
  const { t } = useTranslation();
  const [clientData, setClientData] = useState<UpdateClientForm>();

  const fetchClient = async () => {
    try {
      let response;
      if (client === "administrative-staff") {
        response = await AdministrativeStaffController.get(Number(id));
      } else if (client === "trainer") {
        response = await TrainerController.get(Number(id));
      } else if (client === "trainee") {
        response = await TraineeController.get(Number(id));
      } else {
        response = await GuestController.get(Number(id));
      }
      setClientData(response.data);
      const pictureUrl = `http://localhost:3000/${response.data.picture.picturePath}`;
      setImagePreview(pictureUrl);
      const previousData = {
        clientType:
          client === "administrative-staff"
            ? ClientTypes.ADMINISTRATIVE_STAFF
            : client === "trainer"
            ? ClientTypes.TRAINER
            : client === "trainee"
            ? ClientTypes.TRAINEE
            : ClientTypes.GUEST,
        ...response.data,
      };
      if (client === "administrative-staff") {
        reset({
          name: previousData.name,
          age: previousData.age,
          gender: previousData.gender,
          clientType: ClientTypes.ADMINISTRATIVE_STAFF,
          phoneNumber: previousData.phoneNumber,
          district: previousData.district,
          subcity: previousData.subcity,
          office: previousData.office,
          jobResponsibility: previousData.jobResponsibility,
        });
      } else if (client === "trainer") {
        reset({
          name: previousData.name,
          age: previousData.age,
          gender: previousData.gender,
          clientType: ClientTypes.TRAINER,
          phoneNumber: previousData.phoneNumber,
          district: previousData.district,
          subcity: previousData.subcity,
          department: previousData.department,
        });
      } else if (client === "trainee") {
        reset({
          name: previousData.name,
          age: previousData.age,
          gender: previousData.gender,
          clientType: ClientTypes.TRAINEE,
          phoneNumber: previousData.phoneNumber,
          district: previousData.district,
          subcity: previousData.subcity,
          department: previousData.department,
          stream: previousData.stream,
        });
      } else if (client === "guest") {
        reset({
          name: previousData.name,
          age: previousData.age,
          gender: previousData.gender,
          clientType: ClientTypes.GUEST,
          phoneNumber: previousData.phoneNumber,
          district: previousData.district,
          subcity: previousData.subcity,
          office: previousData.office,
        });
      }
    } catch (error) {
      toast.error(
        <ErrorToast message={t("notFound", { field: t("client") })} />
      );
      navigate(-1);
    }
  };

  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [deviceID, setDeviceID] = useState<string | null>();

  const [refreshCamera, setRefreshCamera] = useState(false);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    []
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);

    if (isNaN(Number(id))) {
      toast.error(<ErrorToast message={t("isInteger")} />);
      navigate(-1);
    }
    if (client === "administrative-staff") {
      setClientType(ClientTypes.ADMINISTRATIVE_STAFF);
    } else if (client === "trainer") {
      setClientType(ClientTypes.TRAINER);
    } else if (client === "trainee") {
      setClientType(ClientTypes.TRAINEE);
    } else if (client === "guest") {
      setClientType(ClientTypes.GUEST);
    }
    fetchClient();
  }, []);

  const [phoneExists, setPhoneExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleUpdate = async (data: UpdateClientForm) => {
    setLoading(true);
    if (phoneExists) {
      setError("phoneNumber", {
        type: "manual",
        message: t("alreadyExists", { field: t("phoneNumber") }),
      });
      return;
    }
    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === "clientType") {
          continue;
        }
        const value = data[key as keyof UpdateClientForm];
        if (value instanceof File) {
          formData.append("image", value);
        } else {
          formData.append(key, value as any);
        }
      }

      if (clientType === ClientTypes.ADMINISTRATIVE_STAFF) {
        const response = await AdministrativeStaffController.update(
          Number(id),
          formData
        );

        if (response.status === 200) {
          toast.success(
            <SuccessToast
              message={t("successUpdate", {
                resource: t("adminsitrativeStaff"),
              })}
            />
          );
          navigate("/dashboard/administrative-staff");
          reset();
        } else {
          toast.error(<ErrorToast message={t("somethingWrong")} />);
        }
      } else if (clientType === ClientTypes.TRAINER) {
        const response = await TrainerController.update(Number(id), formData);
        console.log(formData.get("image"));
        if (response.status === 200) {
          toast.success(
            <SuccessToast
              message={t("successUpdate", {
                resource: t("trainer"),
              })}
            />
          );
          navigate("/dashboard/trainer");
          reset();
        } else {
          toast.error(<ErrorToast message={t("somethingWrong")} />);
        }
      } else if (clientType === ClientTypes.TRAINEE) {
        const response = await TraineeController.update(Number(id), formData);
        if (response.status === 200) {
          toast.success(
            <SuccessToast
              message={t("successUpdate", {
                resource: t("trainee"),
              })}
            />
          );
          navigate("/dashboard/trainee");
          reset();
        } else {
          toast.error(<ErrorToast message={t("somethingWrong")} />);
        }
      } else if (clientType === ClientTypes.GUEST) {
        const response = await GuestController.update(Number(id), formData);
        if (response.status === 200) {
          toast.success(
            <SuccessToast
              message={t("successUpdate", {
                resource: t("guest"),
              })}
            />
          );
          navigate("/dashboard/guest");
          reset();
        } else {
          toast.error(<ErrorToast message={t("somethingWrong")} />);
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(<ErrorToast message={t("somethingWrong")} />);
      setLoading(false);
    }
  };

  const phone = watch("phoneNumber");
  const [checkingPhone, setCheckingPhone] = useState<boolean>();
  const [debouncePhone] = useDebounce(phone, 500);

  useEffect(() => {
    const handleCheckPhone = async () => {
      if (!debouncePhone) return;

      try {
        setCheckingPhone(true);
        const responseAdmin = await AdministrativeStaffController.checkPhone(
          debouncePhone
        );
        const responseTrainer = await TrainerController.checkPhone(
          debouncePhone
        );
        const responseTrainee = await TraineeController.checkPhone(
          debouncePhone
        );
        const responseGuest = await GuestController.checkPhone(debouncePhone);
        if (
          (responseAdmin.data.exists ||
            responseTrainer.data.exists ||
            responseTrainee.data.exists ||
            responseGuest.data.exists) &&
          debouncePhone !== clientData?.phoneNumber
        ) {
          setError("phoneNumber", {
            type: "manual",
            message: t("alreadyExists", { field: t("phoneNumber") }),
          });
          setPhoneExists(true);
        } else {
          clearErrors("phoneNumber");
          setPhoneExists(false);
        }
      } catch (error) {
      } finally {
        setCheckingPhone(false);
      }
    };

    handleCheckPhone();
  }, [debouncePhone]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="flex flex-col gap-3 max-w-full"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <PrimaryButton
            onClick={() => navigate(-1)}
            type="button"
            className="w-fit flex justify-center items-center gap-2"
          >
            <FaChevronLeft /> {t("back")}
          </PrimaryButton>
          <div className="flex w-full  items-center gap-3">
            <div className="flex-1 ">
              <PrimaryTextField
                placeholder={t("input", { field: t("fullNameSm") })}
                id="name"
                label={t("fullName")}
                {...register("name", {
                  required: t("isRequired", { field: t("fullName") }),
                })}
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 ml-2">{errors.name.message}</p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("ageSm") })}
                id="age"
                label={t("age")}
                {...register("age", {
                  required: t("isRequired", { field: t("age") }),
                  validate: {
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      t("isInteger", { field: t("age") }),
                  },
                })}
                type="number"
              />
              {errors.age && (
                <p className="text-red-500 ml-2">{errors.age.message}</p>
              )}
              <label className=" font-bold text-xl ml-5 text-white">
                {t("gender")}
              </label>
              <div className="flex justify-around">
                <RadioButton
                  id="male"
                  {...register("gender", {
                    required: t("isRequired", { field: t("gender") }),
                  })}
                  label={t("male")}
                  value="male"
                />
                <RadioButton
                  id="female"
                  {...register("gender", {
                    required: t("isRequired", { field: t("gender") }),
                  })}
                  label={t("female")}
                  value="female"
                />
              </div>
              {errors.gender && (
                <p className="text-red-500 ml-2">{errors.gender.message}</p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("phoneNumberSm") })}
                id="phoneNumber"
                label={t("phoneNumber")}
                {...register("phoneNumber", {
                  required: t("alreadyExists", { field: t("phoneNumber") }),
                  validate: {
                    exists: () =>
                      !phoneExists ||
                      t("alreadyExists", { field: t("phoneNumber") }),
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      t("isInteger", { field: t("phoneNumber") }),
                  },
                })}
                type="number"
              />
              {checkingPhone && (
                <ClipLoader color="white" size={20} className="ml-2 mt-2" />
              )}
              {errors.phoneNumber && (
                <p className="text-red-500 ml-2">
                  {errors.phoneNumber.message}
                </p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("subcitySm") })}
                id="subcity"
                label={t("subcity")}
                {...register("subcity", {
                  required: t("isRequired", { field: t("subcity") }),
                })}
                type="text"
              />
              {errors.subcity && (
                <p className="text-red-500 ml-2">{errors.subcity.message}</p>
              )}
              <PrimaryTextField
                placeholder={t("input", { field: t("districtSm") })}
                id="district"
                label={t("district")}
                {...register("district", {
                  required: t("isRequired", { field: t("district") }),
                })}
                type="text"
              />
              {errors.district && (
                <p className="text-red-500 ml-2">{errors.district.message}</p>
              )}
              {clientType === ClientTypes.ADMINISTRATIVE_STAFF ? (
                <>
                  <PrimaryTextField
                    placeholder={t("input", { field: t("officeSm") })}
                    id="office"
                    label={t("office")}
                    {...register("office", {
                      required: t("isRequired", { field: t("office") }),
                    })}
                    type="text"
                  />
                  {"office" in errors && errors.office && (
                    <p className="text-red-500 ml-2">{errors.office.message}</p>
                  )}
                  <PrimaryTextField
                    placeholder={t("input", {
                      field: t("jobResponsibilitySm"),
                    })}
                    id="jobResponsibility"
                    label={t("jobResponsibility")}
                    {...register("jobResponsibility", {
                      required: t("isRequired", {
                        field: t("jobReponsibility"),
                      }),
                    })}
                    type="text"
                  />
                  {"jobResponsibility" in errors &&
                    errors.jobResponsibility && (
                      <p className="text-red-500 ml-2">
                        {errors.jobResponsibility.message}
                      </p>
                    )}
                </>
              ) : clientType === ClientTypes.TRAINER ? (
                <>
                  <PrimaryTextField
                    placeholder={t("input", { field: t("departmentSm") })}
                    id="department"
                    label={t("department")}
                    {...register("department", {
                      required: t("isRequired", { field: t("department") }),
                    })}
                    type="text"
                  />
                  {"department" in errors && errors.department && (
                    <p className="text-red-500 ml-2">
                      {errors.department.message}
                    </p>
                  )}
                </>
              ) : clientType === ClientTypes.TRAINEE ? (
                <>
                  <PrimaryTextField
                    placeholder={t("input", { field: t("departmentSm") })}
                    id="department"
                    label={t("department")}
                    {...register("department", {
                      required: t("isRequired", { field: t("department") }),
                    })}
                    type="text"
                  />
                  {"department" in errors && errors.department && (
                    <p className="text-red-500 ml-2">
                      {errors.department.message}
                    </p>
                  )}
                  <PrimaryTextField
                    placeholder={t("input", { field: t("streamSm") })}
                    id="stream"
                    label={t("stream")}
                    {...register("stream", {
                      required: t("isRequired", { field: t("stream") }),
                    })}
                    type="text"
                  />
                  {"stream" in errors && errors.stream && (
                    <p className="text-red-500 ml-2">{errors.stream.message}</p>
                  )}
                </>
              ) : clientType === ClientTypes.GUEST ? (
                <>
                  <PrimaryTextField
                    placeholder={t("input", { field: t("officeSm") })}
                    id="office"
                    label={t("office")}
                    {...register("office", {
                      required: t("isRequired", { field: t("office") }),
                    })}
                    type="text"
                  />
                  {"office" in errors && errors.office && (
                    <p className="text-red-500 ml-2">{errors.office.message}</p>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white text-2xl font-bold">
                {t("clientImage")}
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
                name="image"
                control={control}
                render={({ field: { onChange, ...field } }) => {
                  const onDrop = useCallback((acceptedFiles: File[]) => {
                    const file = acceptedFiles[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                      onChange(file);
                    }
                  }, []);
                  const {
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  } = useDropzone({
                    onDrop,
                    multiple: false,
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
                      } backdrop-blur-2xl shadow-lg cursor-pointer p-3 rounded-2xl  flex items-center justify-center`}
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
                      ) : imagePreview !== "" ? (
                        <img
                          src={imagePreview}
                          className="w-full h-full rounded-xl object-cover object-center"
                        />
                      ) : (
                        <>
                          {isDragActive ? (
                            isDragReject ? (
                              <p className="text-xl text-center font-bold">
                                {t("dropImage")}
                              </p>
                            ) : (
                              <p className="text-xl text-center font-bold">
                                {t("dropImage")}
                              </p>
                            )
                          ) : (
                            <p className="text-xl text-center font-bold">
                              {t("dragAndDrop")}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  );
                }}
              />
              {errors.image && (
                <p className="text-red-500 ml-2">{errors.image.message}</p>
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
                <FaCamera />
                {t("camera")}
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
                            setImagePreview(URL.createObjectURL(file));
                            setValue("image", file, {
                              shouldValidate: true,
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
          <PrimaryButton
            type="submit"
            className="w-min"
            disabled={loading || checkingPhone || !!errors.phoneNumber}
          >
            {t("update")}
          </PrimaryButton>
        </>
      )}
    </form>
  );
};

export default EditClient;
