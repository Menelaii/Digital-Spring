import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../../shared/services/teams.service";
import {Team} from "../../../shared/interfaces/team";
import {ActivatedRoute, Router} from "@angular/router";
import {StringUtil} from "../../../shared/services/string-util";
import {DataLoader} from "../../../shared/interfaces/data-loader";
import {ErrorHandlerService} from "../../../shared/services/error-handler.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, DataLoader {
  receivedTeams: Team[] = []
  teams: Team[] = []
  isLoading = false

  constructor(private service: TeamsService,
              private router: Router,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
    route.queryParams.subscribe(
      params => {
        this.filterTeams(params['name'])
      });
  }

  ngOnInit(): void {
    this.fetchTeams()
  }

  fetchTeams() {
    this.isLoading = true
    const observer = this.errorHandler.getObserverWithErrorHandling(this)
    this.service.getTeams().subscribe(observer)
  }

  filterTeams(teamName: string) {
    this.teams = this.receivedTeams

    if (StringUtil.isNullOrEmpty(teamName)) {
      return
    }

    this.teams = this.teams.filter(t => t.name.toLowerCase().startsWith(teamName.toLowerCase()))
  }

  onTeamClick(team: Team) {
    this.router.navigate(['/teams', team.id])
  }

  onDataLoaded(response: any): void {
    this.receivedTeams = response.teams
    this.teams = response.teams
    this.isLoading = false
  }
}
