import {Component, OnInit} from '@angular/core';
import {Match} from "../../../shared/interfaces/match";
import {ActivatedRoute, Params} from "@angular/router";
import {Competition} from "../../../shared/interfaces/competition";
import {CompetitionsService} from "../../../shared/services/competitions.service";
import {ErrorHandlerService} from "../../../shared/services/error-handler.service";
import {DataLoader} from "../../../shared/interfaces/data-loader";

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, DataLoader {
  competition: Competition = this.service.getMock()
  matches: Match[] = []
  isLoading = false

  constructor(private service: CompetitionsService,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.fetchCompetition(params['id'])
    })
  }

  fetchCompetition(id:number) {
    this.isLoading = true
    const observer = this.errorHandler.getObserverWithErrorHandling(this)
    this.service.getCompetitionWithMatches(id).subscribe(observer)
  }

  onDataLoaded(response: any) {
    this.competition = response.competition
    this.matches = response.matches
    this.isLoading = false
  }
}
