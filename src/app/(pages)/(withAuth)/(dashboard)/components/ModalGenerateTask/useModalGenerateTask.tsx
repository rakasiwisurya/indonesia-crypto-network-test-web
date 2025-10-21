import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { generateTask } from "@/app/redux/features/taskSlice";
import { TModalGenerate } from "@/app/types/global";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

const useModalGenerateTask = ({ form, isModalOpen, onCancel }: TModalGenerate) => {
  const [formGenerate] = useForm();

  const [isSet, setIsSet] = useState(false);

  const dispatch = useAppDispatch();

  const { isTaskGenerateLoading, taskGenerate } = useAppSelector(state => state.task);

  const onSetGenerate = () => {
    form.setFieldsValue(taskGenerate);
    setIsSet(true);
  };

  useEffect(() => {
    if (isModalOpen) dispatch(generateTask());
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    if (!isTaskGenerateLoading && (taskGenerate.task_name || taskGenerate.task_desc)) {
      formGenerate.setFieldsValue(taskGenerate);
    }
  }, [isTaskGenerateLoading, taskGenerate]);

  useEffect(() => {
    if (isSet) {
      onCancel();
      setIsSet(false);
    }
  }, [isSet, onCancel]);

  return { formGenerate, isTaskGenerateLoading, onSetGenerate };
};

export default useModalGenerateTask;
