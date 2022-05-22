import { css } from '@emotion/react';
import { Divider, Form, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { CustomButton, CustomCheckbox, CustomFormItem, CustomInput } from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { useAppForm } from 'src/hooks/useForm';
import { getParamsUrl, toParams } from 'src/hooks/useQueryParam';
import { LoginQueryParams } from 'src/models';
import { appAction } from 'src/reducers/app/action';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch } from 'src/reducers/model';
import AuthService from 'src/services/auth';
import { Path } from 'src/utils/const';
import { handleErrorMessage } from 'src/utils/handleError';
import validation from 'src/utils/validation';
import 'twin.macro';
import * as yup from 'yup';
import { LoginFormEnum } from './type';

const validateEmail = yup.object().shape({
  email: yup.string().email(),
});

interface EmailForm {
  email: string;
}

enum RegisterType {
  createAccount = 'createAccount',
  requestDemo = 'requestDemo',
}
interface LoginFormSchema {
  username: string;
  password: string;
  remember?: boolean;
}

interface LoginFormProps {
  setShowModalForgotPwd(show: boolean): void;
}
const LoginForm: React.FC<LoginFormProps> = React.memo((props) => {
  const { setShowModalForgotPwd } = props;
  const queryParams = getParamsUrl<LoginQueryParams>();
  const dispatch = useAppDispatch();
  const [showModalResendEmail, setShowModalResendEmail] = useState(false);
  const [registerForm] = useForm<EmailForm>();
  const [loginForm] = useForm<LoginFormSchema>();
  const {
    handleSubmit,
    fieldBlur: fieldEmailBlur,
    onBlurField: onBlurEmailField,
  } = useAppForm<EmailForm>(registerForm);
  const handleUrlNavigation = () => {
    if (!queryParams) return;
    const { redirect_url } = queryParams;
    if (redirect_url) {
      navigate(redirect_url);
    } else {
      navigate(Path.DASHBOARD);
    }
  };

  const onResendEmail = async () => {
    const username = loginForm.getFieldValue('username');
    try {
      await apiIns.auth.resendEmail(username);
      setShowModalResendEmail(false);
      message.success('Resend email successfully');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onLogin = async (formData: LoginFormSchema) => {
    try {
      dispatch(appAction.showLoading());
      await AuthService.signIn({
        password: formData.password,
        username: formData.username,
      });
      const user = await apiIns.user.me();
      if (formData.remember) {
        localStorage.setItem('remember', JSON.stringify('1'));
      } else {
        localStorage.removeItem('remember');
      }
      dispatch(authAction.setLogged(true));
      dispatch(authAction.runAuthenticatedFlow(user));
      handleUrlNavigation();
    } catch (error: any) {
      if (error && error.statusCode === 401) {
        setShowModalResendEmail(true);
      } else {
        message.error(error.message);
      }
    } finally {
      dispatch(appAction.hideLoading());
    }
  };

  const emailExisting = async (email: string) => {
    try {
      return apiIns.user.existsEmail(email);
    } catch (error) {
      return true;
    }
  };

  const onSignupForm = async (email: string, type: RegisterType) => {
    try {
      dispatch(appAction.showLoading());
      switch (type) {
        case RegisterType.createAccount:
          navigate(Path.CREATEA_ACCOUNT + '?' + toParams({ email }));
          break;
        case 'requestDemo':
          navigate(Path.REQUEST_DEMO + '?' + toParams({ email }));
          break;
        default:
          break;
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(appAction.hideLoading());
    }
  };

  const onRequestDemo = (type: RegisterType) =>
    handleSubmit(async (data) => {
      const email: string = data.email;
      await onSignupForm(email, type);
    });

  return (
    <>
      <div
        css={css`
          width: 60%;
          margin: 0 auto;
        `}
      >
        <Form.Provider
          onFormFinish={(name, { values }) => {
            if (name === 'loginForm') {
              onLogin(values as LoginFormSchema);
            }
          }}
        >
          {/* Login Form */}
          <Form
            layout="vertical"
            validateTrigger="onBlur"
            className="flex flex-col mt-30"
            name="loginForm"
            form={loginForm}
            requiredMark={false}
          >
            <CustomFormItem
              label="Username"
              name={LoginFormEnum.username}
              rules={[
                {
                  required: true,
                  message: validation.username.required,
                  whitespace: true,
                },
              ]}
            >
              <CustomInput type="text" prefix={<FaUserAlt className="text-gray" />} />
            </CustomFormItem>
            <CustomFormItem
              label="Password"
              name={LoginFormEnum.password}
              rules={[
                {
                  required: true,
                  message: validation.password.required,
                  whitespace: true,
                },
              ]}
            >
              <CustomInput type="password" prefix={<FaLock className="text-gray" />} />
            </CustomFormItem>
            <CustomButton className="mt-3" type="primary" danger htmlType="submit">
              Login now
            </CustomButton>
            <div className="flex justify-between mt-15">
              <div className="remember flex gap-x-9">
                <CustomFormItem name="remember" valuePropName="checked" hasFeedback={false}>
                  <CustomCheckbox>
                    <span className="fhd:text-18 text-16 font-lato-semibold text-background">Remember me</span>
                  </CustomCheckbox>
                </CustomFormItem>
              </div>
              <a
                type="link"
                className="forgot-pwd text-blue-link font-lato-semibold fhd:text-18 text-16"
                onClick={() => setShowModalForgotPwd(true)}
              >
                Forgot password?
              </a>
            </div>
            <Divider plain>
              <span className="fhd:text-25 text-20">Or sign up with email</span>
            </Divider>
          </Form>
          {/* EndLogin Form */}
          {/* SignUp Form */}
          <Form
            name="emailForm"
            validateTrigger="onBlur"
            layout="vertical"
            className="flex flex-col"
            requiredMark={false}
            form={registerForm}
          >
            <CustomFormItem
              label="Email"
              name="email"
              hasFeedback={!!fieldEmailBlur[LoginFormEnum.email]}
              rules={[
                {
                  required: true,
                  message: validation.email.required,
                },
                {
                  type: 'email',
                  message: validation.email.invalid,
                },
                () => ({
                  validator: async (rule, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    const isValidEmail = await validateEmail.isValid({
                      email: value,
                    });
                    if (!isValidEmail) {
                      return Promise.resolve();
                    }
                    try {
                      const isExist = await emailExisting(value);
                      if (!isExist) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(new Error(validation.email.existing));
                      }
                    } catch (error) {
                      // handleErrorMessage(error, false);
                      const message = handleErrorMessage(error, false);
                      return Promise.reject(message);
                    }
                  },
                }),
              ]}
            >
              <CustomInput onBlur={() => onBlurEmailField(LoginFormEnum.email)} type="email" />
            </CustomFormItem>
            <div className="flex flex-col gap-y-17">
              <CustomButton
                type="primary"
                danger
                htmlType="button"
                onClick={() => onRequestDemo(RegisterType.createAccount)}
              >
                Create Account
              </CustomButton>

              <CustomButton
                className="login-btn"
                type="primary"
                htmlType="button"
                onClick={() => onRequestDemo(RegisterType.requestDemo)}
              >
                Request a Demo
              </CustomButton>
            </div>
          </Form>
          {/* Sign Up form */}
        </Form.Provider>
      </div>
      <Modal
        onCancel={() => setShowModalResendEmail(false)}
        visible={showModalResendEmail}
        title={<p className="text-center">E-mail is not verified</p>}
        footer={null}
      >
        <p className="text-center">
          Have you received a verification email? If not then click the &quot;Resend&quot; button and we&apos;ll get a
          fresh link to you.
        </p>
        <div className="flex justify-center gap-x-20 mt-20">
          <CustomButton className="w-150" onClick={() => setShowModalResendEmail(false)} type="default">
            Cancel
          </CustomButton>
          <CustomButton className="w-150" onClick={() => onResendEmail()} type="primary" danger>
            Resend
          </CustomButton>
        </div>
      </Modal>
    </>
  );
});

export default LoginForm;
