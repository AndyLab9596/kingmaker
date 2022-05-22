import { Jurisdiction, Position } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/location/models';
import { GovernmentLevel, Race } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/user/models';

export interface PositionState {
  governmentLevel: Array<GovernmentLevel>;
  race: Array<Race>;
  jurisdiction: Array<Jurisdiction>;
  position: Array<Position>;
}
