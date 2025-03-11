import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhrComponent } from './addhr.component';

describe('AddhrComponent', () => {
  let component: AddhrComponent;
  let fixture: ComponentFixture<AddhrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddhrComponent]
    });
    fixture = TestBed.createComponent(AddhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
