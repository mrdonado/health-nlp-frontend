import { Subject } from 'rxjs/Rx';
import { QueryList } from '@angular/core/core';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  analysis: FirebaseListObservable<any[]>;
  pageSize: BehaviorSubject<any>;
  pageStep: number;

  constructor(af: AngularFire) {
    this.pageStep = 5;
    this.pageSize = new BehaviorSubject(this.pageStep);

    this.analysis = af.database.list('/analysis',
      {
        query: {
          limitToLast: this.pageSize,
          orderByKey: true
        }
      });

  }

  ngOnInit() {

  }

  moreResults() {
    this.pageSize.next(this.pageSize.getValue() + this.pageStep);
  }

}
