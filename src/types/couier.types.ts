export type courierApplicationData = {
  phone: string;
  vehicleType: string;
  nidNumber: string;
  vehicleNumber: string;
  licenseNumber: string;
};

export type courierApplicationPayload = {
  data: courierApplicationData;
  resume: File;
  profileImage: File;
};
