export type TCTriCheckbox = boolean | null;
export type TCTriCheckboxProps = {
  checked?: TCTriCheckbox;
  defaultChecked?: TCTriCheckbox;
  onChange: (value: TCTriCheckbox) => void;
};
