import { useNavigate, useParams } from "react-router";
import Container from "./Container";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorToast } from "./Toasts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MaterialController from "../controllers/materialController";
import type { Material } from "../types/material.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PrimaryButton } from "./ui/Buttons";

const MaterialDetail = () => {
  const { id, client } = useParams();
  const [materialData, setMaterialData] = useState<Material>();
  const navigate = useNavigate();

  const fetchAdministrativeStaff = async () => {
    try {
      const response = await MaterialController.get(Number(id));
      setMaterialData({
        ...response.data,
      });
    } catch (error) {
      toast.error(<ErrorToast message="Can not find material." />);
      navigate(`/dashboard/${client}/detail/${id}`);
    }
  };

  useEffect(() => {
    fetchAdministrativeStaff();
  }, []);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex items-center justify-between w-full">
        <PrimaryButton
          onClick={() => navigate(-1)}
          type="button"
          className="flex items-center justify-between max-w-fit gap-3"
        >
          <FaChevronLeft /> Back
        </PrimaryButton>
        <h1 className="text-3xl text-white font-bold">Material Detail</h1>
      </div>
      <Container className="p-4 max-w-[700px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-lg"
          spaceBetween={30}
          navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {materialData?.pictures.map((picture, index) => (
            <SwiperSlide key={index} className=" max-h-[350px]">
              <img
                className="rounded-lg w-full h-full object-cover"
                src={`http://localhost:3000/${picture.picturePath}`}
              />
            </SwiperSlide>
          ))}
          <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
            <FaChevronLeft />
          </div>

          <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
            <FaChevronRight />
          </div>
        </Swiper>
      </Container>
      <Container className="p-4 max-w-fit">
        <div className="flex gap-2">
          <p className="text-2xl font-bold ">Brand:</p>
          <p className="text-2xl">{materialData?.brand}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-2xl font-bold ">Model:</p>
          <p className="text-2xl">{materialData?.model}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-2xl font-bold ">Serial Number:</p>
          <p className="text-2xl capitalize">{materialData?.serialNumber}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-2xl font-bold ">Type:</p>
          <p className="text-2xl">{materialData?.type}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-2xl font-bold ">Ownership:</p>
          <p className="text-2xl">{materialData?.ownership}</p>
        </div>
      </Container>
    </div>
  );
};

export default MaterialDetail;
