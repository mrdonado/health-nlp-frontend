import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  analysis: FirebaseListObservable<any[]>;
  title = 'app works!';
  constructor(af: AngularFire) {
    this.analysis = af.database.list('/analysis');
  }
}
