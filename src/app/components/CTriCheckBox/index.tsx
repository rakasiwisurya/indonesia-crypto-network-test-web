import { TCTriCheckboxProps } from "@/app/types/cTriCheckBox";
import { Checkbox, CheckboxProps } from "antd";
import useCTriCheckbox from "./useCTriCheckBox";

const CTriCheckBox = ({
  children,
  checked,
  defaultChecked = null,
  onChange,
  ...props
}: Omit<CheckboxProps, "checked" | "defaultChecked" | "onChange"> & TCTriCheckboxProps) => {
  const { value, onClick } = useCTriCheckbox({ checked, defaultChecked, onChange });

  return (
    <Checkbox {...props} checked={value === true} indeterminate={value === null} onClick={onClick}>
      {children}
    </Checkbox>
  );
};

export default CTriCheckBox;
