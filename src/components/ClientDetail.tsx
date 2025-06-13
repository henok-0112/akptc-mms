import { useNavigate, useParams } from "react-router";
import Container from "./Container";
import { useEffect, useState } from "react";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import { ClientTypes, type Client } from "../types/client.type";
import Table from "./Table";
import { TableBodyRow } from "./TableRow";
import TableData from "./TableData";
import { DangerButton, PrimaryButton, PrimaryLinkButton } from "./ui/Buttons";
import MaterialController from "../controllers/materialController";
import TrainerController from "../controllers/trainerController";
import { FaChevronLeft } from "react-icons/fa";
import TraineeController from "../controllers/traineeController";
import GuestController from "../controllers/guestController";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

const ClientDetail = () => {
  const { id, client } = useParams();
  const [clientData, setClientData] = useState<Client>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchClient = async () => {
    try {
      if (client === "administrative-staff") {
        const response = await AdministrativeStaffController.get(Number(id));
        setClientData({
          clientType: ClientTypes.ADMINISTRATIVE_STAFF,
          ...response.data,
        });
      } else if (client === "trainer") {
        const response = await TrainerController.get(Number(id));
        setClientData({
          clientType: ClientTypes.TRAINER,
          ...response.data,
        });
        console.log(response);
      } else if (client === "trainee") {
        const response = await TraineeController.get(Number(id));
        setClientData({
          clientType: ClientTypes.TRAINEE,
          ...response.data,
        });
      } else if (client === "guest") {
        const response = await GuestController.get(Number(id));
        setClientData({
          clientType: ClientTypes.GUEST,
          ...response.data,
        });
      }
    } catch (error) {
      toast.error(
        <ErrorToast message={t("notFound", { field: t("client") })} />
      );
      navigate(`/dashboard/${client}`);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await MaterialController.delete(id);
      toast.success(
        <SuccessToast
          message={t("successDelete", { resource: t("material") })}
        />
      );
    } catch (error) {
      toast.error(<ErrorToast message={t("somthingWrong")} />);
    } finally {
      fetchClient();
    }
  };
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex items-center justify-between w-full">
        <PrimaryButton
          onClick={() => navigate(-1)}
          className="flex justify-between items-center gap-3"
        >
          <FaChevronLeft /> {t("back")}
        </PrimaryButton>
        <h1 className="text-3xl text-white font-bold">{t("clientDetail")}</h1>
        <PrimaryButton
          onClick={() =>
            navigate(`/dashboard/register/${client}/material/${id}`)
          }
        >
          {t("registerMaterial")}
        </PrimaryButton>
      </div>
      <Container className="p-4 max-w-[500px]">
        <img
          className="rounded-lg w-full h-full object-cover"
          src={
            clientData?.picture
              ? `http://localhost:3000/${clientData?.picture.picturePath}`
              : logo
          }
        />
      </Container>
      <Container className="p-4 max-w-fit">
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("name")}:</p>
          <p className="text-xl">{clientData?.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("age")}:</p>
          <p className="text-xl">{clientData?.age}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("gender")}:</p>
          <p className="text-xl capitalize">{clientData?.gender}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("phoneNumber")}:</p>
          <p className="text-xl">{clientData?.phoneNumber}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("subcity")}:</p>
          <p className="text-xl">{clientData?.subcity}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">{t("district")}:</p>
          <p className="text-xl">{clientData?.district}</p>
        </div>
        {clientData?.clientType === ClientTypes.ADMINISTRATIVE_STAFF ? (
          <>
            <div className="flex gap-2">
              <p className="text-xl font-bold ">{t("office")}:</p>
              <p className="text-xl">{clientData?.office}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-xl font-bold ">{t("jobResponsibility")}:</p>
              <p className="text-xl">{clientData?.jobResponsibility}</p>
            </div>
          </>
        ) : clientData?.clientType === ClientTypes.TRAINER ? (
          <div className="flex gap-2">
            <p className="text-xl font-bold ">{t("department")}:</p>
            <p className="text-xl">{clientData?.department}</p>
          </div>
        ) : clientData?.clientType === ClientTypes.TRAINEE ? (
          <>
            <div className="flex gap-2">
              <p className="text-xl font-bold ">{t("department")}:</p>
              <p className="text-xl">{clientData?.department}</p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-xl font-bold ">{t("stream")}:</p>
              <p className="text-xl">{clientData?.stream}</p>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <p className="text-xl font-bold ">{t("office")}:</p>
            <p className="text-xl">{clientData?.office}</p>
          </div>
        )}
      </Container>
      {clientData?.materials.length !== 0 ? (
        <Table
          headers={[
            t("no"),
            t("brand"),
            t("model"),
            t("serialNumber"),
            t("type"),
            t("ownership"),
            t("actions"),
          ]}
          bodyData={clientData?.materials.map((material, index) => (
            <TableBodyRow key={index}>
              <TableData
                className="rounded-bl-2xl"
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {index + 1}
              </TableData>
              <TableData
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {material.material.brand}
              </TableData>
              <TableData
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {material.material.model}
              </TableData>
              <TableData
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {material.material.serialNumber}
              </TableData>
              <TableData
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {material.material.type}
              </TableData>
              <TableData
                onClick={() =>
                  navigate(
                    `/dashboard/${client}/material/detail/${material.material.id}`
                  )
                }
              >
                {material.material.ownership}
              </TableData>
              <TableData className="rounded-br-2xl">
                <div className="flex gap-2">
                  <PrimaryLinkButton
                    link={`/dashboard/administrative-staff/edit/material/${material.material.id}`}
                  >
                    {t("edit")}
                  </PrimaryLinkButton>
                  <DangerButton
                    onClick={() => handleDelete(material.material.id)}
                  >
                    {t("delete")}
                  </DangerButton>
                </div>
              </TableData>
            </TableBodyRow>
          ))}
        />
      ) : (
        <p className="text-3xl text-center">
          {t("notRegistered", { field: t("materialSm", { count: 2 }) })}
        </p>
      )}
    </div>
  );
};

export default ClientDetail;
