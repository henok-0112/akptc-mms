import type { AxiosResponse } from "axios";
import api from "../config/axios";
import Department from "../model/Department";
import SuperHead from "../model/SuperHead";

const InitializationController = {
  isInitialized: async (): Promise<AxiosResponse> => {
    try {
      const response = await api.get("/init/status", {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching initialization status: ", error);
      throw error;
    }
  },
  createDepartment: async (data: Department): Promise<Department> => {
    try {
      const response = await api.post(
        "/departments/create/",
        {
          name: data.departmentName,
          description: data.departmentDescription,
        },
        { withCredentials: true }
      );
      return new Department({
        id: response.data.id,
        departmentName: response.data.name,
        departmentDescription: response.data.description,
      });
    } catch (error) {
      console.error("Error creating department: ", error);
      throw error;
    }
  },
  createSuperHead: async (data: SuperHead): Promise<SuperHead> => {
    try {
      const response = await api.post(
        "/users/superhead/",
        {
          full_name: data.full_name,
          username: data.username,
          gender: data.gender,
          department: data.department,
          password: data.password,
          role: data.role,
          security_question: data.securityQuestion,
          security_answer: data.securityAnswer,
        },
        { withCredentials: true }
      );
      return new SuperHead({
        id: response.data.id,
        full_name: response.data.name,
        username: response.data.description,
        gender: response.data.gender,
        department: response.data.department,
        password: response.data.password,
        securityQuestion: response.data.security_question,
        securityAnswer: response.data.security_answer,
      });
    } catch (error) {
      console.error("Error creating super head: ", error);
      throw error;
    }
  },
  initialize: async (): Promise<boolean> => {
    try {
      await api.patch("/initialize/", {}, { withCredentials: true });
      return true;
    } catch (error) {
      console.error("Error Initializing application", error);
      throw error;
    }
  },
};

export default InitializationController;
