"use client";

import CButton from "@/app/components/CButton";
import ModalConfirmation from "@/app/components/ModalConfirmation";
import Navbar from "@/app/components/Navbar";
import { Col, Divider, Input, Layout, Row, Table, Typography } from "antd";
import { FaPlus } from "react-icons/fa";
import ModalAddDashboard from "./components/ModalAddDashboard";
import ModalEditDashboard from "./components/ModalEditDashboard";
import useDashboard from "./useDashboard";

const { Content, Footer } = Layout;

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
    <Layout className="min-h-screen">
      <Navbar />
      <Content style={{ margin: "88px 16px 0" }}>
        <div className="p-6 h-full bg-white">
          <Row gutter={[15, 15]}>
            <Col xs={24} md={8} className="text-center md:text-left">
              <Typography.Text className="text-[var(--primary-color)] text-[23px] font-bold">
                Task Management
              </Typography.Text>
            </Col>
            <Col xs={24} md={{ span: 8, offset: 8 }} className="flex! justify-end">
              <CButton
                btnType="primary"
                onClick={() => setIsModalAddOpen(true)}
                className="xs:w-full! md:w-22!"
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
      </Content>
      <Footer className="text-center">Indonesia Crypto Network ©2025</Footer>
    </Layout>
  );
};

export default Dashboard;
