import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeamsPage} from "../interfaces/teams-page";
import {Team} from "../interfaces/team";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<TeamsPage> {
    return this.http.get<TeamsPage>("/v4/teams/", {
      headers: new HttpHeaders({
        "X-Auth-Token" : environment.apiToken
      })
    })
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>("/v4/teams/" + id, {
      headers: new HttpHeaders({
        "X-Auth-Token" : environment.apiToken
      })
    })
  }

  getMock(): Team {
    return {
      "id": 0,
      "name": "",
      "shortName": "",
      "tla": "",
      "crest": ""
    }
  }
}
