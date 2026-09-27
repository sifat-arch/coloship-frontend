import { ofetch } from "ofetch";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: baseURL,
  credentials: "include",
  //  credentials: "include", it sets the cookies into browser and send cookies every request automatcily
});

export default apiClient;
