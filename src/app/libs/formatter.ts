export const formatCapitalize = (value: string | null) => {
  if (!value) return value;

  const words = value.toLowerCase().split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

export const formatNumber = (value?: any) => {
  if (value) return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};

export const parseNumber = (value?: any) => {
  if (value) return value.replace(/,/g, "") as unknown as number;
  return value;
};

export const formatToCurrency = (value: number | string): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Not a Number";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
