"use client";

import { Img_Logo_ICN } from "@/app/assets/images";
import CButton from "@/app/components/CButton";
import { TFormLogin } from "@/app/types/auth";
import { Card, Flex, Form, Input } from "antd";
import NextImage from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";
import useLogin from "./useLogin";

const Login = () => {
  const { router, isLoginLoading, onLogin } = useLogin();

  return (
    <div className="bg-auth">
      <Form onFinish={onLogin}>
        <Flex justify="center" align="center" className="w-full h-screen">
          <Card className="w-80">
            <Flex justify="center" className="mb-5!">
              <NextImage priority src={Img_Logo_ICN} alt="Logo ICN" width={220} height={130} />
            </Flex>

            <Form.Item<TFormLogin>
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
            <Form.Item<TFormLogin>
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
                loading={isLoginLoading}
                className="mb-3"
                block
              >
                Login
              </CButton>

              <CButton btnType="outline-indigo" onClick={() => router.push("/register")} block>
                Register
              </CButton>
            </Form.Item>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default Login;
