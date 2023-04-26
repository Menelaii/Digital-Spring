import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompetitionMatchesPage} from "../interfaces/competition-matches-page";
import {Competition} from "../interfaces/competition";
import {CompetitionsPage} from "../interfaces/competitions-page";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class CompetitionsService {
  constructor(private http: HttpClient) {
  }

  getCompetitionWithMatches(id: number) : Observable<CompetitionMatchesPage> {
    return this.http.get<CompetitionMatchesPage>(`v4/competitions/${id}/matches`, {
      headers: new HttpHeaders({
        "X-Auth-Token" : environment.apiToken
      })
    })
  }

  getCompetitions(): Observable<CompetitionsPage> {
    return this.http.get<CompetitionsPage>('v4/competitions', {
      headers: new HttpHeaders({
        "X-Auth-Token" : environment.apiToken
      })
    })
  }

  getMock(): Competition {
    return {
      "id": 0,
      "name": '',
      "code": '',
      "type": '',
      "emblem": ''
    };
  }
}
