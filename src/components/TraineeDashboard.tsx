import { useEffect, useState } from "react";
import Table from "./Table";
import { DangerButton, PrimaryLinkButton } from "./ui/Buttons";
import Loader from "./Loader";
import { PrimaryTextField } from "./TextFields";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "./Toasts";
import { useNavigate } from "react-router";
import { TableBodyRow } from "./TableRow";
import TableData from "./TableData";
import TraineeController from "../controllers/traineeController";
import type { Trainee } from "../types/trainee.type";

const TraineeDashboard = () => {
  const [trainees, setTrainees] = useState<Array<Trainee>>([]);
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
        response = await TraineeController.getAll(currentPage + 1, 10);
      } else {
        response = await TraineeController.search({
          page: currentPage + 1,
          limit: 10,
          search: search,
        });
      }
      setTrainees(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {}
  };

  const handleDelete = async (id: number) => {
    try {
      await TraineeController.delete(id);
      toast.success(<SuccessToast message="Trainee deleted successfully!" />);
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
      <h1 className="text-3xl font-bold text-white w-full">Trainees</h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder="Search trainees here......."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : trainees.length === 0 ? (
        <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
          <p className="text-3xl">There are no trainees registered!</p>
          <PrimaryLinkButton className="max-w-fit" link="/dashboard/register">
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
              "Department",
              "Stream",
              "Actions",
            ]}
            bodyData={trainees?.map((trainee, index) => (
              <TableBodyRow key={index}>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                  className="rounded-bl-2xl"
                >
                  {index + 1}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.name}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.age}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.gender}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.phoneNumber}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.subcity}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.district}
                </TableData>

                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.department}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainee/detail/${trainee.id}`)
                  }
                >
                  {trainee.stream}
                </TableData>

                <TableData
                  className={`
                    rounded-br-2xl  
                    `}
                >
                  <div className="flex gap-2">
                    <PrimaryLinkButton
                      link={`/dashboard/trainee/edit/${trainee.id}`}
                    >
                      Edit
                    </PrimaryLinkButton>
                    <DangerButton onClick={() => handleDelete(trainee.id)}>
                      Delete
                    </DangerButton>
                  </div>
                </TableData>
              </TableBodyRow>
            ))}
          />
        </>
      )}
      {trainees.length !== 0 && totalPages > 1 && (
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

export default TraineeDashboard;
