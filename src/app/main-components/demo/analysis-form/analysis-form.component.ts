import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-form',
  templateUrl: './analysis-form.component.html',
  styleUrls: ['./analysis-form.component.scss']
})
export class AnalysisFormComponent implements OnInit {

  private newJobUrl: string;
  private userName: string;
  private userDescription: string;
  private message: string;

  constructor(private http: Http) {
    this.newJobUrl = environment.analyzerUrl + '/analysis';
    this.userName = '';
    this.userDescription = '';
    this.message = '';
  }

  ngOnInit() {
  }

  sendNewJob() {
    this.http.post(this.newJobUrl, {
      source: 'web',
      user_name: this.userName,
      user_description: this.userDescription,
      message: this.message
    }).subscribe((response) => {
      console.log(response.json())
    });
  }

}
