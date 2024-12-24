import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamWindowComponent } from './exam-window.component';

describe('ExamWindowComponent', () => {
  let component: ExamWindowComponent;
  let fixture: ComponentFixture<ExamWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamWindowComponent]
    });
    fixture = TestBed.createComponent(ExamWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
