export type UserRole = "CUSTOMER" | "COURIER" | "ADMIN";
export type UserStatus = "ACTIVE" | "PENDING" | "BLOCKED" | "SUSPENDED";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  imageUrl: string | null;
  createdAt: string;
}

export interface UserParams {
  searchTerm?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}
