import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  form: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.form = new FormGroup({
      name: new FormControl(null),
      dateBefore: new FormControl(null),
      dateAfter: new FormControl(null)
    })
  }

  submit() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          dateBefore: this.form.value.dateBefore,
          dateAfter: this.form.value.dateAfter,
          name: this.form.value.name,
        },
        queryParamsHandling: 'merge'
      });
  }
}
