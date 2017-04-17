import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  analysis: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.analysis = af.database.list('/analysis');
  }

  ngOnInit() {
  }

}
