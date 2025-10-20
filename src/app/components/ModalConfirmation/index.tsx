import { TModalConfirmation } from "@/app/types/global";
import { Modal } from "antd";
import { PropsWithChildren } from "react";

const ModalConfirmation = ({
  title,
  children,
  open,
  onCancel,
  cancelText,
  onSuccess,
  successText,
  successButtonProps,
  successLoading,
}: TModalConfirmation & PropsWithChildren) => {
  return (
    <Modal
      title={title}
      onCancel={onCancel}
      closable
      cancelText={cancelText}
      okText={successText}
      open={open}
      centered
      onOk={onSuccess}
      okButtonProps={successButtonProps}
      confirmLoading={successLoading}
    >
      {children}
    </Modal>
  );
};

export default ModalConfirmation;
