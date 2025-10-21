import CButton from "@/app/components/CButton";
import Loading from "@/app/components/Loading";
import { TModalGenerate } from "@/app/types/global";
import { Form, Input, Modal } from "antd";
import useModalGenerateTask from "./useModalGenerateTask";

const ModalGenerateTask = ({ form, isModalOpen, onCancel }: TModalGenerate) => {
  const { formGenerate, isTaskGenerateLoading, onSetGenerate } = useModalGenerateTask({
    form,
    isModalOpen,
    onCancel,
  });

  return (
    <Modal
      title="Generate Task"
      open={isModalOpen}
      onCancel={onCancel}
      destroyOnHidden
      closable
      centered
      footer={
        isTaskGenerateLoading
          ? null
          : [
              <CButton btnType="default" key="cancel" onClick={onCancel}>
                Cancel
              </CButton>,
              <CButton btnType="violet" key="setTask" onClick={onSetGenerate}>
                Set to Task
              </CButton>,
            ]
      }
    >
      <Form id="addForm" layout="vertical" form={formGenerate}>
        {isTaskGenerateLoading ? (
          <Loading />
        ) : (
          <>
            <Form.Item name="task_name" label="Task Name" className="mb-5">
              <Input placeholder="Task Name" readOnly />
            </Form.Item>

            <Form.Item name="task_desc" label="Task Description">
              <Input.TextArea placeholder="Task Description" autoSize={{ minRows: 5 }} readOnly />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalGenerateTask;
