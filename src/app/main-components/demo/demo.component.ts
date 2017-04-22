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

  constructor(af: AngularFire) {

    this.pageSize = new BehaviorSubject(5);

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
    this.pageSize.next(this.pageSize.getValue() + 5);
  }

}
