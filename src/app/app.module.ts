import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBqxNTm3NLPmDs2rcXEean4sVlaxgV2OoU',
  authDomain: 'health-nlp-88b08.firebaseapp.com',
  databaseURL: 'https://health-nlp-88b08.firebaseio.com',
  projectId: 'health-nlp-88b08',
  storageBucket: 'health-nlp-88b08.appspot.com',
  messagingSenderId: '329948122061'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
