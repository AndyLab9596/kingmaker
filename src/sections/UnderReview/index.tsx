import { navigate } from 'gatsby-link';
import React from 'react';
import LogoAndCheck from 'src/components/logo-and-check';
import { getParamsUrl } from 'src/hooks/useQueryParam';
import { Path } from 'src/utils/const';
import 'twin.macro';

interface Params {
  isDemo: string;
}
const UnderReview = React.memo(() => {
  const query = getParamsUrl<Params>();
  console.log({ query });
  return (
    <div className="flex flex-col items-center flex-1 gap-y-40 fhd:gap-y-100 pb-80 pt-68 px-30 ">
      <LogoAndCheck />
      <div tw="text-center">
        <h2 tw="fhd:(text-58 leading-69) text-30 leading-34 text-red font-lato-semibold">
          Your account is under review
        </h2>
        <p tw="text-gray-dark mt-29 fhd:(text-25 leading-33)">
          We will contact you via email once your {query.isDemo ? 'demo ' : ''}account
        </p>
        <p tw="text-gray-dark fhd:(text-25 leading-33)">has been approved</p>
        <div tw="mt-47">
          <button
            type="button"
            tw="border border-red hover:(border-opacity-80) shadow-red text-gray-2 rounded-29 h-46 font-lato-semibold text-19 width[292px]"
            onClick={() => navigate(Path.LOGIN)}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
});
export default UnderReview;
