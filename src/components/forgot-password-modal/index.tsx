import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { MdMail } from 'react-icons/md';
import { CustomButton, CustomFormItem, CustomInput, HeaderModal, SubHeaderModal } from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { useAppForm } from 'src/hooks/useForm';
import { appAction } from 'src/reducers/app/action';
import { useAppDispatch } from 'src/reducers/model';
import validation from 'src/utils/validation';
import { CustomModal } from '../custom-modal';

interface ForgotPasswordProps {
  visible: boolean;
  onShow(show: boolean): void;
  email?: string;
}

interface FormData {
  email: string;
}

enum Layout {
  enterPassword,
  sendSuccess,
}

const ForgotPasswordModal: React.FC<ForgotPasswordProps> = React.memo((props) => {
  const { visible, onShow, email } = props;
  const [layout, setLayout] = useState(Layout.enterPassword);
  const [form] = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { fieldBlur, onBlurField, handleSubmit, resetField } = useAppForm<FormData>(form);
  const onFinish = () =>
    handleSubmit(async (value: FormData) => {
      try {
        dispatch(appAction.showLoading());
        await apiIns.auth.resetPassword(value.email);
      } catch (error) {
        // Do nothing
      } finally {
        dispatch(appAction.hideLoading());
      }
      setLayout(Layout.sendSuccess);
    });

  const onClose = () => {
    resetField();
    onShow(false);
    setLayout(Layout.enterPassword);
  };

  return (
    <CustomModal visible={visible} centered closable={false} footer={null}>
      {layout === Layout.enterPassword && (
        <BiLeftArrowAlt size={20} className="text-red cursor-pointer" onClick={onClose} />
      )}
      <HeaderModal>Reset Password</HeaderModal>
      {layout === Layout.enterPassword ? (
        <Form
          preserve={false}
          layout="vertical"
          form={form}
          requiredMark={false}
          initialValues={{
            email: email || '',
          }}
          validateTrigger="onBlur"
          className="mt-20 flex flex-col gap-y-20 px-50"
        >
          <SubHeaderModal>Enter your email address to reset your password.</SubHeaderModal>
          <CustomFormItem
            rules={[
              {
                required: true,
                message: validation.email.required,
              },
              {
                type: 'email',
                message: validation.email.invalid,
              },
            ]}
            hasFeedback={!!fieldBlur['email']}
            name="email"
          >
            <CustomInput
              placeholder="Enter Email"
              disabled={!!email}
              type="email"
              onBlur={() => onBlurField('email')}
              prefix={<MdMail className="text-gray" />}
            />
          </CustomFormItem>
          <CustomButton type="primary" danger htmlType="button" onClick={onFinish}>
            Submit
          </CustomButton>
        </Form>
      ) : (
        <div className="flex flex-col mt-20 justify-center items-center px-50">
          <SubHeaderModal className="text-center">
            An email with password reset instructions has been sent to
            <span className="text-red font-lato-bold"> {form.getFieldValue('email')}</span>, if it exists on our system.
          </SubHeaderModal>
          <CustomButton className="w-full mt-40" type="primary" danger onClick={onClose}>
            Done
          </CustomButton>
        </div>
      )}
    </CustomModal>
  );
});

export default ForgotPasswordModal;
