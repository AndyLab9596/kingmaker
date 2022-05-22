import React from 'react';
import logoLarge from 'src/assets/images/large-logo.svg';
import GroupSuccess from 'src/assets/images/group-active-account-success.png';
import 'twin.macro';
import { navigate } from 'gatsby';
import { Path } from 'src/utils/const';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useAppSelector } from 'src/reducers/model';

const AccountSuccessCreate = () => {
  const profile = useAppSelector((state) => state.auth.myProfile);

  return (
    <div tw="flex flex-col items-center pt-68 px-30 pb-80">
      <img src={logoLarge} alt="Logo Large" tw="fhd:(width[240px]) w-120" />
      <div tw="mt-48">
        <img src={GroupSuccess} alt="" tw="fhd:(width[556px]) width[340px]" />
      </div>
      <div tw="text-center margin-top[-50px]">
        <h2 tw="fhd:(text-58 leading-69) text-30 leading-34 text-red font-lato-semibold">
          Account is successfully created
        </h2>
        <p tw="text-gray-dark mt-29 text-20 leading-22 fhd:(text-25 leading-30)">
          {profile?.is_demo_account
            ? 'Kingmaker Data will be in touch with you to schedule a demo'
            : 'Welcome to Kingmaker Data!'}
        </p>
        <div tw="mt-47 flex justify-center">
          <button
            type="button"
            tw="border border-red hover:(border-opacity-80) shadow-red text-gray-2 rounded-29 h-46 font-lato-semibold text-19 width[292px] flex items-center justify-center"
            onClick={() => navigate(Path.DASHBOARD)}
          >
            Continue to Dashboard
            <BiRightArrowAlt size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSuccessCreate;
