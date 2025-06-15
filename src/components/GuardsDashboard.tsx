import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { DangerButton, PrimaryButton, PrimaryLinkButton } from "./ui/Buttons";
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
import { useTranslation } from "react-i18next";
import UserController from "../controllers/UserController";

const GuardsDashboard = () => {
  const [guards, setGuards] = useState<Array<AdministrativeStaff>>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleGetAll = async () => {
    try {
      setLoading(true);
      let response;
      if (search === "") {
        response = await UserController.getGuards(currentPage + 1, 10);
      } else {
        response = await UserController.searchGuards({
          page: currentPage + 1,
          limit: 10,
          search: search,
        });
      }
      setGuards(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);

    }
  };

  const handleDelete = async (id: number) => {
    try {
      await UserController.deleteGuard(id);
      toast.success(
        <SuccessToast message={t("successDelete", { resource: t("guard") })} />
      );
    } catch (error) {
      toast.error(<ErrorToast message={t("somethingWrong")} />);
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
        {t("guard", { count: 2 })}
      </h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder={t("search", { field: t("guardSm") })}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <Loader />
      ) : guards.length === 0 ? (
        <div className="w-full min-h-full flex-1 flex flex-col justify-center items-center">
          <p className="text-3xl">
            {t("notFound", { field: t("guardSm", { count: 2 }) })}
          </p>
          <PrimaryLinkButton
            className="max-w-fit"
            link="/dashboard/guard/register"
          >
            {t("registerGuard", { count: 2 })}
          </PrimaryLinkButton>
        </div>
      ) : (
        <>
          <Table
            headers={[t("no"), t("name"), t("username"), t("actions")]}
            bodyData={guards?.map((guard, index) => (
              <TableBodyRow key={index}>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guard/detail/${guard.id}`)
                  }
                  className="rounded-bl-2xl"
                >
                  {index + 1}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guard/detail/${guard.id}`)
                  }
                >
                  {guard.name}
                </TableData>
                <TableData
                  onClick={() =>
                    navigate(`/dashboard/guard/detail/${guard.id}`)
                  }
                >
                  {guard.age}
                </TableData>
                <TableData
                  className={`
                    rounded-br-2xl  
                    `}
                >
                  <div className="flex gap-2">
                    <PrimaryLinkButton
                      link={`/dashboard/guard/edit/${guard.id}`}
                    >
                      {t("edit")}
                    </PrimaryLinkButton>
                    <DangerButton onClick={() => handleDelete(guard.id)}>
                      {t("delete")}
                    </DangerButton>
                  </div>
                </TableData>
              </TableBodyRow>
            ))}
          />
        </>
      )}
      {guards.length !== 0 && totalPages > 1 && (
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

export default GuardsDashboard;
