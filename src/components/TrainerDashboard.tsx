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
import TrainerController from "../controllers/trainerController";
import type { Trainer } from "../types/trainer.type";

const TrainerDashboard = () => {
  const [trainers, setTrainers] = useState<Array<Trainer>>([]);
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
        response = await TrainerController.getAll(currentPage + 1, 10);
      } else {
        response = await TrainerController.search({
          page: currentPage + 1,
          limit: 10,
          search: search,
        });
      }
      setTrainers(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {}
  };

  const handleDelete = async (id: number) => {
    try {
      await TrainerController.delete(id);
      toast.success(<SuccessToast message="Trainer deleted successfully!" />);
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
      <h1 className="text-3xl font-bold text-white w-full">Trainers</h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder="Search trainers here......."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : trainers.length === 0 ? (
        <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
          <p className="text-3xl">There are no trainers registered!</p>
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
              "Actions",
            ]}
            bodyData={trainers?.map((trainer, index) => (
              <TableBodyRow key={index}>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                  className="rounded-bl-2xl"
                >
                  {index + 1}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.name}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.age}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.gender}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.phoneNumber}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.subcity}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.district}
                </TableData>

                <TableData
                  onClick={() =>
                    navigate(`/dashboard/trainer/detail/${trainer.id}`)
                  }
                >
                  {trainer.department}
                </TableData>
                <TableData
                  className={`
                    rounded-br-2xl  
                    `}
                >
                  <div className="flex gap-2">
                    <PrimaryLinkButton
                      link={`/dashboard/trainer/edit/${trainer.id}`}
                    >
                      Edit
                    </PrimaryLinkButton>
                    <DangerButton onClick={() => handleDelete(trainer.id)}>
                      Delete
                    </DangerButton>
                  </div>
                </TableData>
              </TableBodyRow>
            ))}
          />
        </>
      )}
      {trainers.length !== 0 && totalPages > 1 && (
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

export default TrainerDashboard;
