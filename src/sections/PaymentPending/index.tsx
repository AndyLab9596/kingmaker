import React from 'react';
import LogoAndCheck from 'src/components/logo-and-check';
import { useAuth } from 'src/hooks/useAuth';
import { useIgnorePayment } from 'src/hooks/useIgnorePayment';
import 'twin.macro';

const PaymentPending = React.memo(() => {
  const { logOut } = useAuth();
  useIgnorePayment();

  return (
    <div className="flex flex-col items-center flex-1 gap-y-40 fhd:gap-y-100 pb-80 pt-68 px-30 ">
      <LogoAndCheck />
      <div tw="text-center">
        <h2 tw="fhd:(text-58 leading-69) text-30 leading-34 text-red font-lato-semibold">Invoice Pending</h2>
        <p tw="text-gray-dark mt-29 fhd:(text-25 leading-33)">
          You will be contacted by Kingmaker staff to set up a manual payment.
        </p>
        <div tw="mt-76">
          <button
            type="button"
            tw="border border-red hover:(border-opacity-80) shadow-red text-gray-2 rounded-29 h-46 font-lato-semibold text-19 width[292px]"
            onClick={() => logOut()}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
});
export default PaymentPending;
