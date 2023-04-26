import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {TeamsComponent} from "./main-layout/sections/teams/teams.component";
import {TeamComponent} from "./main-layout/sections/team/team.component";
import {CompetitionComponent} from "./main-layout/sections/competition/competition.component";
import {CompetitionsComponent} from "./main-layout/sections/competitions/competitions.component";
import {ErrorComponent} from "./main-layout/sections/error/error.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:id', component: TeamComponent },
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'competitions/:id', component: CompetitionComponent },
      { path: 'error', component: ErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
