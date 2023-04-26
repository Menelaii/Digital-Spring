import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TeamsComponent } from './main-layout/sections/teams/teams.component';
import {HttpClientModule} from "@angular/common/http";
import { TeamComponent } from './main-layout/sections/team/team.component';
import { CompetitionComponent } from './main-layout/sections/competition/competition.component';
import { MatchesTableComponent } from './shared/components/matches-table/matches-table.component';
import { CompetitionsComponent } from './main-layout/sections/competitions/competitions.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './main-layout/sections/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TeamsComponent,
    TeamComponent,
    CompetitionComponent,
    MatchesTableComponent,
    CompetitionsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
