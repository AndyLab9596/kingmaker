/* eslint-disable prefer-const */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { CustomSwitch } from 'src/components/form/CustomSwitch';
import { dashboardDataAction } from 'src/reducers/dashboard/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';

const SelectionControl: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const isClearFilter = useAppSelector((state) => state.dashboard.isClearFilter);
  const dashboardFilterParams = useAppSelector((state) => state.dashboard.dashboardFilterParams);
  const partySelection = [
    {
      id: 1,
      text: 'REP',
      active: true,
      color: '#DE2228',
      filterParams: 'select_control_party',
      filterText: 'Likely Republican',
    },
    {
      id: 2,
      text: 'DEM',
      active: true,
      color: '#4383D9',
      filterParams: 'select_control_party',
      filterText: 'Likely Democratic',
    },
    {
      id: 3,
      text: 'IND',
      active: true,
      color: '#EBBE33',
      filterParams: 'select_control_party',
      filterText: 'Likely Independent',
    },
  ];

  const voteLikeliSelection = [
    {
      id: 1,
      text: 'VERY LIKELY',
      active: true,
      color: '#EBBE33',
      filterParams: 'select_control_vote_prediction',
      filterText: 'Likely',
    },
    {
      id: 2,
      text: 'POSSIBLE',
      active: true,
      color: '#AFB3B6',
      filterParams: 'select_control_vote_prediction',
      filterText: 'Possible',
    },
    {
      id: 3,
      text: 'UNLIKELY',
      active: true,
      color: 'black',
      filterParams: 'select_control_vote_prediction',
      filterText: 'Unlikely',
    },
  ];

  // control party
  const [arrayFilterParty, setArrFilterParty] = useState<string[]>(partySelection.map((it) => it.filterText));

  const onPartySelectChange = (checked, event, filterParams: string) => {
    let staticArrayFilter = [...arrayFilterParty];

    if (checked) {
      setArrFilterParty([...arrayFilterParty, filterParams]);
      staticArrayFilter.push(filterParams);
    }
    if (!checked) {
      const newArrayFilterParty = arrayFilterParty.filter((filter) => filter !== filterParams);
      staticArrayFilter = newArrayFilterParty;
      setArrFilterParty(newArrayFilterParty);
    }
    dispatch(dashboardDataAction.setIsClearFilter(false));
    dispatch(
      dashboardDataAction.setDashboardFilterParams({
        ...dashboardFilterParams,
        select_control_party: staticArrayFilter.toString(),
      }),
    );
  };

  // control voter prediction
  const [arrayFilterVoter, setArrFilterVoter] = useState<string[]>(['Expected', 'Likely', 'Possible', 'Unlikely']);

  const onVoterSelectChange = (checked, event, filterParams: string) => {
    let staticArrayFilter = [...arrayFilterVoter];

    if (checked) {
      setArrFilterVoter([...arrayFilterVoter, filterParams]);
      staticArrayFilter.push(filterParams);
    }
    if (!checked) {
      const newArrayFilterParty = arrayFilterVoter.filter((filter) => filter !== filterParams);
      staticArrayFilter = newArrayFilterParty;
      setArrFilterVoter(newArrayFilterParty);
    }
    dispatch(dashboardDataAction.setIsClearFilter(false));
    dispatch(
      dashboardDataAction.setDashboardFilterParams({
        ...dashboardFilterParams,
        select_control_vote_prediction: staticArrayFilter.toString(),
      }),
    );
  };

  React.useEffect(() => {
    if (isClearFilter) {
      setArrFilterParty(partySelection.map((it) => it.filterText));
      setArrFilterVoter(voteLikeliSelection.map((it) => it.filterText));
    }
  }, [isClearFilter]);

  return (
    <section>
      <div
        className="title-wrapper mb-5"
        css={css`
          max-height: 20%;
          overflow: hidden;
        `}
      >
        <h3 className="title text-black  text-center text-16 font-lato-heavy uppercase  break-words">
          Selection Control
        </h3>
      </div>{' '}
      <section className="flex justify-between switch-wrapper">
        <div className="party mt-25">
          <h3 className="text-13 font-semibold block-title">Party</h3>
          {partySelection.map((select) => (
            <CustomSwitch
              key={select.id}
              bgColor={select.color}
              className="w-65 my-20 block switch"
              checkedChildren={select.text}
              unCheckedChildren={select.text}
              onClick={(checked, event) => onPartySelectChange(checked, event, select.filterText)}
              checked={arrayFilterParty.includes(select.filterText)}
            />
          ))}
        </div>
        <div className="party mt-25">
          <h3 className="text-13 font-semibold block-title">Vote Prediction</h3>
          {voteLikeliSelection.map((select) => (
            <CustomSwitch
              key={select.id}
              bgColor={select.color}
              className="w-110 my-20 block switch"
              checkedChildren={select.text}
              unCheckedChildren={select.text}
              onClick={(checked, event) => onVoterSelectChange(checked, event, select.filterText)}
              checked={arrayFilterVoter.includes(select.filterText)}
            />
          ))}
        </div>
      </section>
    </section>
  );
});

export default SelectionControl;
