import { navigate } from 'gatsby';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import Avatar from 'src/components/avatar';
import { CustomLabel } from 'src/components/form';
import { ProfileButtonAction } from 'src/components/profile';
import ProfileLeftLayout from 'src/components/profile/LeftLayout';
import { ProfilePosition } from 'src/components/profile/Position';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';
import 'twin.macro';

const LeftSide = () => {
  const profile = useAppSelector((state) => state.auth.myProfile);
  return profile ? (
    <ProfileLeftLayout>
      <div className="w-full flex justify-center" tw="margin-top[100px]">
        <Avatar src={profile.avatar} size={160} />
      </div>
      <div className="flex  flex-col items-center gap-y-40">
        <CustomLabel className="text-white text-center mt-23 text-20">{profile.username}</CustomLabel>

        <ProfileButtonAction onClick={() => navigate(Path.PROFILE_EDIT)}>
          <FaEdit />
          <span className="mt-3">Edit Profile</span>
        </ProfileButtonAction>
      </div>
      <div className="pl-30">
        <ProfilePosition />
      </div>
    </ProfileLeftLayout>
  ) : null;
};

export default LeftSide;
