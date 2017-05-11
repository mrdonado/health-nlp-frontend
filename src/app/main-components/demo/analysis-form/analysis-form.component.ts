import { Observable } from 'rxjs/Rx';
import { LogService } from '../../../services/log.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-analysis-form',
  templateUrl: './analysis-form.component.html',
  styleUrls: ['./analysis-form.component.scss']
})
export class AnalysisFormComponent implements OnInit {

  @Output() closeCb = new EventEmitter();

  private newJobUrl: string;
  public userName: string;
  public userDescription: string;
  public message: string;

  constructor(private http: Http, private logService: LogService) {
    this.newJobUrl = environment.analyzerUrl + '/analysis';
  }

  ngOnInit() {
    this.clearForm();
  }

  clearForm() {
    this.userName = '';
    this.userDescription = '';
    this.message = '';
  }

  closeForm() {
    this.clearForm();
    this.closeCb.emit('close');
  }

  sendNewJob() {
    this.http.post(this.newJobUrl, {
      source: 'web',
      user_name: this.userName,
      user_description: this.userDescription,
      message: this.message
    }).catch((error) => {
      this.logService.sendMessage('There was a problem sending the message. Please, try again later.');
      return Observable.throw(error);
    }).subscribe((response) => {
      console.log(response.json());
      this.closeForm();
      this.clearForm();
      this.logService.sendMessage('Your message has been sent');
    });
  }

}
