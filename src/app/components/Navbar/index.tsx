import { Avatar, Dropdown, Layout } from "antd";
import { FaUser } from "react-icons/fa";
import useNavbar from "./useNavbar";
import NextImage from "next/image";
import { Img_Logo_ICN } from "@/app/assets/images";

const { Header } = Layout;

const Navbar = () => {
  const { items } = useNavbar();

  return (
    <Header className="!bg-[#fdfdfd] !p-0 fixed top-0 right-0 flex justify-between items-center transition-all duration-200 z-[110] w-full">
      <div className="px-6">
        <NextImage src={Img_Logo_ICN} alt="ICN Logo" height={56} width={95} />
      </div>
      <div className="py-0 px-6">
        <Dropdown
          menu={{ items, className: "w-[120px]" }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Avatar
            size={30}
            className="!bg-[var(--primary-color)] cursor-pointer"
            icon={<FaUser />}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
