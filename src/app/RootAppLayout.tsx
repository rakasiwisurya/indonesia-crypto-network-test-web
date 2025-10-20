"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { userKey } from "./assets/data/constants";
import Loading from "./components/Loading";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { webStorage } from "./libs/webStorage";
import store from "./redux/app/store";
import { setUser } from "./redux/features/authSlice";

const RootAppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <AppLayout>{children}</AppLayout>
    </Provider>
  );
};

const AppLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const { isAppLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(setUser(webStorage.get(userKey) ?? null));
  }, [dispatch]);

  if (isAppLoading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return <AntdRegistry>{children}</AntdRegistry>;
};

export default RootAppLayout;
