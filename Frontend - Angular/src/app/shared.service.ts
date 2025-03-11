import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private booleanState = new BehaviorSubject<boolean>(false);
  currentBooleanState = this.booleanState.asObservable();
  private big5PassedSubject = new BehaviorSubject<boolean>(false);
  big5Passed$ = this.big5PassedSubject.asObservable();

  private mbtiPassedSubject = new BehaviorSubject<boolean>(false);
 

  mbtiPassed$ = this.mbtiPassedSubject.asObservable();
  private showdescSubject = new BehaviorSubject<boolean>(false);
  showdesc$ = this.showdescSubject.asObservable();

  setShowdesc(value: boolean): void {
    this.showdescSubject.next(value);
  }
  private vmSubject = new BehaviorSubject<boolean>(false);
  vm$ = this.showdescSubject.asObservable();

  setVm(value: boolean): void {
    this.showdescSubject.next(value);
  }
  setMbtiPassed(passed: boolean) {
    this.mbtiPassedSubject.next(passed);
  }

  setBig5Passed(passed: boolean) {
    this.big5PassedSubject.next(passed);
  }
   jobDetails = {
    jobTitle: '',
    experienceLevel: '',
    workType: '',
    workLevel: '',
    overview: '',
    messages: ''
  };

  changeBooleanState(state: boolean) {
    this.booleanState.next(state);
  }
  getValues(values: any) {
    this.jobDetails=values;
  }
}
