import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Competition} from "../../../shared/interfaces/competition";
import {CompetitionsService} from "../../../shared/services/competitions.service";
import {StringUtil} from "../../../shared/services/string-util";
import {ErrorHandlerService} from "../../../shared/services/error-handler.service";
import {DataLoader} from "../../../shared/interfaces/data-loader";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements DataLoader{
  receivedCompetitions: Competition[] = []
  competitions: Competition[] = []
  isLoading = false

  typeTranslationMap = new Map<string, string>([
    ["LEAGUE", "Лига"],
    ["CUP", "Кубок"]
  ]);

  constructor(private service: CompetitionsService,
              private router: Router,
              private route: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
    route.queryParams.subscribe(
      params => {
        this.filterCompetitions(params['name'])
      });
  }

  ngOnInit(): void {
    this.fetchCompetitions()
  }

  fetchCompetitions() {
    this.isLoading = true
    const observer = this.errorHandler.getObserverWithErrorHandling(this)
    this.service.getCompetitions().subscribe(observer)
  }

  onCompetitionClick(competition: Competition) {
    this.router.navigate(['/competitions', competition.id])
  }

  filterCompetitions(competitionName: string) {
    this.competitions = this.receivedCompetitions

    if (StringUtil.isNullOrEmpty(competitionName)) {
      return
    }

    this.competitions = this.competitions.filter(c =>
      c.name.toLowerCase().startsWith(competitionName.toLowerCase()))
  }

  getType(competition: Competition) {
    return this.typeTranslationMap.get(competition.type) ?? ''
  }

  onDataLoaded(response: any): void {
    this.receivedCompetitions = response.competitions
    this.competitions = response.competitions
    this.isLoading = false
  }
}
