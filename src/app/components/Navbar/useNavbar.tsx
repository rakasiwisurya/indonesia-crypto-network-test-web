import { useAppDispatch } from "@/app/hooks/redux";
import { logout } from "@/app/redux/features/authSlice";
import { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

const useNavbar = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const onLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: <div onClick={onLogout}>Logout</div>,
      icon: <FaSignOutAlt />,
    },
  ];

  return { items };
};

export default useNavbar;
