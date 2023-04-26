import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {DataLoader} from "../interfaces/data-loader";

@Injectable({providedIn: 'root'})
export class ErrorHandlerService {

  constructor(private router: Router) {
  }

  getObserverWithErrorHandling(sender: DataLoader) {
    return  {
      sender: sender,
      errorHandler: this,

      next(value: any) {
        this.sender.onDataLoaded(value)
      },
      error(value: any) {
        this.errorHandler.handle(value)
      }
    }
  }

  handle(e: HttpErrorResponse) {
    this.router.navigate(
      ['/error'],
      {
        queryParams: {
          message: e.error.message,
          statusCode: e.status,
        },
        queryParamsHandling: 'merge'
      });
  }
}
