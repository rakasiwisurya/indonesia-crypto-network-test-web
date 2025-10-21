import CButton from "@/app/components/CButton";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { deleteTask, getTasks, resetDeleteTask, resetTasks } from "@/app/redux/features/taskSlice";
import { TTask } from "@/app/types/task";
import { Space, TableProps, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const useDashboard = () => {
  const [data, setData] = useState<TTask[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalGenerateOpen, setIsModalGenerateOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const {
    tasks,
    isTasksLoading,

    isTaskDeleteLoading,
    taskDeleteSuccess,
  } = useAppSelector(state => state.task);

  const columns: TableProps<TTask>["columns"] = useMemo(
    () => [
      {
        title: "Task Name",
        dataIndex: "task_name",
        key: "task_name",
      },
      {
        title: "Task Description",
        dataIndex: "task_desc",
        key: "task_desc",
        render: text => <div className="w-72 truncate">{text}</div>,
      },
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        render: text => dayjs(text).format("DD MMM YYYY"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: text => (
          <Tag color={text === "Done" ? "green" : text === "In Progress" ? "gold" : "geekblue"}>
            {text}
          </Tag>
        ),
      },
      {
        title: "Action",
        key: "action",
        width: 115,
        fixed: "right",
        render: (_, record) => (
          <Space size="middle">
            <Tooltip title="Edit Data">
              <CButton
                btnType="warning"
                icon={<FaPenToSquare />}
                onClick={() => onModalEdit(record.id)}
              />
            </Tooltip>

            <Tooltip title="Delete Data">
              <CButton btnType="danger" icon={<FaTrash />} onClick={() => onConfirm(record.id)} />
            </Tooltip>
          </Space>
        ),
      },
    ],
    []
  );

  const getData = useCallback(() => dispatch(getTasks()), [dispatch]);

  const onSearch = (value: string) => {
    const filteredData = data.filter(task => task.task_name.includes(value));
    setData(filteredData);
  };
  const onClear = () => setData(tasks);

  const onModalEdit = (id: string) => {
    setEditId(id);
    setIsModalEditOpen(true);
  };

  const onConfirm = (id: string) => {
    setDeleteId(id);
    setIsModalDeleteOpen(true);
  };

  const onCancelAdd = () => setIsModalAddOpen(false);

  const onCancelEdit = () => {
    setIsModalEditOpen(false);
    setEditId(null);
  };

  const onCancelDelete = useCallback(() => {
    setIsModalDeleteOpen(false);
    setDeleteId(null);
  }, []);

  const onCancelGenerate = () => setIsModalGenerateOpen(false);

  const onDelete = () => {
    dispatch(deleteTask({ id: deleteId }));
  };

  useEffect(() => {
    getData();

    return () => {
      dispatch(resetTasks());
    };
  }, [dispatch, getData]);

  useEffect(() => {
    if (!isTasksLoading) {
      setData(tasks);
      setIsDataLoading(false);
    }
  }, [isTasksLoading, tasks]);

  useEffect(() => {
    if (taskDeleteSuccess) {
      onCancelDelete();
      getData();
      dispatch(resetDeleteTask());
    }
  }, [taskDeleteSuccess, dispatch, getData, onCancelDelete]);

  return {
    columns,
    data,
    editId,
    isDataLoading,
    isTaskDeleteLoading,
    isModalAddOpen,
    isModalEditOpen,
    isModalDeleteOpen,
    isModalGenerateOpen,
    getData,
    onCancelAdd,
    onCancelEdit,
    onCancelDelete,
    onCancelGenerate,
    onDelete,
    onSearch,
    onClear,
    setIsModalAddOpen,
    setIsModalGenerateOpen,
  };
};

export default useDashboard;
