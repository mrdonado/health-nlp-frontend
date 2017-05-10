import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  private messageBus: Subject<string>;

  constructor() {
    this.messageBus = new Subject<string>();
  }

  /**
   * Subscribe to this message bus in order to get
   * the log messages.
   */
  public getMessageBus(): Observable<string> {
    return this.messageBus.asObservable();
  }

  /**
   * Send a message to all the subscribers.
   */
  public sendMessage(message: string): void {
    this.messageBus.next(message);
  }

}
