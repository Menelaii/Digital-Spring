import {Competition} from "./competition";
import {Match} from "./match";

export interface CompetitionMatchesPage {
  competition: Competition
  matches: Match[]
}
