import api from "../config/axios";
import type { Material, UpdateMaterialForm } from "../types/material.type";

const MaterialController = {
  get: async (id: number) => {
    try {
      const response = await api.get(`/material/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateMaterial: async (id: number, data: UpdateMaterialForm) => {
    try {
      const response = await api.put(`/material/update/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/material/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default MaterialController;
