import { Controller, useForm } from "react-hook-form";
import { PrimaryTextField } from "./TextFields";
import { PrimaryButton, RadioButton } from "./ui/Buttons";
import PrimaryDropDown from "./DropDown";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ClientTypes, type RegisterClientForm } from "../types/client.type";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import Loader from "./Loader";
import TrainerController from "../controllers/trainerController";
import TraineeController from "../controllers/traineeController";
import GuestController from "../controllers/guestController";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { FaCamera } from "react-icons/fa";
import { useOverlay } from "../contexts/OverlayContext";
import Webcam from "react-webcam";

const RegisterClient = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterClientForm>();
  const clientType = watch("clientType");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const webcamRef = useRef<Webcam | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();
  const [deviceID, setDeviceID] = useState<string | null>();
  const [phoneExists, setPhoneExists] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshCamera, setRefreshCamera] = useState(false);
  const { setOverlayChildren, setOpen } = useOverlay();
  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    []
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);
  const handleRegister = async (data: RegisterClientForm) => {
    setLoading(true);
    if (phoneExists) {
      setError("phoneNumber", {
        type: "manual",
        message: "Phone number already exists.",
      });
      return;
    }

    try {
      const formData = new FormData();

      for (const key in data) {
        if (key === "clientType") {
          continue;
        }
        if (clientType === ClientTypes.ADMINISTRATIVE_STAFF) {
          if (key === "department" || key === "stream") {
            continue;
          }
        } else if (clientType === ClientTypes.TRAINER) {
          if (
            key === "office" ||
            key === "jobResponsibility" ||
            key === "stream"
          ) {
            continue;
          }
        } else if (clientType === ClientTypes.TRAINEE) {
          if (key === "office" || key === "jobResponsibility") {
            continue;
          }
        } else if (clientType === ClientTypes.GUEST) {
          if (
            key === "department" ||
            key === "stream" ||
            key === "jobResponsibility"
          ) {
            continue;
          }
        }
        const value = data[key as keyof RegisterClientForm];
        if (value instanceof File) {
          formData.append("image", value);
        } else {
          formData.append(key, value as any);
        }
      }

      if (clientType === ClientTypes.ADMINISTRATIVE_STAFF) {
        const response = await AdministrativeStaffController.register(formData);
        if (response.status === 201) {
          toast.success(
            <SuccessToast message="Administrative Staff registered successfully!" />
          );
          navigate(
            `/dashboard/register/administrative-staff/material/${response.data.id}`
          );
          reset();
        } else {
          toast.error(
            <ErrorToast message="Something went wrong, please try again" />
          );
        }
      } else if (clientType === ClientTypes.TRAINER) {
        const response = await TrainerController.register(formData);
        if (response.status === 201) {
          toast.success(
            <SuccessToast message="Trainer registered successfully!" />
          );
          navigate(`/dashboard/register/trainer/material/${response.data.id}`);
          reset();
        } else {
          toast.error(
            <ErrorToast message="Something went wrong, please try again" />
          );
        }
      } else if (clientType === ClientTypes.TRAINEE) {
        const response = await TraineeController.register(formData);
        if (response.status === 201) {
          toast.success(
            <SuccessToast message="Trainee registered successfully!" />
          );
          navigate(`/dashboard/register/trainee/material/${response.data.id}`);
          reset();
        } else {
          toast.error(
            <ErrorToast message="Something went wrong, please try again" />
          );
        }
      } else if (clientType === ClientTypes.GUEST) {
        const response = await GuestController.register(formData);
        if (response.status === 201) {
          toast.success(
            <SuccessToast message="Guest registered successfully!" />
          );
          navigate(`/dashboard/register/guest/material/${response.data.id}`);
          reset();
        } else {
          toast.error(
            <ErrorToast message="Something went wrong, please try again" />
          );
        }
      }

      setLoading(false);
    } catch (error) {
      toast.error(
        <ErrorToast message="Something went wrong, please try again" />
      );
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
          responseAdmin.data.exists ||
          responseTrainer.data.exists ||
          responseTrainee.data.exists ||
          responseGuest.data.exists
        ) {
          setError("phoneNumber", {
            type: "manual",
            message: "Phone number already exists.",
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
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-3 max-w-full"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex w-full  items-center gap-3">
            <div className="flex-1 ">
              <PrimaryTextField
                placeholder="Enter full name here....."
                id="name"
                label="Full Name"
                {...register("name", { required: "Full Name is Required." })}
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 ml-2">{errors.name.message}</p>
              )}
              <PrimaryTextField
                placeholder="Enter age here....."
                id="age"
                label="Age"
                {...register("age", {
                  required: "Age is Required.",
                  validate: {
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Age must be an integer.",
                  },
                })}
                type="number"
              />
              {errors.age && (
                <p className="text-red-500 ml-2">{errors.age.message}</p>
              )}
              <label className=" font-bold text-xl ml-5 text-white">
                Gender
              </label>
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
              <PrimaryTextField
                placeholder="Enter phone number here....."
                id="phoneNumber"
                label="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is Required.",
                  validate: {
                    exists: () => !phoneExists || "Phonenumber already exists.",
                    isInteger: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Phonenumber must be an integer.",
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
                placeholder="Enter subcity here....."
                id="subcity"
                label="Subcity"
                {...register("subcity", { required: "Subcity is Required." })}
                type="text"
              />
              {errors.subcity && (
                <p className="text-red-500 ml-2">{errors.subcity.message}</p>
              )}
              <PrimaryTextField
                placeholder="Enter district here....."
                id="district"
                label="District"
                {...register("district", { required: "District is Required." })}
                type="text"
              />
              {errors.district && (
                <p className="text-red-500 ml-2">{errors.district.message}</p>
              )}
              <Controller
                name="clientType"
                control={control}
                rules={{ required: "Client Type is required." }}
                render={({ field }) => (
                  <PrimaryDropDown
                    choices={Object.values(ClientTypes)}
                    label="Client Type"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    setValue={field.onChange}
                    id="clientType"
                  />
                )}
              />
              {errors.clientType && (
                <p className="text-red-500 ml-2">{errors.clientType.message}</p>
              )}
              {clientType === ClientTypes.ADMINISTRATIVE_STAFF ? (
                <>
                  <PrimaryTextField
                    placeholder="Enter office here....."
                    id="office"
                    label="Office"
                    {...register("office", { required: "Office is Required." })}
                    type="text"
                  />
                  {"office" in errors && errors.office && (
                    <p className="text-red-500 ml-2">{errors.office.message}</p>
                  )}
                  <PrimaryTextField
                    placeholder="Enter job responsibility here....."
                    id="jobResponsibility"
                    label="Job Responsibility"
                    {...register("jobResponsibility", {
                      required: "Job Responsibility is Required.",
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
                    placeholder="Enter department here....."
                    id="department"
                    label="Department"
                    {...register("department", {
                      required: "Department is Required.",
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
                    placeholder="Enter department here....."
                    id="department"
                    label="Department"
                    {...register("department", {
                      required: "Department is Required.",
                    })}
                    type="text"
                  />
                  {"department" in errors && errors.department && (
                    <p className="text-red-500 ml-2">
                      {errors.department.message}
                    </p>
                  )}
                  <PrimaryTextField
                    placeholder="Enter stream here....."
                    id="stream"
                    label="Stream"
                    {...register("stream", { required: "Stream is Required." })}
                    type="text"
                  />
                  {"stream" in errors && errors.stream && (
                    <p className="text-red-500 ml-2">{errors.stream.message}</p>
                  )}
                </>
              ) : clientType === ClientTypes.GUEST ? (
                <>
                  <PrimaryTextField
                    placeholder="Enter office here....."
                    id="office"
                    label="Office"
                    {...register("office", { required: "Office is Required." })}
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
              <p className="text-white text-2xl font-bold">Client Image</p>
              <Controller
                name="image"
                control={control}
                rules={{ required: "Client Image is required." }}
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
                      {imagePreview !== "" ? (
                        <img
                          src={imagePreview}
                          className="w-full h-full rounded-xl object-cover object-center"
                        />
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
              {errors.image && (
                <p className="text-red-500 ml-2">{errors.image.message}</p>
              )}

              <PrimaryButton
                type="button"
                onClick={() => {
                  navigator.mediaDevices.enumerateDevices().then(handleDevices);
                  setOpen(true);
                  setOverlayChildren(
                    <div className="flex flex-col items-center gap-2">
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
                      {refreshCamera && (
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={
                            deviceID ? { deviceId: deviceID } : undefined
                          }
                          className="w-60 h-70 rounded-2xl object-cover object-center"
                        />
                      )}
                      <PrimaryButton
                        type="button"
                        onClick={() => {
                          if (webcamRef.current) {
                            const imageSrc = webcamRef.current.getScreenshot();
                            if (imageSrc) {
                              fetch(imageSrc)
                                .then((res) => res.blob())
                                .then((blob) => {
                                  const file = new File(
                                    [blob],
                                    "webcam_image.jpg",
                                    { type: "image/jpeg" }
                                  );
                                  setImagePreview(URL.createObjectURL(file));
                                  setValue("image", file, {
                                    shouldValidate: true,
                                  });
                                  setOpen(false);
                                });
                            }
                          }
                        }}
                      >
                        Capture
                      </PrimaryButton>
                    </div>
                  );
                }}
                className="flex gap-2 items-center justify-between max-w-fit"
              >
                <FaCamera />
                Camera
              </PrimaryButton>
            </div>
          </div>
          <PrimaryButton
            type="submit"
            className="w-min"
            disabled={loading || checkingPhone || !!errors.phoneNumber}
          >
            Register
          </PrimaryButton>
        </>
      )}
    </form>
  );
};

export default RegisterClient;
