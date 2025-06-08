export type RegisterMaterialForm = {
  brand: string;
  model: string;
  serialNumber: string;
  type: string;
  ownership: string;
  images: File[];
};

export type Material = {
  brand: string;
  model: string;
  serialNumber: string;
  type: string;
  ownership: string;
  pictures: Array<{ picturePath: string }>;
};
