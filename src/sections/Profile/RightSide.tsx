import styled from '@emotion/styled';
import React, { useEffect, useMemo } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { RiPhoneFill } from 'react-icons/ri';
import ProfileRightLayout from 'src/components/profile/RightLayout';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { usStateAction } from 'src/reducers/state/action';
import { formatPhoneUI } from 'src/utils/phone';
import tw from 'twin.macro';

const RightSideStyled = styled.ul`
  ${tw`flex flex-col fhd:gap-40 gap-y-30`}
  .item {
    ${tw`flex items-center`}
    .icon {
      ${tw`w-60`}
    }
    .value {
      ${tw`font-lato-semibold text-18 `}
    }
    .full-name,
    .value {
      color: black;
    }
  }
`;

const RightSide = () => {
  const profile = useAppSelector((state) => state.auth.myProfile);
  const dispatch = useAppDispatch();
  const usState = useAppSelector((state) => state.usState.usState);
  const address = useMemo(() => {
    if (profile && profile.billing_address) {
      const value = profile?.billing_address;
      const state = usState.find((f) => +f.id! === value.state);
      return `${value.address}${value.suite ? ' ' + value.suite : ''}. ${value.city}, ${state ? state.name : ''}, ${
        value.zipcode
      }`;
    }
    return '--';
  }, [usState, profile]);

  useEffect(() => {
    dispatch(usStateAction.getUSState());
  }, []);

  return profile ? (
    <ProfileRightLayout title="Profile Details">
      <RightSideStyled>
        <li className="item">
          <div className="icon">
            <FaUserAlt size={24} />
          </div>
          <span className="text-34 font-lato-bold full-name">{`${profile.first_name} ${profile.last_name}`}</span>
        </li>
        <li className="item">
          <div className="icon">
            <RiPhoneFill size={27} />
          </div>
          <span className="value">{profile.phone ? formatPhoneUI(profile.phone) : 'N/A'}</span>
        </li>
        <li className="item">
          <div className="icon">
            <MdEmail size={27} />
          </div>
          <span className="value">{profile.email}</span>
        </li>
        <li className="item">
          <div className="icon">
            <MdLocationOn size={27} />
          </div>
          <span className="value">{profile.billing_address ? address : 'N/A'}</span>
        </li>
      </RightSideStyled>
    </ProfileRightLayout>
  ) : null;
};

export default RightSide;
