import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  CreatePaymentParams,
  Method,
  Status,
  Transaction,
} from '@goldfishcode/kingmakerdata-api-sdk/libs/api/payment/models';
import { User } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';
import { Form, message, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { navigate } from 'gatsby-link';
import React, { useEffect } from 'react';
import { PaypalButton } from 'src/components/button/PaypalBtn';
import { CustomButton, CustomFormItem, CustomInput, CustomSelect, GoBack } from 'src/components/form';
import { apiIns } from 'src/config/apiClient';
import { useAppForm } from 'src/hooks/useForm';
import { appAction } from 'src/reducers/app/action';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';
import validation from 'src/utils/validation';
import zipcodes from 'zipcodes-nrviens';

const { Option } = Select;

enum PaymentType {
  PAYPAL = 'PAYPAL',
  MANUAL = 'MANUAL',
}

interface PaymentFormProps {
  setTax: React.Dispatch<React.SetStateAction<number>>;
  myProfile: User | undefined;
}

interface PaymentFormData {
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  city: string;
  suite: string;
}

const PaymentForm: React.FC<PaymentFormProps> = React.memo(({ setTax, myProfile }: PaymentFormProps) => {
  const dispatch = useAppDispatch();
  const usState = useAppSelector((state) => state.usState.usState);
  const [paymentForm] = useForm();
  const { fieldBlur, onBlurField, handleSubmit } = useAppForm<PaymentFormData>(paymentForm);

  useEffect(() => {
    if (!myProfile?.billing_address?.state) return;
    const state = usState.find((state) => Number(state.id) === myProfile?.billing_address?.state);
    paymentForm.setFieldsValue({ state: state?.abbr });
    setTax(state?.taxes as number);
  }, [myProfile, usState]);

  const onStateChange = (value) => {
    paymentForm.setFieldsValue({ state: value });
    const statePicked = usState.find((state) => state.abbr === value);
    const taxes = statePicked?.taxes as number;
    setTax(taxes);
  };

  const onPayment = async (type: PaymentType) =>
    handleSubmit(async (data) => {
      const statePicked = usState.find((state) => state.abbr === paymentForm.getFieldValue('state'));
      const statePickedId = statePicked?.id;
      const paymentInfo: CreatePaymentParams = {
        method: Method[type],
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        zipcode: data.zipcode,
        city: data.city,
        suite: data.suite,
        state: Number(statePickedId),
      };
      try {
        dispatch(appAction.showLoading());
        const paymentCreator: Transaction = await apiIns.payment.createPayment(paymentInfo);
        const myNewProfile: User = await apiIns.user.me();
        dispatch(authAction.updateMyProfile(myNewProfile));

        if (paymentCreator && type === 'PAYPAL') {
          if (paymentCreator.status === Status.PENDING) {
            const paypalUrl = (paymentCreator?.link as any)?.href;
            window.location.href = paypalUrl;
          } else if (paymentCreator.status === Status.CANCEL) {
            navigate(Path.PAYMENT);
            dispatch(appAction.hideLoading());
          }
        } else {
          navigate(Path.PAYMENT_PENDING);
          dispatch(appAction.hideLoading());
        }
      } catch (error: any) {
        message.error(error.message);
        dispatch(appAction.hideLoading());
      }
    });

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-y-9 mt-30"
        name="paymentForm"
        requiredMark={false}
        form={paymentForm}
        validateTrigger="onBlur"
      >
        <div className="flex justify-between align-center">
          <CustomFormItem
            label="First Name"
            name="firstName"
            hasFeedback={!!fieldBlur['firstName']}
            initialValue={myProfile?.first_name}
            css={css`
              width: 49%;
            `}
          >
            <CustomInput onBlur={() => onBlurField('firstName')} type="text" />
          </CustomFormItem>
          <CustomFormItem
            label="Last Name"
            name="lastName"
            hasFeedback={!!fieldBlur['lastName']}
            initialValue={myProfile?.last_name}
            css={css`
              width: 49%;
            `}
          >
            <CustomInput onBlur={() => onBlurField('lastName')} type="text" />
          </CustomFormItem>
        </div>
        <div className="flex justify-between align-center">
          <CustomFormItem
            label="Address"
            name="address"
            initialValue={myProfile?.billing_address?.address}
            hasFeedback={!!fieldBlur['address']}
            rules={[
              {
                required: true,
                message: validation.address.required,
                whitespace: true,
              },
            ]}
            css={css`
              width: 66%;
            `}
          >
            <CustomInput onBlur={() => onBlurField('address')} type="text" />
          </CustomFormItem>
          <CustomFormItem
            hasFeedback={false}
            initialValue={myProfile?.billing_address?.suite}
            label={
              <div className="flex justify-between items-center flex-nowrap">
                <p className="">Apt./Suite/etc</p>
                <p className="text-gray fhd:text-16 text-12 ml-8">(Optional)</p>
              </div>
            }
            name="suite"
            css={css`
              width: 32%;
            `}
          >
            <CustomInput type="text" />
          </CustomFormItem>
        </div>
        <div className="flex justify-between align-center">
          <CustomFormItem
            label="City"
            name="city"
            initialValue={myProfile?.billing_address?.city}
            hasFeedback={!!fieldBlur['city']}
            css={css`
              width: 32%;
            `}
            rules={[
              {
                required: true,
                message: validation.city.required,
                whitespace: true,
              },
            ]}
          >
            <CustomInput onBlur={() => onBlurField('city')} type="text" />
          </CustomFormItem>
          <CustomFormItem
            label="State"
            name="state"
            initialValue={usState[Number(myProfile?.billing_address?.state)]?.abbr}
            hasFeedback={!!fieldBlur['state']}
            css={css`
              width: 32%;
            `}
            rules={[
              {
                required: true,
                message: validation.state.required,
                whitespace: true,
              },
            ]}
          >
            <CustomSelect onBlur={() => onBlurField('state')} onChange={onStateChange}>
              {usState.map((state) => (
                <Option key={state.id} value={state.abbr}>
                  {state.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>

          <CustomFormItem
            label="Zip code"
            name="zipcode"
            initialValue={myProfile?.billing_address?.zipcode?.toString()}
            hasFeedback={!!fieldBlur['zipcode']}
            validateTrigger="onChange"
            dependencies={['state']}
            css={css`
              width: 32%;
            `}
            rules={[
              {
                required: true,
                message: validation.zipcode.required,
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const userInputZipcodes = zipcodes.lookup(value);
                  if (!value || userInputZipcodes.state === getFieldValue('state')) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error(validation.zipcode.invalid));
                },
              }),
            ]}
          >
            <CustomInput onBlur={() => onBlurField('zipcode')} type="text" />
          </CustomFormItem>
        </div>

        <div
          css={css`
            margin-top: 20px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
          `}
        >
          <ButtonWrapper>
            <PaypalButton text={'Checkout with'} onClick={() => onPayment(PaymentType.PAYPAL)} />
          </ButtonWrapper>
          <ButtonWrapper>
            <CustomButton
              type="primary"
              danger
              htmlType="button"
              className="w-full"
              onClick={() => onPayment(PaymentType.MANUAL)}
            >
              Request Alternative Payment
            </CustomButton>
          </ButtonWrapper>
        </div>
        <div className="w-full mt-27">
          <GoBack />
        </div>
      </Form>
    </div>
  );
});

export default PaymentForm;

const ButtonWrapper = styled.div`
  width: 49%;
`;
