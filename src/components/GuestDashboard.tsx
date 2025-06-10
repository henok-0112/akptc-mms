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
import type { Trainee } from "../types/trainee.type";
import GuestController from "../controllers/guestController";
import type { Guest } from "../types/guest.type";

const GuestDashboard = () => {
  const [guests, setGuests] = useState<Array<Guest>>([]);
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
        response = await GuestController.getAll(currentPage + 1, 10);
      } else {
        response = await GuestController.search({
          page: currentPage + 1,
          limit: 10,
          search: search,
        });
      }
      setGuests(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {}
  };

  const handleDelete = async (id: number) => {
    try {
      await GuestController.delete(id);
      toast.success(<SuccessToast message="Guest deleted successfully!" />);
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
      <h1 className="text-3xl font-bold text-white w-full">Guests</h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder="Search guests here......."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : guests.length === 0 ? (
        <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
          <p className="text-3xl">There are no guests registered!</p>
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
              "Office",
              "Actions",
            ]}
            bodyData={guests?.map((guest, index) => (
              <TableBodyRow key={index}>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                  className="rounded-bl-2xl"
                >
                  {index + 1}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.name}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.age}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.gender}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.phoneNumber}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.subcity}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.district}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guest/detail/${guest.id}`)
                  }
                >
                  {guest.office}
                </TableData>

                <TableData
                  className={`
                    rounded-br-2xl  
                    `}
                >
                  <div className="flex gap-2">
                    <PrimaryLinkButton
                      link={`/dashboard/guest/edit/${guest.id}`}
                    >
                      Edit
                    </PrimaryLinkButton>
                    <DangerButton onClick={() => handleDelete(guest.id)}>
                      Delete
                    </DangerButton>
                  </div>
                </TableData>
              </TableBodyRow>
            ))}
          />
        </>
      )}
      {guests.length !== 0 && totalPages > 1 && (
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

export default GuestDashboard;
