import { Form, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';
import { CustomModal } from 'src/components/custom-modal';
import { CustomButton, CustomFormItem, CustomInput, HeaderModal, SubHeaderModal } from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { useAppForm } from 'src/hooks/useForm';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import { LoginParamTypes } from 'src/pages/login';
import { appAction } from 'src/reducers/app/action';
import { useAppDispatch } from 'src/reducers/model';
import regex from 'src/utils/regularExpression';
import validation from 'src/utils/validation';

interface NewPasswordModalForm {
  password: string;
  confirmPassword: string;
}

export interface NewPasswordType {
  token: string;
  type: LoginParamTypes;
  user: string;
}

enum Layout {
  newPwd,
  success,
}

const NewPasswordModal: React.FC = React.memo(() => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [form] = useForm<NewPasswordModalForm>();
  const [layout, setLayout] = useState(Layout.newPwd);
  const { handleSubmit, onBlurField, fieldBlur } = useAppForm<NewPasswordModalForm>(form);

  const onFinish = () =>
    handleSubmit(async (data: NewPasswordModalForm) => {
      const query = getParamsUrl<NewPasswordType>();
      if (!query.token || !query.type) return;
      try {
        // do nothing
        dispatch(appAction.showLoading());
        await apiIns.auth.resetPasswordConfirm(data.password, query.token, query.user);
        setLayout(Layout.success);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        dispatch(appAction.hideLoading());
      }
    });

  const onClose = () => {
    setVisible(false);
    setLayout(Layout.newPwd);
    navigate('#', {
      replace: true,
    });
  };

  useEffect(() => {
    const query = getParamsUrl<NewPasswordType>();
    if (query.token && query.type === LoginParamTypes.resetPassword && query.user) {
      setVisible(true);
    }
  }, []);

  return (
    <CustomModal visible={visible} centered closable={false} footer={null}>
      <BiLeftArrowAlt size={20} className="text-red cursor-pointer" onClick={onClose} />
      <HeaderModal>Reset Password</HeaderModal>
      {layout === Layout.newPwd ? (
        <>
          <SubHeaderModal className="mt-20 text-center">Please create a new password.</SubHeaderModal>
          <Form
            preserve={false}
            layout="vertical"
            onFinish={onFinish}
            form={form}
            requiredMark={false}
            validateTrigger="onBlur"
            className="mt-20 flex flex-col px-50"
          >
            <CustomFormItem
              label="Password"
              name="password"
              hasFeedback={!!fieldBlur['password']}
              rules={[
                {
                  required: true,
                  message: validation.password.required,
                },
                {
                  pattern: regex.password,
                  message: validation.password.invalidPwdRegex,
                },
              ]}
            >
              <CustomInput
                onBlur={() => onBlurField('password')}
                type="password"
                prefix={<FaLock className="text-gray" />}
              />
            </CustomFormItem>
            <CustomFormItem
              label="Confirm Password"
              name="confirmPassword"
              hasFeedback={!!fieldBlur['confirmPassword']}
              rules={[
                {
                  required: true,
                  message: validation.confirmPassword.required,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(validation.confirmPassword.notMatch));
                  },
                }),
              ]}
            >
              <CustomInput
                onBlur={() => onBlurField('confirmPassword')}
                type="password"
                prefix={<FaLock className="text-gray" />}
              />
            </CustomFormItem>
            <CustomButton htmlType="button" onClick={() => onFinish()} className="mt-20" danger type="primary">
              Submit
            </CustomButton>
          </Form>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center px-50">
          <SubHeaderModal className="mt-20">Your password has been reset successfully!</SubHeaderModal>
          <CustomButton className="w-full mt-30" type="primary" danger onClick={onClose}>
            Done
          </CustomButton>
        </div>
      )}
    </CustomModal>
  );
});

export default NewPasswordModal;
