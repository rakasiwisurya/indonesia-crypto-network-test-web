import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { SHA1Hash } from "@/app/libs/crypto";
import { notif } from "@/app/libs/notification";
import { login, resetLogin } from "@/app/redux/features/authSlice";
import { TFormLogin } from "@/app/types/auth";
import { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useLogin = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoginLoading, loginSuccess } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (loginSuccess) {
      dispatch(resetLogin());
      router.push("/");
    }
  }, [loginSuccess, router, dispatch]);

  const onLogin: FormProps<TFormLogin>["onFinish"] = async values => {
    const data = {
      email: values.email,
      // password: SHA1Hash(values.password),
      password: values.password,
    };

    try {
      dispatch(login(data));
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      notif.error({ description: err.message });
    }
  };

  return { router, isLoginLoading, onLogin };
};

export default useLogin;
