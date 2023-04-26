import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatchesPage} from "../interfaces/matches-page";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class MatchesService {
  constructor(private http: HttpClient) {
  }

  getMatches(teamId: number) : Observable<MatchesPage> {
    return this.http.get<MatchesPage>("/v4/teams" + `/${teamId}/matches`, {
      headers: new HttpHeaders({
        "X-Auth-Token" : environment.apiToken
      })
    })
  }
}
