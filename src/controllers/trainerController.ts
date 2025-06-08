import api from "../config/axios";

const TrainerController = {
  register: async (data: FormData) => {
    try {
      const response = await api.post("/trainer/register", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  checkPhone: async (phone: number) => {
    try {
      const response = await api.get("/trainer/check-phone", {
        params: { phone: phone },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default TrainerController;
