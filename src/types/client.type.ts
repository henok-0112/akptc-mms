export const ClientTypes = {
  ADMINISTRATIVE_STAFF: "Administrative Staff",
  TRAINER: "Trainer",
  TRAINEE: "Trainee",
  GUEST: "Guest",
} as const;

export type Client =
  | {
      clientType: typeof ClientTypes.ADMINISTRATIVE_STAFF;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      office: string;
      jobResponsibility: string;
      picture: {
        picturePath: string;
      };
      materials: Array<{
        material: {
          id: number;
          brand: string;
          model: string;
          serialNumber: string;
          type: string;
          ownership: string;
        };
      }>;
    }
  | {
      clientType: typeof ClientTypes.TRAINER;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      department: string;
      picture: {
        picturePath: string;
      };
      materials: Array<{
        material: {
          id: number;
          brand: string;
          model: string;
          serialNumber: string;
          type: string;
          ownership: string;
        };
      }>;
    }
  | {
      clientType: typeof ClientTypes.TRAINEE;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      department: string;
      stream: string;
      picture: {
        picturePath: string;
      };
      materials: Array<{
        material: {
          id: number;
          brand: string;
          model: string;
          serialNumber: string;
          type: string;
          ownership: string;
        };
      }>;
    }
  | {
      clientType: typeof ClientTypes.GUEST;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      office: string;
      picture: {
        picturePath: string;
      };
      materials: Array<{
        material: {
          id: number;
          brand: string;
          model: string;
          serialNumber: string;
          type: string;
          ownership: string;
        };
      }>;
    };

export type ClientTypes = (typeof ClientTypes)[keyof typeof ClientTypes];

export type RegisterClientForm =
  | {
      clientType: typeof ClientTypes.ADMINISTRATIVE_STAFF;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image: File;
      office: string;
      jobResponsibility: string;
    }
  | {
      clientType: typeof ClientTypes.TRAINER;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image: File;
      department: string;
    }
  | {
      clientType: typeof ClientTypes.TRAINEE;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image: File;
      department: string;
      stream: string;
    }
  | {
      clientType: typeof ClientTypes.GUEST;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image: File;
      office: string;
    };

export type UpdateClientForm =
  | {
      clientType: typeof ClientTypes.ADMINISTRATIVE_STAFF;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image?: File;
      office: string;
      jobResponsibility: string;
    }
  | {
      clientType: typeof ClientTypes.TRAINER;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image?: File;
      department: string;
    }
  | {
      clientType: typeof ClientTypes.TRAINEE;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image?: File;
      department: string;
      stream: string;
    }
  | {
      clientType: typeof ClientTypes.GUEST;
      name: string;
      age: number;
      gender: string;
      phoneNumber: number;
      subcity: string;
      district: string;
      image?: File;
      office: string;
    };
