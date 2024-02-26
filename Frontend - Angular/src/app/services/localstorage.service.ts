import {Inject, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor( ) {

  }
  saveQ1(data:any):void{
     window.sessionStorage.setItem("q1",data);

  }
}
