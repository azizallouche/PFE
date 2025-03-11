import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobresultsinfoComponent } from './jobresultsinfo.component';

describe('JobresultsinfoComponent', () => {
  let component: JobresultsinfoComponent;
  let fixture: ComponentFixture<JobresultsinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobresultsinfoComponent]
    });
    fixture = TestBed.createComponent(JobresultsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
