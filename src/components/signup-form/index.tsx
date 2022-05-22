import { css } from '@emotion/react';
import { Form, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useEffect } from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import {
  CustomButton,
  CustomCheckboxX,
  CustomFormItem,
  CustomInput,
  CustomOption,
  CustomPhoneNumber,
  CustomSelect,
  GoBack,
} from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { positionAction } from 'src/reducers/position/action';
import regex from 'src/utils/regularExpression';
import validation from 'src/utils/validation';
import tw from 'twin.macro';
import { useAppForm } from 'src/hooks/useForm';
import { appAction } from 'src/reducers/app/action';
import { formatRequest } from 'src/utils/phone';
import { getParamsUrl, toParams } from 'src/hooks/useQueryParam';
import { navigate } from 'gatsby';
import { Path } from 'src/utils/const';
import { RegisterUserRegisterArgs } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';

interface SignUpFormData {
  username: string;
  password: string;
  confirmPassword: string;
  country: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  race?: string;
  jurisdiction?: string;
  raceJurisdictionRequest?: string;
  governmentLevel: string;
}

interface CreateAccountQueryString {
  email: string;
}

interface SignUpFormProps {
  isDemo?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = React.memo((props) => {
  const { isDemo } = props;
  const governmentLevel = useAppSelector((state) => state.position.governmentLevel);
  const race = useAppSelector((state) => state.position.race);
  const position = useAppSelector((state) => state.position.position);
  const dispatch = useAppDispatch();
  const [form] = useForm<SignUpFormData>();
  const { handleSubmit, onBlurField, fieldBlur } = useAppForm<SignUpFormData>(form);
  const validateUserName = async (username: string) => {
    try {
      const isExist = await apiIns.user.existsUser(username);
      return isExist;
    } catch (error) {
      return false;
    }
  };
  const onCheck = () =>
    handleSubmit(async (data) => {
      const queryParams = getParamsUrl<CreateAccountQueryString>();
      try {
        dispatch(appAction.showLoading());
        const formData: RegisterUserRegisterArgs = {
          first_name: data.firstName,
          last_name: data.lastName,
          // TODO convert to optional
          position: data.jurisdiction!,
          race: data.race!,
          phone: formatRequest(data.phone, data.country),
          username: data.username,
          password1: data.password,
          password2: data.confirmPassword,
          email: queryParams.email,
          is_demo_account: !!isDemo,
          race_jurisdiction_request: data.raceJurisdictionRequest,
          government_level: data.governmentLevel,
        } as any;
        await apiIns.user.register(formData);
        if (data.raceJurisdictionRequest) {
          let uri: string = Path.UNDER_REVIEW;
          if (isDemo) {
            uri += '?' + toParams({ isDemo: true });
          }
          navigate(uri);
        } else {
          navigate(
            Path.ACCOUNT_ACTIVE + '?' + toParams({ email: queryParams.email, type: isDemo ? 'demo' : undefined }),
          );
        }
      } catch (error: any) {
        message.error(error.message);
      } finally {
        dispatch(appAction.hideLoading());
      }
    });

  const onChangeLevel = useCallback((value) => {
    dispatch(positionAction.getRace(value));
    dispatch(positionAction.setPositions([]));
    form.setFieldsValue({
      race: undefined,
      jurisdiction: undefined,
    });
  }, []);

  const onSelectRace = useCallback((value) => {
    dispatch(positionAction.getPositions(value));
    form.setFieldsValue({
      jurisdiction: undefined,
    });
  }, []);

  useEffect(() => {
    dispatch(positionAction.getGovernmentLevel());
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col mt-30"
      name="registerForm"
      requiredMark={false}
      initialValues={{
        country: 'US',
      }}
    >
      <CustomFormItem
        label="Username"
        name="username"
        validateTrigger="onChange"
        hasFeedback
        rules={[
          {
            required: true,
            message: validation.username.required,
            whitespace: true,
          },
          ({ setFields }) => ({
            validator: async (_, value) => {
              if (!value) {
                return Promise.resolve();
              }
              if (!regex.username.test(value)) {
                return Promise.reject(new Error(validation.username.invalid));
              }
              setFields([
                {
                  name: 'username',
                  validating: true,
                },
              ]);
              const isExist = await validateUserName(value);
              setFields([
                {
                  name: 'username',
                  validating: undefined,
                  errors: isExist ? [validation.username.existing] : undefined,
                },
              ]);
              if (!isExist) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(validation.username.existing));
            },
          }),
        ]}
      >
        <CustomInput type="text" prefix={<FaUserAlt className="text-gray" />} />
      </CustomFormItem>
      {/* Password */}
      <CustomFormItem
        label="Password"
        name="password"
        hasFeedback={!!fieldBlur['password']}
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: validation.password.required,
            whitespace: true,
          },
          {
            pattern: regex.password,
            message: validation.password.invalidPwdRegex,
          },
        ]}
      >
        <CustomInput onBlur={() => onBlurField('password')} type="password" prefix={<FaLock className="text-gray" />} />
      </CustomFormItem>
      <CustomFormItem
        label="Confirm Password"
        name="confirmPassword"
        validateTrigger="onBlur"
        hasFeedback={!!fieldBlur['confirmPassword']}
        rules={[
          {
            required: true,
            message: validation.confirmPassword.required,
            whitespace: true,
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
      {/* End Password */}
      {/* Phone */}
      <CustomFormItem label="Phone Number" noStyle>
        <CustomPhoneNumber hasFeedback={!!fieldBlur['phone']} onBlur={() => onBlurField('phone')} />
      </CustomFormItem>
      {/* End Phone */}
      <section className="flex gap-x-15">
        <CustomFormItem
          validateTrigger="onBlur"
          hasFeedback={!!fieldBlur['firstName']}
          rules={[
            {
              required: true,
              message: validation.firstName.required,
              whitespace: true,
            },
          ]}
          label="First Name"
          name="firstName"
          className="w-full"
        >
          <CustomInput onBlur={() => onBlurField('firstName')} type="text" />
        </CustomFormItem>
        <CustomFormItem
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: validation.lastName.required,
              whitespace: true,
            },
          ]}
          label="Last Name"
          name="lastName"
          hasFeedback={!!fieldBlur['lastName']}
          className="w-full"
        >
          <CustomInput onBlur={() => onBlurField('lastName')} type="text" />
        </CustomFormItem>
      </section>
      <CustomFormItem
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: validation.governmentLevel.required,
            whitespace: true,
          },
        ]}
        label="Government Level"
        name="governmentLevel"
      >
        <CustomSelect placeholder="Select Level" onChange={onChangeLevel}>
          {governmentLevel.map((f) => (
            <CustomOption value={f.id!.toString()} key={f.id!}>
              {f.title}
            </CustomOption>
          ))}
        </CustomSelect>
      </CustomFormItem>
      <div className="pb-10">
        <CustomFormItem name="raceOptional" noStyle valuePropName="checked" hasFeedback={false}>
          <CustomCheckboxX className="font-lato-semibold">
            <span className="fhd:text-22 fhd:leading-27">My Race or Jurisdiction is not listed</span>
          </CustomCheckboxX>
        </CustomFormItem>
      </div>

      <CustomFormItem noStyle dependencies={['governmentLevel', 'raceOptional']}>
        {({ getFieldValue }) => {
          const governmentLevel = getFieldValue('governmentLevel');
          const raceOptional = getFieldValue('raceOptional');
          if (!governmentLevel) return null;
          if (raceOptional) {
            return (
              <CustomFormItem
                css={css`
                  .ant-form-item-label {
                    label {
                      ${tw`fhd:(text-20 leading-24) text-15`}
                    }
                  }
                `}
                className="label"
                name="raceJurisdictionRequest"
                label="Please describe which Race & Jurisdiction you need access to"
                rules={[
                  {
                    required: true,
                    message: validation.description.required,
                    whitespace: true,
                  },
                ]}
                validateTrigger="onBlur"
                hasFeedback={!!fieldBlur['raceJurisdictionRequest']}
              >
                <CustomInput
                  type="text"
                  onBlur={() => onBlurField('raceJurisdictionRequest')}
                  placeholder="Enter description"
                />
              </CustomFormItem>
            );
          } else {
            return (
              <section className="flex gap-x-16">
                <CustomFormItem
                  rules={[
                    {
                      required: true,
                      message: validation.race.required,
                      whitespace: true,
                    },
                  ]}
                  name="race"
                  className="w-full"
                  validateTrigger="onBlur"
                >
                  <CustomSelect placeholder="Race" onChange={onSelectRace}>
                    {race.map((item) => (
                      <CustomOption key={item.id} value={item.id}>
                        {item.title}
                      </CustomOption>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
                <CustomFormItem
                  rules={[
                    {
                      required: true,
                      message: validation.jurisdiction.required,
                      whitespace: true,
                      type: 'number',
                    },
                  ]}
                  name="jurisdiction"
                  className="w-full"
                  validateTrigger="onBlur"
                >
                  <CustomSelect placeholder="Jurisdiction">
                    {position.map((item) => (
                      <CustomOption value={item.id!} key={item.id}>
                        {item.position}
                      </CustomOption>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </section>
            );
          }
        }}
      </CustomFormItem>
      {isDemo ? (
        <CustomButton className="w-full" type="primary" htmlType="button" onClick={onCheck}>
          Create Demo Account
        </CustomButton>
      ) : (
        <CustomButton className="w-full" type="primary" danger htmlType="button" onClick={onCheck}>
          Create Account
        </CustomButton>
      )}
      <div className="w-full mt-32">
        <GoBack />
      </div>
    </Form>
  );
});

export default SignUpForm;
