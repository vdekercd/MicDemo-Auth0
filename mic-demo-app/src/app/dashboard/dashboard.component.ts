import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { ValueService } from '../services/value.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  values: string[];

  constructor(public auth: AuthService,
    public valueService: ValueService) { }

  ngOnInit() {
    this.valueService.getValues().subscribe(response => {
      console.log(response);
      this.values = response as string[];
      console.log(this.values);
    }, err => {
      console.log(err);
    }, () => {
      console.log('completed');
    });
  }

}
