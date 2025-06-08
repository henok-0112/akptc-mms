import api from "../config/axios";

const GuestController = {
  register: async (data: FormData) => {
    try {
      const response = await api.post("/guest/register", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  checkPhone: async (phone: number) => {
    try {
      const response = await api.get("/guest/check-phone", {
        params: { phone: phone },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default GuestController;
