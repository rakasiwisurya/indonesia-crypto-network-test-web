import { redirect } from "next/navigation";
import { TRequestApi } from "../types/requestApi";
import { api } from "./api";
import { notif } from "./notification";

const queryParams = (data: any) => {
  return `?${Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join("&")}`;
};

export const requestApi = async ({
  contentType = "json", //json or formData
  method, //get or post or put or delete or others http method
  endpoint,
  body,
  params,
}: TRequestApi) => {
  try {
    const newParams = params ? queryParams(params) : "";
    const response = await api(contentType)[method](`${endpoint}${newParams}`, body);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) redirect("/login");

    console.error(error);
    notif.error({
      description: error?.response?.data?.message || error.message,
    });
    throw new Error(error);
  }
};
