import React, { useRef } from 'react';
import UploadAvatar from 'src/components/avatar/Upload';
import { CustomLabel } from 'src/components/form';
import { ProfileButtonAction } from 'src/components/profile';
import ProfileLeftLayout from 'src/components/profile/LeftLayout';
import { ProfilePosition } from 'src/components/profile/Position';
import { useAppSelector } from 'src/reducers/model';
import 'twin.macro';
interface LeftSideProps {
  file?: File;
  setFile(file?: File): void;
  onGoBack(): void;
}
const LeftSide: React.FC<LeftSideProps> = React.memo((props) => {
  const { setFile, file, onGoBack } = props;
  const profile = useAppSelector((state) => state.auth.myProfile);
  const ref = useRef<HTMLInputElement>(null);
  const onChangeImage = (event) => {
    console.log(event.target.files);
    if (event?.target?.files) {
      setFile(event?.target?.files[0]);
    } else {
      setFile(undefined);
    }
  };

  return profile ? (
    <ProfileLeftLayout>
      <div className="w-full flex justify-center" tw="margin-top[100px]">
        <UploadAvatar
          file={file}
          src={profile.avatar}
          className="cursor-pointer"
          size={160}
          onClick={() => ref.current?.click()}
        />
        <input type="file" accept="image/*" hidden ref={ref} onChange={onChangeImage} name="" id="" />
      </div>
      <div className="flex justify-center flex-col items-center gap-y-40">
        <CustomLabel className="text-white text-center mt-23">{profile.username}</CustomLabel>

        <ProfileButtonAction onClick={() => onGoBack()}>Go Back</ProfileButtonAction>
      </div>
      <div className="pl-30">
        <ProfilePosition />
      </div>
    </ProfileLeftLayout>
  ) : null;
});

export default LeftSide;
