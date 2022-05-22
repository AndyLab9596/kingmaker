import logoLarge from 'src/assets/images/large-logo.svg';
import check from 'src/assets/images/check-img.svg';
import React from 'react';
import 'twin.macro';
const LogoAndCheck = React.memo(() => {
  return (
    <>
      <img src={logoLarge} alt="Logo Large" tw="fhd:(width[240px]) width[140px]" />
      <img src={check} alt="Success" tw="fhd:(width[292px]) width[160px]" />
    </>
  );
});

export default LogoAndCheck;
