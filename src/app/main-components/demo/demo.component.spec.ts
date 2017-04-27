import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire } from 'angularfire2';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { ReversePipe } from '../../custom-pipes/reverse.pipe';
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
      declarations: [DemoComponent, ReversePipe],
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

  it('should increase the page size after running moreResults', () => {
    expect(component.pageSize.getValue()).toEqual(5);
    component.moreResults();
    expect(component.pageSize.getValue()).toEqual(10);
  });

  it('should colorize the message accordingly', () => {
    let item = {
      message: 'Some message with a problem and a solution',
      analysis: {
        problem: 'a problem',
        solution: 'a solution'
      }
    };
    let htmlMessage = component.formatMessage(item);
    expect(htmlMessage).toEqual('Some message with <strong class="problem">a problem</strong> and <strong class="solution">a solution</strong>');

    item = {
      message: 'Some message with a problem and no solution',
      analysis: {
        problem: 'a problem',
        solution: 'a solution'
      }
    };
    htmlMessage = component.formatMessage(item);
    expect(htmlMessage).toEqual('Some message with <strong class="problem">a problem</strong> and no solution');


  });

});
