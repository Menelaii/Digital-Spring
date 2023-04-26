import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  message = ''
  statusCode = ''

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe(
      params => {
        this.message = params['message']
        this.statusCode = params['statusCode']
      });
  }
}
