import { statuses } from "@/app/assets/data/constants";
import CButton from "@/app/components/CButton";
import { TModalAdd } from "@/app/types/global";
import { TTaskAdd } from "@/app/types/task";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import useModalAddDashboard from "./useModalAddDashboard";
import ModalGenerateTask from "../ModalGenerateTask";

const ModalAddDashboard = ({ isModalOpen, onCancel, refreshData }: TModalAdd) => {
  const {
    form,
    isTaskAddLoading,
    isModalGenerateOpen,
    onSubmit,
    onCancelGenerate,
    setIsModalGenerateOpen,
  } = useModalAddDashboard({
    isModalOpen,
    onCancel,
    refreshData,
  });

  return (
    <>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={onCancel}
        destroyOnHidden
        closable
        centered
        footer={[
          <CButton btnType="default" key="cancel" onClick={onCancel}>
            Cancel
          </CButton>,
          <CButton
            btnType="primary"
            form="addForm"
            key="submit"
            htmlType="submit"
            loading={isTaskAddLoading}
          >
            Add
          </CButton>,
          <CButton btnType="violet" key="genarate" onClick={() => setIsModalGenerateOpen(true)}>
            Generate Task (AI)
          </CButton>,
        ]}
      >
        <Form
          id="addForm"
          layout="vertical"
          form={form}
          initialValues={{ status: statuses[0] }}
          onFinish={onSubmit}
        >
          <Form.Item<TTaskAdd>
            name="task_name"
            label="Task Name"
            className="mb-5"
            rules={[
              {
                required: true,
                message: "Please input task name!",
              },
            ]}
          >
            <Input placeholder="Task Name" />
          </Form.Item>

          <Form.Item<TTaskAdd>
            name="task_desc"
            label="Task Description"
            className="mb-5"
            rules={[
              {
                required: true,
                message: "Please input task description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Task Description" autoSize={{ minRows: 5 }} />
          </Form.Item>

          <Form.Item<TTaskAdd>
            name="due_date"
            label="Due Date"
            className="mb-5"
            rules={[
              {
                required: true,
                message: "Please input due date!",
              },
            ]}
          >
            <DatePicker placeholder="Due Date" className="w-full" />
          </Form.Item>

          <Form.Item<TTaskAdd>
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please input status!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a status"
              optionFilterProp="children"
              filterOption={(input: string, option?: { label: string; value: string }) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={statuses.map(status => ({
                label: status,
                value: status,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <ModalGenerateTask
        form={form}
        isModalOpen={isModalGenerateOpen}
        onCancel={onCancelGenerate}
      />
    </>
  );
};

export default ModalAddDashboard;
