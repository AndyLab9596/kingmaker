import { UpdateUserProfileArgs } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { message, Modal } from 'antd';
import { navigate } from 'gatsby';
import React, { useCallback, useState } from 'react';
import { CustomButton } from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { appAction } from 'src/reducers/app/action';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';
import { FileService } from 'src/utils/file';
import { formatRequest } from 'src/utils/phone';
import LeftSide from './LeftSide';
import RightSide, { EditProfileForm } from './RightSide';

const ProfileEdit = React.memo(() => {
  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();
  const [isFormChange, setIsFormChange] = useState(false);
  const myProfile = useAppSelector((state) => state.auth.myProfile)!;
  const [confirmModal, setConfirmModal] = useState(false);
  const onSaveChange = useCallback(
    async (data: EditProfileForm) => {
      const newState: UpdateUserProfileArgs = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: formatRequest(data.phone, data.country),
        email: data.email,
        billing_address: {
          address: data.address,
          zipcode: data.zipcode,
          city: data.city,
          suite: data.suit,
          state: data.state,
          first_name: myProfile.billing_address?.first_name,
          last_name: myProfile.billing_address?.last_name,
        },
      };
      try {
        dispatch(appAction.showLoading());
        if (file) {
          const fileData = await FileService.upload(file);
          newState.avatar = fileData.file_path;
        }
        const profile = await apiIns.user.updateProfile(newState);
        dispatch(authAction.updateMyProfile(profile));
        navigate(Path.PROFILE);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        dispatch(appAction.hideLoading());
      }
    },
    [file],
  );
  const onGoBack = (force = false) => {
    if (isFormChange && !force) {
      setConfirmModal(true);
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      <div className="w-full h-full flex">
        <LeftSide file={file} setFile={setFile} onGoBack={onGoBack} />
        <RightSide onSaveChange={onSaveChange} setIsFormChange={setIsFormChange} />
      </div>
      <Modal
        visible={confirmModal}
        closable={false}
        onCancel={() => setConfirmModal(false)}
        footer={null}
        centered
        title={'Are you sure you want to leave this page? Changes you made will not be saved.'}
      >
        <div className="flex items-center justify-center w-full gap-x-20">
          <CustomButton type="default" className="w-100" onClick={() => setConfirmModal(false)}>
            Cancel
          </CustomButton>
          <CustomButton type="primary" className="w-100" onClick={() => onGoBack(true)}>
            Ok
          </CustomButton>
        </div>
      </Modal>
    </>
  );
});

export default ProfileEdit;
