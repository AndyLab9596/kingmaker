import { css, useTheme } from '@emotion/react';
import { CapturePaymentParams } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/payment/models';
import { message } from 'antd';
import { navigate } from 'gatsby';
import React, { useEffect, useMemo, useState } from 'react';
import { apiIns } from 'src/config/apiClient';
import { useIgnorePayment } from 'src/hooks/useIgnorePayment';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import { AuthLayout } from 'src/layouts/authLayout';
import { appAction } from 'src/reducers/app/action';
import { authAction } from 'src/reducers/auth/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { positionAction } from 'src/reducers/position/action';
import { usStateAction } from 'src/reducers/state/action';
import { Path } from 'src/utils/const';
import { formatMoney } from 'src/utils/format';
import tw from 'twin.macro';
import PaymentForm from './PaymentForm';

interface QueryPayment {
  token: string;
  PayerID: string;
}

const RegisterSection: React.FC = () => {
  useIgnorePayment();
  const dispatch = useAppDispatch();
  const myProfile = useAppSelector((state) => state.auth.myProfile);
  const usState = useAppSelector((state) => state.usState.usState);
  const [tax, setTax] = useState(0);

  const query = getParamsUrl<QueryPayment>();
  const capturePayment: CapturePaymentParams = {
    token: query.token,
    payer_id: query.PayerID,
  };

  const capturePaymentResult = async () => {
    if (query.token) {
      try {
        dispatch(appAction.showLoading());
        await apiIns.payment.capturePaypalPayment(capturePayment);
        const user = await apiIns.user.me();
        dispatch(authAction.updateMyProfile(user));
        navigate(Path.ACCOUNT_SUCCESS_CREATE);
      } catch (error: any) {
        message.error(error.message);
        navigate(Path.PAYMENT);
      } finally {
        dispatch(appAction.hideLoading());
      }
    }
  };

  useEffect(() => {
    if (!query.token || usState.length === 0) return;
    capturePaymentResult();
  }, [query, usState]);

  useEffect(() => {
    if (myProfile) {
      dispatch(usStateAction.getUSState());
      if (myProfile.race) {
        dispatch(positionAction.getPositions(myProfile.race.id));
      }
    }
  }, [myProfile]);

  return (
    <AuthLayout title="PAYMENT METHOD" subChildren={<Summary taxes={tax} />}>
      <div
        css={css`
          width: 80%;
          margin: 0 auto;
        `}
      >
        <div className="billing">
          <h3 className="fhd:text-25 fhd:leading-30 text-16 leading-18 text-red font-semibold mx-auto mt-74">
            Billing Address
          </h3>
        </div>

        <PaymentForm setTax={setTax} myProfile={myProfile} />
      </div>
    </AuthLayout>
  );
};

interface SummaryProps {
  taxes?: number;
}
const Summary: React.FC<SummaryProps> = React.memo((props) => {
  const theme = useTheme();
  const jurisdiction = useAppSelector((state) => state.position.position);
  const myProfile = useAppSelector((state) => state.auth.myProfile)!;

  const positionPrice = useMemo(() => {
    const found = jurisdiction.find((position) => position.id === myProfile.position);
    return found?.price;
  }, [jurisdiction]);

  const { taxes } = props;

  return (
    <div
      css={css`
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        background: ${theme.backgroundColor.whiteRGBA(0.9)};
        border-radius: 5px;
        ${tw`top[35%]`}
      `}
    >
      <div className="py-27 pl-40">
        <h3 className="fhd:text-39 fhd:leading-52 text-32 leading-40 text-red font-bold">SUMMARY</h3>
      </div>

      <div
        className="py-27 px-40 bg-gray-3 bg-opacity-25 flex flex-col justify-between"
        css={css`
          ${tw`fhd:minHeight[150px] `}
          min-height: 120px;
        `}
      >
        <div className="flex justify-between items-center fhd:text-25 fhd:leading-30 text-18 leading-20 font-semibold text-black">
          <p>Subtotal</p>
          <p>{typeof positionPrice === 'number' ? formatMoney(positionPrice) : '--'}</p>
        </div>
        <div className="flex justify-between items-center fhd:text-25 fhd:leading-30 text-18 leading-20 font-semibold text-black">
          <p>
            Taxes<span className="fhd:text-18 fhd:leading-24 text-12 text-background ml-8">(Estimated)</span>
          </p>
          <p>
            {typeof taxes === 'number' && typeof positionPrice === 'number'
              ? formatMoney(taxes * 0.01 * positionPrice)
              : '--'}
          </p>
        </div>
      </div>

      <div
        className="py-27 px-40"
        css={css`
          min-height: 240px;
        `}
      >
        <div className="flex items-center justify-between">
          <p className="fhd:text-25 fhd:leading-30 text-18 leading-20 font-semibold text-black">Total</p>
          <div className="flex items-start justify-center">
            <span className="fhd:text-17 fhd:leading-22 text-12 mr-15">USD</span>
            <p className="fhd:text-37 fhd:leading-49 text-27 leading-27 font-bold text-black">
              {typeof taxes === 'number' && typeof positionPrice === 'number'
                ? formatMoney(positionPrice + taxes * 0.01 * positionPrice)
                : '--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RegisterSection;
