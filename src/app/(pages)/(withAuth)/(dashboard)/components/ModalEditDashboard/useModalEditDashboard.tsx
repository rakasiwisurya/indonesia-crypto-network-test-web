import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import {
  getTask,
  resetTask,
  resetUpdateTask,
  setTask,
  updateTask,
} from "@/app/redux/features/taskSlice";
import { TUseModalEdit } from "@/app/types/global";
import { TTaskEdit } from "@/app/types/task";
import { Form, FormProps } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const useModalEditDashboard = ({ id, isModalOpen, onCancel, refreshData }: TUseModalEdit) => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const { isTaskLoading, task, isTaskUpdateLoading, taskUpdateSuccess } = useAppSelector(
    state => state.task
  );

  const onSubmit: FormProps<TTaskEdit>["onFinish"] = values => {
    values.id = id!;
    values.due_date = dayjs(values.due_date).format("YYYY-MM-DD");

    dispatch(updateTask(values));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateTask());
      dispatch(resetTask());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen) form.resetFields();
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    if (id) dispatch(getTask({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (!isTaskLoading && task) form.setFieldsValue({ ...task, due_date: dayjs(task?.due_date) });
  }, [form, task, isTaskLoading]);

  useEffect(() => {
    if (taskUpdateSuccess) {
      refreshData();
      dispatch(resetUpdateTask());
      onCancel();
    }
  }, [taskUpdateSuccess, dispatch, refreshData, onCancel]);

  return {
    form,
    isTaskLoading,
    isTaskUpdateLoading,
    onSubmit,
  };
};

export default useModalEditDashboard;
