import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { navigate } from 'gatsby';
import React from 'react';
import logo from 'src/assets/images/large-logo.svg';
import Logo from 'src/components/logo';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';

const Header: React.FC = React.memo(() => {
  const myProfile = useAppSelector((state) => state.auth.myProfile);
  return (
    <header className="h-117 px-50 py-20">
      <div className="header-container flex items-center h-full">
        <Logo src={logo} />
        <div className="menu flex-1 flex justify-end items-center">
          <a
            className="h-40 w-150 bg-gray-4 mr-45 font-lato-semibold text-white flex items-center justify-center rounded-16 hover:text-red"
            href="mailto:info@kingmakerdata.com"
          >
            Contact US
          </a>
          <div onClick={() => navigate(Path.PROFILE)}>
            <Avatar
              src={myProfile?.avatar}
              size={45}
              className="flex items-center justify-center cursor-pointer"
              icon={<UserOutlined />}
            />
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
