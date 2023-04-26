import {Component, OnInit} from '@angular/core';
import {Team} from "../../../shared/interfaces/team";
import {TeamsService} from "../../../shared/services/teams.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Match} from "../../../shared/interfaces/match";
import {MatchesService} from "../../../shared/services/matches.service";
import {DataLoader} from "../../../shared/interfaces/data-loader";
import {MatchesPage} from "../../../shared/interfaces/matches-page";
import {ErrorHandlerService} from "../../../shared/services/error-handler.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, DataLoader {
  team: Team = this.teamsService.getMock()
  matches: Match[] = []
  isTeamLoading = false
  isMatchesLoading = false

  constructor(private teamsService: TeamsService,
              private matchesService: MatchesService,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchTeam(params['id'])
      this.fetchMatches(params['id'])
      })
  }

  fetchTeam(id:number) {
    this.isTeamLoading = true
    const observer = this.errorHandler.getObserverWithErrorHandling(this)
    this.teamsService.getTeam(id).subscribe(observer)
  }

  fetchMatches(teamId:number) {
    this.isMatchesLoading = true
    const observer = this.errorHandler.getObserverWithErrorHandling(this)
    this.matchesService.getMatches(teamId).subscribe(observer)
  }

  onDataLoaded(response: any) {
    if (response as MatchesPage && response.matches) {
      this.matches = response.matches
      this.isMatchesLoading = false
    } else if (response) {
      this.team = response as Team
      this.isTeamLoading = false
    }
  }
}
