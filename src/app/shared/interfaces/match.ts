import {Area} from "./area";
import {Competition} from "./competition";
import {Team} from "./team";
import {Score} from "./score";

export interface Match {
  "id": number,
  "area": Area,
  "competition": Competition,
  "utcDate": string,
  "status": string,
  "stage": string,
  "homeTeam": Team,
  "awayTeam": Team,
  score: Score
}
