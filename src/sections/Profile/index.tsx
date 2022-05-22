import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const ProfileUI: React.FC = React.memo(() => {
  return (
    <div className="w-full h-full flex">
      <LeftSide />
      <RightSide />
    </div>
  );
});

export default ProfileUI;
