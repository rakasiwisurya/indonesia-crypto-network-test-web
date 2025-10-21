import { FormInstance, ModalProps } from "antd";

export type TModalAdd = {
  isModalOpen: boolean;
  onCancel: () => void;
  refreshData: () => void;
};

export type TUseModalAdd = {
  isModalOpen: boolean;
  onCancel: () => void;
  refreshData: () => void;
};

export type TModalEdit = {
  id: string | null;
  isModalOpen: boolean;
  onCancel: () => void;
  refreshData: () => void;
};

export type TUseModalEdit = {
  id: string | null;
  isModalOpen: boolean;
  onCancel: () => void;
  refreshData: () => void;
};

export type TModalGenerate = {
  form: FormInstance<any>;
  isModalOpen: boolean;
  onCancel: () => void;
};

export type TModalConfirmation = {
  cancelText: ModalProps["cancelText"];
  successText: ModalProps["okText"];
  successButtonProps?: ModalProps["okButtonProps"];
  successLoading?: ModalProps["confirmLoading"];
  title: ModalProps["title"];
  open: ModalProps["open"];
  onCancel: ModalProps["onCancel"];
  onSuccess: ModalProps["onOk"];
};
