import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useMemo, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { RiPhoneFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import ForgotPasswordModal from 'src/components/forgot-password-modal';
import {
  CustomButton,
  CustomFormItem,
  CustomInput,
  CustomOption,
  CustomPhoneNumber,
  CustomSelect,
} from 'src/components/form';
import ProfileRightLayout from 'src/components/profile/RightLayout';
import { apiIns } from 'src/config/apiClient';
import { useAppForm } from 'src/hooks/useForm';
import { useAppSelector } from 'src/reducers/model';
import { usStateAction } from 'src/reducers/state/action';
import { parsePhone } from 'src/utils/phone';
import validation from 'src/utils/validation';
import * as yup from 'yup';
import zipcodes from 'zipcodes-nrviens';

const validateEmail = yup.object().shape({
  email: yup.string().email(),
});

export interface EditProfileForm {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  suit: string;
  city: string;
  state: number;
  zipcode: string;
}
interface RightSideProps {
  onSaveChange(data: EditProfileForm): void;
  setIsFormChange(value: boolean): void;
}
const RightSide: React.FC<RightSideProps> = React.memo((props) => {
  const myProfile = useAppSelector((state) => state.auth.myProfile)!;
  const [form] = useForm<EditProfileForm>();
  const [showModalResetPwd, setModalResetPwd] = useState(false);
  const { fieldBlur, handleSubmit, onBlurField } = useAppForm<EditProfileForm>(form);
  const dispatch = useDispatch();
  const usState = useAppSelector((state) => state.usState.usState);
  const { country, phone } = useMemo(() => {
    if (myProfile.phone) {
      const phone = parsePhone(myProfile.phone);
      return { country: phone.country, phone: phone.formatNational() };
    }
    return {
      country: '',
      phone: '',
    };
  }, [myProfile.phone]);

  const emailExisting = async (email: string) => {
    try {
      return apiIns.user.existsEmail(email);
    } catch (error) {
      return true;
    }
  };

  const onSaveChange = () =>
    handleSubmit((data) => {
      props.onSaveChange(data);
    });

  useEffect(() => {
    dispatch(usStateAction.getUSState());
  }, []);

  return (
    <>
      <ProfileRightLayout title="Edit Profile">
        <Form
          onValuesChange={() => props.setIsFormChange(true)}
          form={form}
          initialValues={{
            firstName: myProfile.first_name || '',
            lastName: myProfile.last_name || '',
            country: country,
            phone: phone,
            email: myProfile.email,
            address: myProfile.billing_address?.address ?? '',
            suit: myProfile.billing_address?.suite ?? '',
            city: myProfile.billing_address?.city ?? '',
            state: myProfile.billing_address?.state ?? '',
            zipcode: myProfile.billing_address?.zipcode ? myProfile.billing_address?.zipcode.toString() : '',
          }}
          layout="vertical"
          requiredMark={false}
          className="pr-12 flex flex-col"
          validateTrigger="onBlur"
        >
          <div className="flex">
            <div className="w-60 flex items-center pb-24">
              <FaUserAlt size={24} className="text-background" />
            </div>
            <div className="flex-1 grid gap-x-14 grid-cols-3">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: validation.firstName.required,
                    whitespace: true,
                  },
                ]}
                hasFeedback={!!fieldBlur['firstName']}
                name="firstName"
              >
                <CustomInput onBlur={() => onBlurField('firstName')} />
              </CustomFormItem>
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: validation.lastName.required,
                    whitespace: true,
                  },
                ]}
                name="lastName"
                hasFeedback={!!fieldBlur['lastName']}
              >
                <CustomInput onBlur={() => onBlurField('lastName')} />
              </CustomFormItem>
            </div>
          </div>
          {/* Phone */}
          <div className="flex">
            <div className="w-60 flex items-center pb-24">
              <RiPhoneFill size={27} className="text-background" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-x-14">
              <CustomPhoneNumber
                className="col-span-2"
                hasFeedback={!!fieldBlur['phone']}
                onBlur={() => onBlurField('phone')}
              />
            </div>
          </div>
          {/* End Phone */}
          <div className="flex">
            <div className="w-60 flex items-center pb-24">
              <MdEmail size={27} className="text-background" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-x-14">
              <div className="col-span-2">
                <CustomFormItem
                  name="email"
                  hasFeedback={!!fieldBlur['email']}
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
                        if (!value || value === myProfile.email) {
                          return Promise.resolve();
                        }
                        const isValidEmail = await validateEmail.isValid({
                          email: value,
                        });
                        if (!isValidEmail) {
                          return Promise.resolve();
                        }
                        const isExist = await emailExisting(value);
                        if (!isExist) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error(validation.email.existing));
                        }
                      },
                    }),
                  ]}
                >
                  <CustomInput onBlur={() => onBlurField('email')} />
                </CustomFormItem>
              </div>
            </div>
          </div>
          {/* Billing */}
          <div className="flex">
            <div className="w-60 flex items-center pb-24 pt-30">
              <MdLocationOn size={27} className="text-background" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-x-14">
              <div className="col-span-2">
                <CustomFormItem
                  rules={[
                    {
                      required: true,
                      message: validation.billingAddress.required,
                      whitespace: true,
                    },
                  ]}
                  name="address"
                  hasFeedback={!!fieldBlur['address']}
                  label="Billing Address"
                >
                  <CustomInput onBlur={() => onBlurField('address')} />
                </CustomFormItem>
              </div>

              <CustomFormItem
                name="suit"
                label={
                  <div className="flex gap-x-5">
                    <b>Apt./ Suite/ etc</b>
                    <span className="font-lato-semibold fhd:text-18 text-13 text-background">(Optional)</span>
                  </div>
                }
              >
                <CustomInput />
              </CustomFormItem>
            </div>
          </div>
          <div className="flex">
            <div className="w-60 flex items-center pb-24"></div>
            <div className="flex-1 grid grid-cols-3 gap-x-14">
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    message: validation.city.required,
                    whitespace: true,
                  },
                ]}
                name="city"
                hasFeedback={!!fieldBlur['city']}
                label="City"
              >
                <CustomInput onBlur={() => onBlurField('city')} />
              </CustomFormItem>
              <CustomFormItem
                rules={[
                  {
                    required: true,
                    type: 'number',
                    message: validation.state.required,
                    whitespace: true,
                  },
                ]}
                name="state"
                hasFeedback={!!fieldBlur['state']}
                label="State"
              >
                <CustomSelect notFoundContent={<a>not found</a>} onBlur={() => onBlurField('state')}>
                  {usState.map((item) => (
                    <CustomOption value={item.id!} key={item.id}>
                      {item.name ?? ''}
                    </CustomOption>
                  ))}
                </CustomSelect>
              </CustomFormItem>
              <CustomFormItem
                dependencies={['state']}
                rules={[
                  {
                    required: true,
                    message: validation.zipcode.required,
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const userInputZipcodes = zipcodes.lookup(value);
                      const state = getFieldValue('state');
                      const foundState = usState.find((f) => f.id === state);
                      if (!value || (foundState && userInputZipcodes.state === foundState.abbr)) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error(validation.zipcode.invalid));
                    },
                  }),
                ]}
                name="zipcode"
                hasFeedback={!!fieldBlur['zipcode']}
                label="Zip Code"
              >
                <CustomInput onBlur={() => onBlurField('zipcode')} />
              </CustomFormItem>
            </div>
          </div>
          {/* End Billing */}
          <div className="flex">
            <div className="w-60"> </div>
            <div className="flex-1 grid grid-cols-3 gap-x-14">
              <div className="col-span-2 grid grid-flow-row gap-y-20">
                <CustomButton type="primary" danger htmlType="button" onClick={onSaveChange}>
                  Save Changes
                </CustomButton>
                <CustomButton type="primary" onClick={() => setModalResetPwd(true)}>
                  Reset Password
                </CustomButton>
              </div>
            </div>
          </div>
        </Form>
      </ProfileRightLayout>
      <ForgotPasswordModal email={myProfile.email} onShow={setModalResetPwd} visible={showModalResetPwd} />
    </>
  );
});

export default RightSide;
