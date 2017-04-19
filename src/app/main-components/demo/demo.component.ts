import { Subject } from 'rxjs/Rx';
import { QueryList } from '@angular/core/core';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  analysis: FirebaseListObservable<any[]>;
  queryLimit: number;
  querySubject: Subject<number>;

  constructor(af: AngularFire) {
    this.queryLimit = 5;
    this.querySubject = new Subject();
    this.analysis = af.database.list('/analysis',
      {
        query: {
          limitToLast: this.querySubject,
          orderByChild: 'created_at'
        }
      });
  }

  ngOnInit() {
  }

  moreResults() {
    this.queryLimit += 5;
    this.querySubject.next(this.queryLimit);
  }

}
