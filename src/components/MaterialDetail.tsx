import { useNavigate, useParams } from "react-router";
import Container from "./Container";
import { useEffect, useState } from "react";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import { toast } from "react-toastify";
import { ErrorToast } from "./Toasts";
import { ClientTypes, type Client } from "../types/client.type";
import Table from "./Table";
import { TableBodyRow } from "./TableRow";
import TableData from "./TableData";
import { DangerButton, PrimaryButton, PrimaryLinkButton } from "./ui/Buttons";

const MaterialDetail = () => {
  const { id, client } = useParams();
  const [clientData, setClientData] = useState<Client>();
  const navigate = useNavigate();

  const fetchAdministrativeStaff = async () => {
    try {
      const response = await AdministrativeStaffController.get(Number(id));
      setClientData({
        clientType: ClientTypes.ADMINISTRATIVE_STAFF,
        ...response.data,
      });
    } catch (error) {
      toast.error(<ErrorToast message="Can not find client." />);
      navigate(`/dashboard/${client}`);
    }
  };

  useEffect(() => {
    fetchAdministrativeStaff();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-white font-bold">Client Detail</h1>
        <PrimaryButton
          onClick={() =>
            navigate(`/dashboard/register/${client}/material/${id}`)
          }
        >
          Register Material
        </PrimaryButton>
      </div>
      <Container className="p-4 max-w-fit">
        <img
          className="rounded-lg"
          src={`http://localhost:3000/${clientData?.picture.picturePath}`}
        />
      </Container>
      <Container className="p-4 max-w-fit">
        <div className="flex gap-2">
          <p className="text-xl font-bold ">Name:</p>
          <p className="text-xl">{clientData?.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">Age:</p>
          <p className="text-xl">{clientData?.age}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">Gender:</p>
          <p className="text-xl capitalize">{clientData?.gender}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">Phone Number:</p>
          <p className="text-xl">{clientData?.phoneNumber}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">Subcity:</p>
          <p className="text-xl">{clientData?.subcity}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold ">District:</p>
          <p className="text-xl">{clientData?.district}</p>
        </div>
        {clientData?.clientType === ClientTypes.ADMINISTRATIVE_STAFF ? (
          <>
            <div className="flex gap-2">
              <p className="text-xl font-bold ">Office:</p>
              <p className="text-xl">{clientData?.office}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-xl font-bold ">Job Responsibility:</p>
              <p className="text-xl">{clientData?.jobResponsibility}</p>
            </div>
          </>
        ) : (
          ""
        )}
      </Container>
      <Table
        headers={[
          "No.",
          "Brand",
          "Model",
          "Serial Number",
          "Type",
          "Ownership",
          "Actions",
        ]}
        bodyData={clientData?.materials.map((material, index) => (
          <TableBodyRow key={index}>
            <TableData className="rounded-bl-2xl">{index + 1}</TableData>
            <TableData>{material.material.brand}</TableData>
            <TableData>{material.material.model}</TableData>
            <TableData>{material.material.serialNumber}</TableData>
            <TableData>{material.material.type}</TableData>
            <TableData>{material.material.ownership}</TableData>
            <TableData className="rounded-br-2xl">
              <div className="flex gap-2">
                <PrimaryLinkButton
                  link={`/dashboard/administrative-staff/edit/${material.material.id}`}
                >
                  Edit
                </PrimaryLinkButton>
                <DangerButton
                //   onClick={() => handleDelete(administrativeStaff.id)}
                >
                  Delete
                </DangerButton>
              </div>
            </TableData>
          </TableBodyRow>
        ))}
      />
    </div>
  );
};

export default MaterialDetail;
