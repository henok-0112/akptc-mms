import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { DangerButton, PrimaryButton, PrimaryLinkButton } from "./ui/Buttons";
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
import logo from "../assets/logo.png";
import { useOverlay } from "../contexts/OverlayContext";
import QrCode from "react-qr-code";
import { useTranslation } from "react-i18next";

const GuardsDashboard = () => {
  const [administrativeStaffs, setAdministrativeStaffs] = useState<
    Array<AdministrativeStaff>
  >([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { setOverlayChildren, setOpen, setLoadingOverlay, loadingOverlay } =
    useOverlay();

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
        <SuccessToast
          message={t("successDelete", { resource: t("administrativeStaff") })}
        />
      );
    } catch (error) {
      toast.error(<ErrorToast message={t("somethingWrong")} />);
    } finally {
      handleGetAll();
    }
  };

  const handleGenerateQR = (id: number, name: string) => {
    setOpen(true);
    setLoadingOverlay(true);
    setOverlayChildren(
      <div className="bg-white overflow-hidden min-h-100 rounded-2xl ">
        <div className="bg-green-600 p-4 mb-4 gap-2 flex items-center space-between">
          <img src={logo} className="w-15" />
          <p className="text-white text-xl font-bold">
            Akaki Polytechnic Collage ID
          </p>
        </div>
        <div className="flex gap-4 flex-col justify-center items-center">
          <QrCode
            enableBackground="false"
            size={200}
            level="H"
            bgColor="transparent"
            fgColor="#00a746"
            value={id.toString()}
          />
          <p className="text-2xl">
            <span className="text-[#00a746]">Name:</span> {name}
          </p>
        </div>
      </div>
    );
    setLoadingOverlay(false);
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
        {t("administrativeStaff")}
      </h1>
      <div className="w-140 my-3">
        <PrimaryTextField
          id="search"
          onBlur={() => {}}
          type="text"
          placeholder={t("search", { field: t("administrativeStaffSm") })}
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
            {t("notFound", { field: t("administrativeStaffSm", { count: 2 }) })}
          </p>
          <PrimaryLinkButton className="max-w-fit" link="/dashboard/register">
            {t("registerClient", { count: 2 })}
          </PrimaryLinkButton>
        </div>
      ) : (
        <>
          <Table
            headers={[
              t("no"),
              t("name"),
              t("age"),
              t("gender"),
              t("phoneNumber"),
              t("subcity"),
              t("district"),
              t("office"),
              t("jobResponsibility"),
              t("actions"),
            ]}
            bodyData={administrativeStaffs?.map(
              (administrativeStaff, index) => (
                <TableBodyRow key={index}>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                    className="rounded-bl-2xl"
                  >
                    {index + 1}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.name}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.age}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.gender}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.phoneNumber}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.subcity}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.district}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.office}
                  </TableData>
                  <TableData
                    onClick={() =>
                      navigate(
                        `/dashboard/administrative-staff/detail/${administrativeStaff.id}`
                      )
                    }
                  >
                    {administrativeStaff.jobResponsibility}
                  </TableData>
                  <TableData
                    className={`
                    rounded-br-2xl  
                    `}
                  >
                    <div className="flex gap-2">
                      <PrimaryLinkButton
                        link={`/dashboard/administrative-staff/edit/${administrativeStaff.id}`}
                      >
                        {t("edit")}
                      </PrimaryLinkButton>
                      <DangerButton
                        onClick={() => handleDelete(administrativeStaff.id)}
                      >
                        {t("delete")}
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

export default GuardsDashboard;
