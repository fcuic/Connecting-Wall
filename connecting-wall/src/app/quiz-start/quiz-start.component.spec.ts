import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStartComponent } from './quiz-start.component';

describe('QuizStartComponent', () => {
  let component: QuizStartComponent;
  let fixture: ComponentFixture<QuizStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
