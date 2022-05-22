import { navigate } from 'gatsby';
import React, { useCallback, useMemo } from 'react';
import LogoAndCheck from 'src/components/logo-and-check';
import { useAuth } from 'src/hooks/useAuth';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import { useAppSelector } from 'src/reducers/model';
import { Path } from 'src/utils/const';
import 'twin.macro';

interface Params {
  email: string;
  type?: 'demo';
}
const AccountActive = React.memo(() => {
  const { logOut } = useAuth();
  const myProfile = useAppSelector((state) => state.auth.myProfile);
  const queryParams = useMemo(() => getParamsUrl<Params>(), []);
  const onOkay = useCallback(() => {
    if (myProfile) {
      logOut(false);
    } else {
      navigate(Path.LOGIN);
    }
  }, [myProfile]);

  return (
    <div className="flex flex-col items-center flex-1 gap-y-40 fhd:gap-y-100 pb-80 pt-68 px-30 ">
      <LogoAndCheck />
      <div tw="text-center">
        <h2 tw="fhd:(text-58 leading-69) hd:(text-40 leading-44) text-35 leading-37 text-red font-lato-semibold">
          Please activate your account
        </h2>
        <p tw="text-gray-dark mt-29 text-20 leading-24 fhd:(text-25 leading-30)">
          We sent you an email with an activation link to <b>{queryParams?.email || myProfile?.email || ''}</b>
        </p>
        <p tw="fhd:(text-25 leading-30) text-20 leading-24">
          Please use the link to activate your {queryParams.type ? ' demo' : ''} account before proceeding.
        </p>
        <div tw="mt-47">
          <button
            type="button"
            tw="border border-red hover:(border-opacity-80) shadow-red text-gray-2 rounded-29 h-46 font-lato-semibold text-19 width[292px]"
            onClick={() => onOkay()}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
});
export default AccountActive;
