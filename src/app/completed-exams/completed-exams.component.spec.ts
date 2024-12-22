import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedExamsComponent } from './completed-exams.component';

describe('CompletedExamsComponent', () => {
  let component: CompletedExamsComponent;
  let fixture: ComponentFixture<CompletedExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedExamsComponent]
    });
    fixture = TestBed.createComponent(CompletedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
