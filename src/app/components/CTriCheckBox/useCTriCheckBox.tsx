import { TCTriCheckbox, TCTriCheckboxProps } from "@/app/types/cTriCheckBox";
import { CheckboxProps } from "antd";
import { useEffect, useState } from "react";

const useCTriCheckbox = ({
  checked,
  defaultChecked = null,
  onChange,
}: Omit<CheckboxProps, "checked" | "defaultChecked" | "onChange"> & TCTriCheckboxProps) => {
  const [value, setValue] = useState<TCTriCheckbox>(defaultChecked);

  useEffect(() => {
    if (checked !== undefined) setValue(checked);
  }, [checked]);

  const onClick = () => {
    const newValue: TCTriCheckbox = value === true ? false : value === false ? null : true;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return { value, onClick };
};

export default useCTriCheckbox;
