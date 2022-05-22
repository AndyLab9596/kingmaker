import { createReducer } from '@reduxjs/toolkit';
import { dashboardDataAction } from './action';
import { ChartDataType, Dashboard } from './model';

const initialState: Dashboard = {
  dashboardChartData: null,
  ageBracket: null,
  est_party: null,
  gender: null,
  likelyParty: null,
  cityCouncil: null,
  firstLoad: true,
  countLoading: 0,
  ageRange: [],
  dashboardFilterParams: {
    age_bracket: '',
    est_party: '',
    voted: undefined,
    contact_bar: '',
    contact_poll: '',
    voter_likelihood_poll: '',
    voter_likelihood_bar: '',
    city_council: '',
    gender: '',
    polygon: undefined,
    select_control_vote_prediction: 'Expected,Likely,Possible,Unlikely',
  },
  contact_bar: null,
  contact_poll: null,
  voterLikelihoodPoll: null,
  voted: null,
  voterLikelihoodBar: null,
  preferredVotingStyleBar: null,
  dashboardMapData: {
    maps: [],
  },
  isMapUpdate: false,
  isFilterChartsByChart: true,
  isClearFilter: false,
};

const dashboardReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(dashboardDataAction.getDashboardData, (state) => {
      if (state.firstLoad) {
        state.countLoading++;
      }
    })
    .addCase(dashboardDataAction.setDashboardData, (state, action) => {
      state.dashboardChartData = action.payload;
      if (state.isFilterChartsByChart || state.isMapUpdate || state.isClearFilter) {
        // if (state.firstLoad) {
        if (action.payload && action.payload.age_bracket) {
          // find and remove age bracket
          const datasets = Object.values(action.payload.age_bracket).filter((data) => {
            if (isNaN(data)) {
              state.ageRange = data.split('-');
              return;
            }
            return data;
          });
          const labels = Object.keys(action.payload.age_bracket).filter((label) => {
            return label !== 'age_range';
          });
          state.ageBracket = {
            label: [...labels],
            datasets: [...datasets],
          };
        }
        if (action.payload && action.payload.gender) {
          const genderObj = action.payload.gender;

          const genderArray = Object.keys(genderObj).map((key) => {
            return [key, genderObj[key]];
          });

          const renderArray = [] as any;
          genderArray.forEach((item) => {
            if (item[0] === 'Male') {
              renderArray[0] = item;
            }
            if (item[0] === '') {
              renderArray[1] = item;
            }
            if (item[0] === 'Female') {
              renderArray[2] = item;
            }
          });
          const renderLabels = renderArray.map((array) => {
            if (array[0] === '') {
              return 'N/A';
            }
            return array[0];
          });
          const renderValues = renderArray.map((array) => array[1]);

          state.gender = {
            label: renderLabels,
            datasets: renderValues,
          };
        }

        if (action.payload && action.payload.est_party) {
          const estPartyObj = action.payload.est_party;

          const est_partyArray = Object.keys(estPartyObj).map((key) => {
            return [key, estPartyObj[key]];
          });

          const renderArray = [] as any;
          est_partyArray.forEach((item) => {
            if (item[0] === 'Likely Republican') {
              renderArray[0] = item;
            }
            if (item[0] === 'Likely Democratic') {
              renderArray[1] = item;
            }
            if (item[0] === 'Likely Independent') {
              renderArray[2] = item;
            }
          });
          const renderLabels = renderArray.map((array) => array[0].replace('Likely ', ''));
          const renderValues = renderArray.map((array) => array[1]);

          state.est_party = {
            label: renderLabels,
            datasets: renderValues,
          };
        }

        if (action.payload && action.payload.contact_bar) {
          state.contact_bar = {
            label: Object.keys(action.payload.contact_bar),
            datasets: Object.values(action.payload.contact_bar),
          };
        }

        if (action.payload && action.payload.contact_poll) {
          const contactPollData = action.payload.contact_poll;
          const contactPollLabel = Object.keys(contactPollData).reverse();
          const contactPollDatasets = Object.values(contactPollData).reverse();
          state.contact_poll = {
            label: contactPollLabel,
            datasets: contactPollDatasets,
          };
        }

        if (action.payload && action.payload.voted) {
          state.voted = {
            label: Object.keys(action.payload.voted),
            datasets: Object.values(action.payload.voted),
          };
        }

        if (action.payload && action.payload.voter_likelihood_bar) {
          state.voterLikelihoodBar = {
            label: Object.keys(action.payload.voter_likelihood_bar),
            datasets: Object.values(action.payload.voter_likelihood_bar),
          };
        }

        if (action.payload && action.payload.city_council) {
          const cityCouncilObj = action.payload.city_council;
          const sortedCityCouncilObj = {} as ChartDataType;
          Object.keys(cityCouncilObj)
            .sort((a, b) => cityCouncilObj[b] - cityCouncilObj[a])
            .map((item) => (sortedCityCouncilObj[item] = cityCouncilObj[item]));
          const labels = Object.keys(sortedCityCouncilObj).map((label) => {
            if (label === '') {
              return 'N/A';
            }
            return label;
          });
          const datasets = Object.values(sortedCityCouncilObj);
          state.cityCouncil = {
            label: labels,
            datasets: datasets,
          };
        }

        if (action.payload && action.payload.voter_likelihood_poll) {
          const voterLikeliHoodFeature = {
            'Likely Democratic': 0,
            'Likely Independent': 0,
            'Likely Republican': 0,
          } as any;
          voterLikeliHoodFeature['Likely Democratic'] = action.payload.voter_likelihood_poll['Likely Democratic'];
          voterLikeliHoodFeature['Likely Independent'] = action.payload.voter_likelihood_poll['Likely Independent'];
          voterLikeliHoodFeature['Likely Republican'] = action.payload.voter_likelihood_poll['Likely Republican'];
          state.voterLikelihoodPoll = voterLikeliHoodFeature;
        }

        if (action.payload && action.payload.preferred_voting_style_bar) {
          state.preferredVotingStyleBar = {
            label: Object.keys(action.payload.preferred_voting_style_bar),
            datasets: Object.values(action.payload.preferred_voting_style_bar),
          };
        }

        if (state.filterParam && state.isFilterChartsByChart && !state.isClearFilter) {
          state[state.filterParam.name] = state.filterParam.data;
        }
      }

      state.countLoading--;
      state.firstLoad = false;
    })
    .addCase(dashboardDataAction.hideDashboardLoading, (state) => {
      state.countLoading--;
    })
    .addCase(dashboardDataAction.setDashboardFilterParams, (state, action) => {
      state.dashboardFilterParams = {
        ...action.payload,
        contact_bar: action.payload.contact_bar === 'Call Text' ? 'call_text' : action.payload.contact_bar,
      };
      state.isMapUpdate = false;
    })
    .addCase(dashboardDataAction.updateChartFilterParams, (state, action) => {
      state.dashboardFilterParams = action.payload;
      state.isMapUpdate = true;
    })
    .addCase(dashboardDataAction.resetChartData, (state) => {
      state.dashboardFilterParams = initialState.dashboardFilterParams;
      state.isMapUpdate = true;
    })
    .addCase(dashboardDataAction.setDashboardMapData, (state, action) => {
      state.dashboardMapData = action.payload;
    })
    .addCase(dashboardDataAction.updateChart, (state) => {
      state.isMapUpdate = true;
    })
    .addCase(dashboardDataAction.setFilterParam, (state, action) => {
      state.filterParam = action.payload;
    })
    .addCase(dashboardDataAction.setIsFilterChartsByChart, (state, action) => {
      state.isFilterChartsByChart = action.payload;
    })
    .addCase(dashboardDataAction.setIsClearFilter, (state, action) => {
      state.isClearFilter = action.payload;
    }),
);

export default dashboardReducer;
