export interface UserInfo {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED" | "SUSPENDED" | string;
  imageUrl: null | string;
}

export interface CourierProfile {
  createdAt: string | null;
  deletedAt: string | null;
  id: string;
  isApproved: boolean;
  isAvailable: boolean;
  isDeleted: boolean;
  joinedAt: string;
  licenseNumber: string;
  nidNumber: string;
  phone: string;
  profileImageId: string;
  profileImageUrl: string;
  resume: string;
  resumePublicId: string;
  role: "COURIER" | string;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED" | string;
  updatedAt: string;
  user: UserInfo;
  userId: string;
  vehicleNumber: string;
  vehicleType: "BIKE" | "CAR" | "VAN" | "TRUCK" | string;
}

export type CourierProfileList = CourierProfile[];
