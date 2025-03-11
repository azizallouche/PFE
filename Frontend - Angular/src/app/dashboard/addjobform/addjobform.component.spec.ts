import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobformComponent } from './addjobform.component';

describe('AddjobformComponent', () => {
  let component: AddjobformComponent;
  let fixture: ComponentFixture<AddjobformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddjobformComponent]
    });
    fixture = TestBed.createComponent(AddjobformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
