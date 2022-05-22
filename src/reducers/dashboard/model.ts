import {
  DashboardChartData,
  DashboardFilterParams,
} from '@goldfishcode/kingmakerdata-api-sdk/libs/api/dashboard/models';

export interface ChartDataType {
  label: string[];
  datasets: number[];
}

export interface VoterLikelihoodPollType {
  [key: string]: any;
}

export interface Dashboard {
  dashboardChartData: DashboardChartData | null;
  ageBracket?: ChartDataType | null;
  est_party?: ChartDataType | null;
  gender?: ChartDataType | null;
  likelyParty?: ChartDataType | null;
  cityCouncil?: ChartDataType | null;
  firstLoad: boolean;
  countLoading: number;
  ageRange?: string[] | [];
  dashboardFilterParams: DashboardFilterParams;
  contact_bar?: ChartDataType | null;
  contact_poll?: ChartDataType | null;
  voterLikelihoodPoll?: VoterLikelihoodPollType | null;
  voted?: ChartDataType | null;
  voterLikelihoodBar?: ChartDataType | null;
  preferredVotingStyleBar?: ChartDataType | null;
  dashboardMapData: {
    maps: [];
    cursor?: string;
    loading?: boolean;
  };
  isMapUpdate: boolean;
  filterParam?: {
    name: string;
    data: ChartDataType | VoterLikelihoodPollType;
  };
  isFilterChartsByChart: boolean;
  isClearFilter: boolean;
}
