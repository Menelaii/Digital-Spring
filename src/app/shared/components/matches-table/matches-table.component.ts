import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../interfaces/match";
import {ActivatedRoute} from "@angular/router";
import {StringUtil} from "../../services/string-util";

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.scss']
})
export class MatchesTableComponent implements OnInit {
  @Input() matches: Match[] = []
  receivedMatches: Match[] = []

  winnerTranslationMap = new Map<string, string>([
    ["DRAW", "Ничья"],
    ["AWAY_TEAM", "Гости"],
    ["HOME_TEAM", "Хозяева"]
  ]);

  statusTranslationMap = new Map<string, string>([
    ["FINISHED", "Закончен"],
    ["TIMED", "Ещё не состоялся"]
  ]);


  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe(
      params => {
        this.filterMatches(params['dateBefore'], params['dateAfter'])
      });
  }

  ngOnInit(): void {
    this.receivedMatches = this.matches
  }

  getDate(match: Match) {
    return match.utcDate//.substring(0, 10)
  }

  getScore(match: Match): string {
    return this.isMatchFinished(match)
      ? match.score.fullTime.home + ' : ' + match.score.fullTime.away
      : ''
  }

  isMatchFinished(match: Match): boolean {
    return (match.status == "FINISHED")
  }

  getWiener(match: Match): string {
    return this.winnerTranslationMap.get(match.score.winner) ?? ''
  }

  getStatus(match: Match): string {
    return this.statusTranslationMap.get(match.status) ?? ''
  }

  private filterMatches(dateBefore: string, dateAfter: string) {
    this.matches = this.receivedMatches
    this.matches = this.matches.filter(m => this.inRange(m, dateBefore, dateAfter))
  }

  inRange(match: Match, dateBefore: string, dateAfter: string): boolean {
    return (StringUtil.isNullOrEmpty(dateAfter) || Date.parse(dateAfter) <= Date.parse(match.utcDate))
      && (StringUtil.isNullOrEmpty(dateBefore) || Date.parse(dateBefore) >= Date.parse(match.utcDate))
  }
}
