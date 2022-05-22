import React from 'react';
import BackGroundGroup from 'src/assets/images/group2x.png';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Divider } from 'antd';
import { MdOutlineLogout } from 'react-icons/md';
import { useAuth } from 'src/hooks/useAuth';
import Logo from 'src/assets/images/large-logo.svg';
import { navigate } from 'gatsby';
import { Path } from 'src/utils/const';

const RightSideStyle = styled.section`
  background-image: url(${BackGroundGroup});
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 50% 75%;
  ${tw`bg-white-gray`}
`;

interface ProfileRightLayoutProps {
  title: string;
}
const ProfileRightLayout: React.FC<ProfileRightLayoutProps> = React.memo(({ children, title }) => {
  const { logOut } = useAuth();

  return (
    <RightSideStyle className="flex-1 p-50">
      <div className="flex gap-x-30 fhd:gap-x-50">
        <div className="flex-1 pt-20 ">
          <div className="flex justify-between">
            <span className="fhd:text-39 text-28 font-lato-bold text-background uppercase">{title}</span>
            <div
              className="flex gap-x-15 items-center text-red font-lato-semibold cursor-pointer"
              onClick={() => logOut(false)}
            >
              <MdOutlineLogout />
              Logout
            </div>
          </div>
          <Divider className="mt-10" />
          {children}
        </div>
        <div className="pt-10">
          <img src={Logo} onClick={() => navigate(Path.DASHBOARD)} className="cursor-pointer fhd:w-210 w-120" alt="" />
        </div>
      </div>
    </RightSideStyle>
  );
});

export default ProfileRightLayout;
