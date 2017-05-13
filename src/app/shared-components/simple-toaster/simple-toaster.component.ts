import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-simple-toaster',
  templateUrl: './simple-toaster.component.html',
  styleUrls: ['./simple-toaster.component.scss']
})
export class SimpleToasterComponent implements OnInit {

  public currentMessage: Observable<string>;
  public activeMessage: boolean;

  constructor(private logService: LogService) {
    this.activeMessage = false;
    this.currentMessage = this.logService
      .getMessageBus()
      .do((message) => {
        this.activeMessage = true;
        setTimeout(() => {
          this.activeMessage = false;
        }, 2500);
      });
  }

  ngOnInit() {
  }

}
