import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { QueryList } from '@angular/core/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {

  public analysis: BehaviorSubject<any[]>; // A list with the retrieved analysis from firebase
  private pageStep: number; // The number of items requested each time
  private lastKey: any; // The key of the last item, in order to allow pagination
  public emptyList: boolean; // It tells wether the list has received some elements or not

  constructor(private af: AngularFire) {
    this.pageStep = 5;
    this.analysis = new BehaviorSubject([]);
  }

  /**
   * Add the first page of results while initializing.
   */
  ngOnInit() {
    /**
     * Instead of binding this list directly to the DOM, we will add every new item to
     * the analysis BehaviorSubject, which will act as buffer.
     *
     * This way, the existing items won't be refreshed on the list whenever more items
     * are requested, thus updating the DOM only for the new items.
     */
    this.emptyList = true;
    this.af.database.list('/analysis',
      {
        query: {
          limitToLast: this.pageStep,
          orderByKey: true
        }
      }).subscribe((data) => {
        this.emptyList = false;
        this.analysis.next(data);
        this.lastKey = data[0].$key;
      });
  }

  /**
   * Whenever more results are requested, a new query will be performed, and the new
   * items will be attached at the end of the list, enabling pagination.
   *
   * We do it this way instead of updating limitToLast with a BehaviorSubject because
   * we don't want the DOM to be altered for the existing elements.
   */
  moreResults() {
    this.af.database.list('/analysis',
      {
        query: {
          endAt: this.lastKey,
          limitToLast: this.pageStep + 1, // The extra item will match the last item of the current list
          orderByKey: true
        }
      }).subscribe(values => {
        this.analysis.next(values
          .slice(0, values.length - 1) // That extra item shouldn't be displayed
          .concat(this.analysis.getValue()));
        this.lastKey = values[0].$key;
      });
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
    const problemIndex = item.message.indexOf(item.analysis.problem);
    let message = '';
    if (problemIndex > -1) {
      message = item.message.substring(0, problemIndex) +
        '<strong class="problem">' + item.analysis.problem +
        '</strong>' + item.message.substring(problemIndex + item.analysis.problem.length);
    }
    const solutionIndex = message.indexOf(item.analysis.solution);
    if (solutionIndex > -1) {
      message = message.substring(0, solutionIndex) +
        '<strong class="solution">' + item.analysis.solution +
        '</strong>' + message.substring(solutionIndex + item.analysis.solution.length);
    }
    // If no problem and no solution have been found, the original message is returned
    return message !== '' ? message : item.message;
  }
}
