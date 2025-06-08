import api from "../config/axios";

type searchProps = { page?: number; limit?: number; search?: string | number };

const AdministrativeStaffController = {
  register: async (data: FormData) => {
    try {
      const response = await api.post("/administrative-staff/register", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  registerMaterial: async (data: FormData) => {
    try {
      const response = await api.post(
        "/administrative-staff/register/material",
        data
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAll: async (page?: number, limit?: number) => {
    try {
      const response = await api.get("/administrative-staff/all", {
        params: { page: page, limit: limit },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  get: async (id: number) => {
    try {
      const response = await api.get(`/administrative-staff/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkPhone: async (phone: number) => {
    try {
      const response = await api.get("/administrative-staff/check-phone", {
        params: { phone: phone },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  search: async ({ page, limit, search }: searchProps) => {
    try {
      const response = await api.get("/administrative-staff/all", {
        params: { page: page, limit: limit, search: search },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: FormData) => {
    try {
      const response = await api.put(
        `/administrative-staff/update/${id}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/administrative-staff/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AdministrativeStaffController;
