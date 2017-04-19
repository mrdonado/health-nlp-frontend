import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire } from 'angularfire2';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { DemoComponent } from './demo.component';


describe('DemoComponent', () => {

  let _collection = 'unknown';

  const AngularFireMock = {
    database: {
      list: (collection, options) => {
        _collection = collection;
      }
    }
  };

  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemoComponent],
      providers: [
        {
          provide: AngularFire,
          useValue: AngularFireMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a collection /analysis', () => {
    expect(_collection).toEqual('/analysis');
  });

  it('should increase the query limit after running moreResults', ()=>{
    expect(component.queryLimit).toEqual(5);
    component.moreResults();
    expect(component.queryLimit).toEqual(10);

  });

});
