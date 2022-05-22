import { css } from '@emotion/react';
import { DashboardFilterParams } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/dashboard/models';
import React, { useEffect } from 'react';
import { dashboardDataAction } from 'src/reducers/dashboard/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import CampaignContact from './CampaignContact';
import CityCouncilDistrictChart from './CityCouncilDistrictChart';
import GenderAndEsimatedChart from './GenderAndEstimatedParty';
import Map from './Map';
import SelectionControlAndAgeRanges from './SelectionControlAndAgeRanges';
import VotedAndNotVoted from './VotedAndNotVoted';
import VoterAndPreferred from './VoterAndPreferred';
import { VoterPools } from './VoterPools';

const Dashboard = React.memo(() => {
  const dispatch = useAppDispatch();

  const dashboardFilterParams = useAppSelector((state) => state.dashboard.dashboardFilterParams);

  const handleChangeFilter = (newFilter: DashboardFilterParams) => {
    if (newFilter) {
      dispatch(
        dashboardDataAction.updateChartFilterParams({
          ...dashboardFilterParams,
          ...newFilter,
        }),
      );
    }
  };

  const myProfile = useAppSelector((state) => state.auth.myProfile)!;
  useEffect(() => {
    if (myProfile.is_demo_account && myProfile.is_demo_account_ready === false) return;
    dispatch(dashboardDataAction.getDashboardData(dashboardFilterParams));
  }, [dashboardFilterParams]);

  return (
    <section
      css={css`
        background-color: rgba(255, 255, 0, 0.2);
        position: relative;
        flex: 1;
      `}
      className="w-full h-full"
    >
      <Map handleFilter={handleChangeFilter} />
      {myProfile.is_demo_account && myProfile.is_demo_account_ready === false ? null : (
        <>
          {/* Section left */}
          <section
            css={css`
              display: flex;
              flex-direction: column;
              position: absolute;
              top: 10px;
              row-gap: 10px;
              left: 20px;
              height: 98%;
              padding-left: 10px;
              overflow: hidden;
              padding-right: 5px;
              padding-bottom: 10px;
              &:hover {
                overflow-y: auto;
                @supports (-moz-appearance: none) {
                  scrollbar-width: thin;
                  scrollbar-color: #888 #f1f1f1;
                }
              }
            `}
          >
            <SelectionControlAndAgeRanges />
            <GenderAndEsimatedChart />
            <VotedAndNotVoted />
            <CityCouncilDistrictChart />
          </section>
          {/* End Section Left */}
          {/* Section Right */}
          <section
            css={css`
              display: flex;
              flex-direction: column;
              position: absolute;
              padding-right: 10px;
              padding-bottom: 10px;
              top: 10px;
              row-gap: 10px;
              right: 20px;
              height: 98%;
              overflow: hidden;
              &:hover {
                overflow-y: overlay;
                /* overflow-y: auto; */
                @supports (-moz-appearance: none) {
                  overflow-y: auto;
                  scrollbar-width: thin;
                  scrollbar-color: #888 #f1f1f1;
                }
              }

              & .ant-card {
                direction: ltr;
              }
            `}
          >
            <VoterPools />
            <VoterAndPreferred />
            <CampaignContact />
          </section>
          {/* End Section Right */}
        </>
      )}
    </section>
  );
});

export default Dashboard;
