"use client";

import CButton from "@/app/components/CButton";
import ModalConfirmation from "@/app/components/ModalConfirmation";
import { Col, Divider, Input, Row, Table, Typography } from "antd";
import { FaPlus } from "react-icons/fa";
import ModalAddDashboard from "./components/ModalAddDashboard";
import useDashboard from "./useDashboard";
import ModalEditDashboard from "./components/ModalEditDashboard";

const Dashboard = () => {
  const {
    columns,
    data,
    editId,
    isDataLoading,
    isTaskDeleteLoading,
    isModalAddOpen,
    isModalEditOpen,
    isModalDeleteOpen,
    getData,
    onCancelAdd,
    onCancelEdit,
    onCancelDelete,
    onDelete,
    onSearch,
    onClear,
    setIsModalAddOpen,
  } = useDashboard();

  return (
    <div>
      <Row gutter={[15, 15]}>
        <Col xs={24} md={8} className="text-center md:text-left">
          <Typography.Text className="text-[var(--primary-color)] text-[23px] font-bold">
            Task Management
          </Typography.Text>
        </Col>
        <Col xs={24} md={{ span: 8, offset: 8 }} className="flex justify-end">
          <CButton
            btnType="primary"
            onClick={() => setIsModalAddOpen(true)}
            className="w-100 w-md-50"
            block
          >
            <FaPlus className="mr-2" />
            Add
          </CButton>
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginBottom: 20 }}>
        <Col xs={24} md={{ offset: 14, span: 10 }} lg={{ offset: 17, span: 7 }}>
          <Input.Search
            placeholder="Search"
            onSearch={onSearch}
            onClear={onClear}
            enterButton
            allowClear
          />
        </Col>
      </Row>
      <Table
        className="table-striped-rows"
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        loading={isDataLoading}
        bordered
      />

      <ModalAddDashboard
        isModalOpen={isModalAddOpen}
        onCancel={onCancelAdd}
        refreshData={getData}
      />

      <ModalEditDashboard
        isModalOpen={isModalEditOpen}
        onCancel={onCancelEdit}
        refreshData={getData}
        id={editId}
      />

      <ModalConfirmation
        title="Confirmation Delete"
        open={isModalDeleteOpen}
        onCancel={onCancelDelete}
        cancelText="Cancel"
        onSuccess={onDelete}
        successText="Delete"
        successButtonProps={{ danger: true }}
        successLoading={isTaskDeleteLoading}
      >
        Are you sure want to delete?
      </ModalConfirmation>
    </div>
  );
};

export default Dashboard;
