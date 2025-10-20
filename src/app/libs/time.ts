import { jwtDecode } from "jwt-decode";

export const expiredSessionTime = (token: string) => {
  const decodedToken = jwtDecode<{ exp: number }>(token);
  const tokenExpired = new Date(decodedToken.exp * 1000);
  const sessionExpiresIn = Math.round((tokenExpired.getTime() - new Date().getTime()) / 1000);
  return sessionExpiresIn;
};

export const years = ((startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const allYears = [];

  for (let i = startYear; i <= currentYear; i++) {
    allYears.unshift(String(i));
  }

  const newAllYears = allYears.map(year => ({
    yearCode: String(year),
    yearName: String(year),
  }));

  return newAllYears;
})();

export const months = (() => {
  const allMonths = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  const newAllMonths = allMonths.map((month, index) => ({
    monthCode: String(index + 1).padStart(2, "0"),
    monthName: month,
  }));

  return newAllMonths;
})();
