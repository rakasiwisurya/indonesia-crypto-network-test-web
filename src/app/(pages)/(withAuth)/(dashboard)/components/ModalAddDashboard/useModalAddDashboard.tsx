import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { addTask, resetAddTask } from "@/app/redux/features/taskSlice";
import { TUseModalAdd } from "@/app/types/global";
import { TTaskAdd } from "@/app/types/task";
import { FormProps } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const useModalAddDashboard = ({ isModalOpen, onCancel, refreshData }: TUseModalAdd) => {
  const [form] = useForm();

  const [isModalGenerateOpen, setIsModalGenerateOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { isTaskAddLoading, taskAddSuccess } = useAppSelector(state => state.task);

  const onCancelGenerate = () => setIsModalGenerateOpen(false);

  const onSubmit: FormProps<TTaskAdd>["onFinish"] = values => {
    values.due_date = dayjs(values.due_date).format("YYYY-MM-DD");

    dispatch(addTask(values));
  };

  useEffect(() => {
    return () => {
      dispatch(resetAddTask());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen) form.resetFields();
  }, [isModalOpen]);

  useEffect(() => {
    if (taskAddSuccess) {
      form.resetFields();
      refreshData();
      dispatch(resetAddTask());
      onCancel();
    }
  }, [taskAddSuccess, dispatch, refreshData, onCancel]);

  return {
    form,
    isTaskAddLoading,
    isModalGenerateOpen,
    onSubmit,
    onCancelGenerate,
    setIsModalGenerateOpen,
  };
};

export default useModalAddDashboard;
