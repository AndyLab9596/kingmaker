import { ButtonProps } from 'antd';
import { CustomButton } from '../form';
import React from 'react';
import 'twin.macro';

export const ProfileButtonAction: React.FC<ButtonProps> = (props) => {
  return (
    <CustomButton
      {...props}
      tw="shadow-red width[220px] border-radius[35px]! text-gray-2! gap-x-5 flex! items-center! justify-center!"
    />
  );
};
