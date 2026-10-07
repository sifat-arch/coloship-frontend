export enum VehicleType {
  BIKE = "BIKE",
  BICYCLE = "BICYCLE",
  MOTORCYCLE = "MOTORCYCLE",
  VAN = "VAN",
  TRUCK = "TRUCK",
}

export type courierApplicationData = {
  phone: string;
  vehicleType: VehicleType | string;
  nidNumber: string;
  vehicleNumber: string;
  licenseNumber: string;
};

export type courierApplicationPayload = {
  data: courierApplicationData;
  resume: File;
  profileImage: File;
};
