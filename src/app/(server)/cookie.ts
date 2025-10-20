"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { sessionKey } from "../assets/data/constants";
import { AESDecrypt, AESEncrypt } from "../libs/crypto";
import { expiredSessionTime } from "../libs/time";

// ==================================== Session Cookie Section ====================================

export const setSessionServer = async (token: string) => {
  const data = AESEncrypt(token);
  const cookieStore = await cookies();

  cookieStore.set(sessionKey, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expiredSessionTime(token),
    sameSite: "lax",
    path: "/",
  });
};

export const getSessionServer = async () => {
  const cookieStore = await cookies();
  const data = cookieStore.has(sessionKey)
    ? AESDecrypt(cookieStore.get(sessionKey)?.value ?? "")
    : null;
  return data;
};

export const hasSessionServer = async () => {
  const cookieStore = await cookies();
  return cookieStore.has(sessionKey);
};

export const destroySessionServer = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(sessionKey);
};

// ==================================== Global Cookie Section ====================================

export const setCookieServer = async (
  key: string,
  data: string | { [key: string]: any },
  config?: Partial<ResponseCookie> | [options: ResponseCookie]
) => {
  if (typeof data === "object") data = JSON.stringify(data);

  const cookieStore = await cookies();
  cookieStore.set(key, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...config,
  });
};

export const getCookieServer = async (key: string, isJson: boolean = true) => {
  const cookieStore = await cookies();
  const data = cookieStore.get(key)?.value ?? "";
  return isJson ? JSON.parse(data) : data;
};

export const hasCookieServer = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.has(key);
};

export const getAllCookieServer = async () => {
  const cookieStore = await cookies();
  return cookieStore.getAll();
};

export const deleteCookieServer = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

export const clearCookiesServer = async () => {
  const cookieStore = await cookies();
  const data = cookieStore.getAll();
  await Promise.all(data.map(async item => cookieStore.delete(item.name)));
};
