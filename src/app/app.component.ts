import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showForm: boolean;

  constructor() {
    this.showForm = false;
  }

  toggleForm(event) {
    this.showForm = !this.showForm;
  }
}
