import { Subject } from 'rxjs/Rx';
import { QueryList } from '@angular/core/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  /**
   * It receives an item where a message is contained along with an analysis. From the analysis,
   * it identifies solution and problem (when available), and it returns a markup message where
   * problem and solution receive css classes. 
   * 
   * E.g.: 
   * 
   * 'Some message with a problem and a solution'
   * 
   * produces:
   * 
   * 'Some message with <strong class="problem">a problem</strong> and <strong class="solution">a solution</strong>
   * 
   * @param item An analyzed job item
   * @returns message string: the markup version of the problem.
   */
  formatMessage(item: { message: string, analysis: { problem: string, solution: string } }) {
    let problemIndex = item.message.indexOf(item.analysis.problem),
      message = '';
    if (problemIndex > -1) {
      message = item.message.substring(0, problemIndex) +
        '<strong class="problem">' + item.analysis.problem +
        '</strong>' + item.message.substring(problemIndex + item.analysis.problem.length);
    }
    let solutionIndex = message.indexOf(item.analysis.solution);
    if (solutionIndex > -1) {
      message = message.substring(0, solutionIndex) +
        '<strong class="solution">' + item.analysis.solution +
        '</strong>' + message.substring(solutionIndex + item.analysis.solution.length);
    }
    return message;
  }

  moreResults() {
    this.pageSize.next(this.pageSize.getValue() + this.pageStep);
  }

}
