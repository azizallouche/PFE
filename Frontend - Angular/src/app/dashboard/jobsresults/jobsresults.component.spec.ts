import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsresultsComponent } from './jobsresults.component';

describe('JobsresultsComponent', () => {
  let component: JobsresultsComponent;
  let fixture: ComponentFixture<JobsresultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsresultsComponent]
    });
    fixture = TestBed.createComponent(JobsresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
