import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { SHA1Hash } from "@/app/libs/crypto";
import { notif } from "@/app/libs/notification";
import { register, resetRegister } from "@/app/redux/features/authSlice";
import { TFormRegister } from "@/app/types/auth";
import { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRegister = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isRegisterLoading, registerSuccess } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (registerSuccess) {
      dispatch(resetRegister());
      router.push("/login");
    }
  }, [registerSuccess, router, dispatch]);

  const onRegister: FormProps<TFormRegister>["onFinish"] = async values => {
    const data = {
      name: values.name,
      email: values.email,
      password: SHA1Hash(values.password),
    };

    try {
      dispatch(register(data));
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      notif.error({ description: err.message });
    }
  };

  return { router, isRegisterLoading, onRegister };
};

export default useRegister;
