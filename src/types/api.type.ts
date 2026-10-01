import { CourierProfileList } from "./courier.status";

export interface apiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: Meta;
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: 1;
}
