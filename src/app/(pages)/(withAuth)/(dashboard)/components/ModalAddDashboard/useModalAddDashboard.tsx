import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { addTask, resetAddTask } from "@/app/redux/features/taskSlice";
import { TUseModalAdd } from "@/app/types/global";
import { TTaskAdd } from "@/app/types/task";
import { FormProps } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const useModalAddDashboard = ({ isModalOpen, onCancel, refreshData }: TUseModalAdd) => {
  const dispatch = useAppDispatch();

  const { isTaskAddLoading, taskAddSuccess } = useAppSelector(state => state.task);

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
    if (taskAddSuccess) {
      refreshData();
      dispatch(resetAddTask());
      onCancel();
    }
  }, [taskAddSuccess, dispatch, refreshData, onCancel]);

  return { isTaskAddLoading, onSubmit };
};

export default useModalAddDashboard;
