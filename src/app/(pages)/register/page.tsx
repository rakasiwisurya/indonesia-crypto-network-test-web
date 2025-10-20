"use client";

import { Img_Logo_ICN } from "@/app/assets/images";
import CButton from "@/app/components/CButton";
import { TFormRegister } from "@/app/types/auth";
import { Card, Flex, Form, Input } from "antd";
import NextImage from "next/image";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import useRegister from "./useRegister";

const Register = () => {
  const { router, isRegisterLoading, onRegister } = useRegister();

  return (
    <div className="bg-auth">
      <Form onFinish={onRegister}>
        <Flex justify="center" align="center" className="w-full h-screen">
          <Card className="w-80">
            <Flex justify="center" className="mb-5!">
              <NextImage priority src={Img_Logo_ICN} alt="Logo ICN" width={220} height={130} />
            </Flex>

            <Form.Item<TFormRegister>
              name="name"
              className="mb-5"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input addonBefore={<FaUser />} type="text" placeholder="Name" />
            </Form.Item>
            <Form.Item<TFormRegister>
              name="email"
              className="mb-5"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input addonBefore={<FaEnvelope />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item<TFormRegister>
              name="password"
              className="mb-3"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password addonBefore={<FaLock />} placeholder="Password" />
            </Form.Item>

            <Form.Item className="mb-0">
              <CButton
                btnType="primary"
                htmlType="submit"
                loading={isRegisterLoading}
                className="mb-3"
                block
              >
                Register
              </CButton>

              <CButton btnType="outline-indigo" onClick={() => router.push("/login")} block>
                Login
              </CButton>
            </Form.Item>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default Register;
