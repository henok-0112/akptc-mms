import { useEffect, useState } from "react";
import Table from "./Table";
import { DangerButton, PrimaryLinkButton } from "./ui/Buttons";
import AdministrativeStaffController from "../controllers/administrativeStaffController";
import type { AdministrativeStaff } from "../types/administrativeStaff.type";
import Loader from "./Loader";
import { PrimaryTextField } from "./TextFields";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import { useNavigate } from "react-router";
import { TableBodyRow } from "./TableRow";
import TableData from "./TableData";

const AdministrativeStaffDashboard = () => {
  const [administrativeStaffs, setAdministrativeStaffs] = useState<
    Array<AdministrativeStaff>
  >([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleGetAll = async () => {
    try {
      setLoading(true);
      let response;
      if (search === "") {
        response = await AdministrativeStaffController.getAll(
          currentPage + 1,
          10
        );
      } else {
        response = await AdministrativeStaffController.search({
          page: currentPage + 1,
          limit: 10,
          search: search,
        });
      }
      setAdministrativeStaffs(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {}
  };

  const handleDelete = async (id: number) => {
    try {
      await AdministrativeStaffController.delete(id);
      toast.success(
        <SuccessToast message="Administrative Staff deleted successfully!" />
      );
    } catch (error) {
      toast.error(
        <ErrorToast message="Something went wrong, Please try again!" />
      );
    } finally {
      handleGetAll();
    }
  };

  useEffect(() => {
    handleGetAll();
  }, []);
  useEffect(() => {
    handleGetAll();
  }, [search]);
  useEffect(() => {
    handleGetAll();
  }, [currentPage]);

  return (
    <div className="flex items-center flex-col gap-2 justify-center">
      <h1 className="text-3xl font-bold text-white w-full">
        Administrative Staffs
      </h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder="Search administrative staffs here......."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : administrativeStaffs.length === 0 ? (
        <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
          <p className="text-3xl">
            There are no administrative staff registered!
          </p>
          <PrimaryLinkButton className="max-w-fit" link="/dashboard/create">
            Register Clients
          </PrimaryLinkButton>
        </div>
      ) : (
        <>
          <Table
            headers={[
              "No.",
              "Name",
              "Age",
              "Gender",
              "Phone Number",
              "Subcity",
              "District",
              "Office",
              "Job Responsibility",
              "Actions",
            ]}
            bodyData={administrativeStaffs?.map(
              (administrativeStaff, index) => (
                <TableBodyRow
                  key={index}
                  onClick={() =>
                    navigate(
                      `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                    )
                  }
                >
                  <TableData className="rounded-bl-2xl">{index + 1}</TableData>
                  <TableData>{administrativeStaff.name}</TableData>
                  <TableData>{administrativeStaff.age}</TableData>
                  <TableData>{administrativeStaff.gender}</TableData>
                  <TableData>{administrativeStaff.phoneNumber}</TableData>
                  <TableData>{administrativeStaff.subcity}</TableData>
                  <TableData>{administrativeStaff.district}</TableData>
                  <TableData>{administrativeStaff.office}</TableData>
                  <TableData>{administrativeStaff.jobResponsibility}</TableData>
                  <TableData
                    className={`
                    rounded-br-2xl  
                    `}
                  >
                    <div className="flex gap-2">
                      <PrimaryLinkButton
                        link={`/dashboard/administrative-staff/edit/${administrativeStaff.id}`}
                      >
                        Edit
                      </PrimaryLinkButton>
                      <DangerButton
                        onClick={() => handleDelete(administrativeStaff.id)}
                      >
                        Delete
                      </DangerButton>
                    </div>
                  </TableData>
                </TableBodyRow>
              )
            )}
          />
        </>
      )}
      {administrativeStaffs.length !== 0 && totalPages > 1 && (
        <ReactPaginate
          previousLabel={
            <div className="p-3 rounded-lg shadow-lg  bg-green-400/50 cursor-pointer">
              <FaChevronLeft size={20} className="text-white" />
            </div>
          }
          nextLabel={
            <div className="p-3 rounded-lg shadow-lg  bg-green-400/50 cursor-pointer">
              <FaChevronRight size={20} className="text-white" />
            </div>
          }
          pageCount={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName="flex justify-end w-full items-center gap-2"
          pageClassName="text-black text-xl font-bold px-3 py-2  rounded-lg cursor-pointer"
          activeClassName="text-white bg-green-400/50"
        />
      )}
    </div>
  );
};

export default AdministrativeStaffDashboard;
