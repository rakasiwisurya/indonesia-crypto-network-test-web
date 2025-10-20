import { TCButton } from "@/app/types/cButton";
import { Button, ButtonProps } from "antd";
import { forwardRef } from "react";

const CButton = forwardRef<HTMLButtonElement, ButtonProps & TCButton>(
  ({ children, btnType, className, ...rest }, ref) => {
    const getButtonTypeClass = (btnType?: string) => {
      const typeMap: Record<string, string> = {
        "outline-violet": "btn-outline-violet",
        violet: "btn-violet",
        "outline-indigo": "btn-outline-indigo",
        indigo: "btn-indigo",
        "outline-secondary": "btn-outline-secondary",
        secondary: "btn-secondary",
        "outline-info": "btn-outline-info",
        info: "btn-info",
        "outline-success": "btn-outline-success",
        success: "btn-success",
        "outline-warning": "btn-outline-warning",
        warning: "btn-warning",
        "outline-danger": "",
        danger: "",
        "outline-primary": "",
        primary: "",
        default: "",
      };
      return typeMap[btnType || "default"];
    };

    return (
      <Button
        {...rest}
        ref={ref}
        type={
          btnType?.includes("outline") || btnType === "default"
            ? "default"
            : "primary"
        }
        danger={btnType === "danger" || btnType === "outline-danger"}
        className={`${getButtonTypeClass(btnType)}${
          className ? ` ${className}` : ""
        }`}
      >
        {children}
      </Button>
    );
  }
);

CButton.displayName = "CButton";

export default CButton;
