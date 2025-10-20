import axios from "axios";
import { getSessionServer } from "../(server)/cookie";

export const api = (contentType: "json" | "formData" | undefined) => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`,
  });

  instance.interceptors.request.use(
    async (config: any) => {
      const session = await getSessionServer();

      const newConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: session ? `Bearer ${session}` : undefined,
          "Content-Type": contentType === "formData" ? "multipart/form-data" : "application/json",
        },
      };

      return newConfig;
    },
    error => Promise.reject(error)
  );

  return instance;
};
