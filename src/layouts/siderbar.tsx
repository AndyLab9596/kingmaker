import React from 'react';

const SiderBar = React.memo(() => {
  return (
    <section className="bg-gray-light pt-50 w-200 h-full pl-20">
      <p className="text-17 font-lato-heavy text-red">Menu</p>
      <section className="mt-60 flex flex-col gap-y-30">
        <p className="font-lato-heavy text-16 leading-19 cursor-poiter">Dashboard</p>
        <p className="font-lato-heavy text-16 leading-19 text-opacity-30 text-black cursor-poiter">Voted</p>
        <p className="font-lato-heavy text-16 leading-19 text-opacity-30 text-black cursor-poiter">Voter Expectation</p>
      </section>
    </section>
  );
});

export default SiderBar;
