import { CourierProfileList } from "./courier.status";

export interface apiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
