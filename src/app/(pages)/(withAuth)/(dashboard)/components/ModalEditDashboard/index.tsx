import { TModalEdit } from "@/app/types/global";
import useModalEditDashboard from "./useModalEditDashboard";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import Loading from "@/app/components/Loading";
import { TTaskEdit } from "@/app/types/task";
import { statuses } from "@/app/assets/data/constants";
import CButton from "@/app/components/CButton";

const ModalEditDashboard = ({ id, isModalOpen, onCancel, refreshData }: TModalEdit) => {
  const { form, isTaskLoading, isTaskUpdateLoading, onSubmit } = useModalEditDashboard({
    id,
    isModalOpen,
    onCancel,
    refreshData,
  });

  return (
    <Modal
      title="Edit Task"
      open={isModalOpen}
      onCancel={onCancel}
      destroyOnHidden
      closable
      centered
      footer={
        isTaskLoading
          ? null
          : [
              <CButton btnType="default" key="cancel" onClick={onCancel}>
                Cancel
              </CButton>,
              <CButton
                btnType="primary"
                form="editForm"
                key="submit"
                htmlType="submit"
                loading={isTaskUpdateLoading}
              >
                Update
              </CButton>,
            ]
      }
    >
      <Form id="editForm" form={form} layout="vertical" onFinish={onSubmit}>
        {isTaskLoading ? (
          <Loading />
        ) : (
          <>
            <Form.Item<TTaskEdit>
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

            <Form.Item<TTaskEdit>
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

            <Form.Item<TTaskEdit>
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

            <Form.Item<TTaskEdit>
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
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ModalEditDashboard;
